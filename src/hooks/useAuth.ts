import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/authStore';
import { getProfile } from '@/lib/supabase/queries';
import { 
  signUp, 
  signIn, 
  signOut, 
  resetPassword, 
  updatePassword,
  checkEmailVerification,
  resendEmailVerification
} from '@/lib/supabase/auth';
import type { LoginFormData, RegisterFormData } from '@/lib/validations/auth';

export function useAuth() {
  const router = useRouter();
  const {
    user,
    profile,
    isLoading,
    isEmailVerified,
    setUser,
    setProfile,
    setLoading,
    setEmailVerified,
    clearAuth,
    isAuthenticated,
    isAdmin,
    isPro,
    isTrialActive,
  } = useAuthStore();

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      try {
        setLoading(true);
        
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          return;
        }

        if (session?.user && mounted) {
          setUser(session.user);
          setEmailVerified(!!session.user.email_confirmed_at);
          
          // Get user profile
          try {
            const userProfile = await getProfile(session.user.id);
            if (mounted) {
              setProfile(userProfile);
            }
          } catch (profileError) {
            console.error('Error getting profile:', profileError);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          setEmailVerified(!!session.user.email_confirmed_at);
          
          try {
            const userProfile = await getProfile(session.user.id);
            setProfile(userProfile);
          } catch (error) {
            console.error('Error getting profile after sign in:', error);
          }
        } else if (event === 'SIGNED_OUT') {
          clearAuth();
          router.push('/');
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          setUser(session.user);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [setUser, setProfile, setLoading, setEmailVerified, clearAuth, router]);

  // Auth actions
  const login = async (data: LoginFormData) => {
    try {
      setLoading(true);
      const result = await signIn(data.email, data.password);
      
      if (result.user && !result.user.email_confirmed_at) {
        throw new Error('Пожалуйста, подтвердите ваш email адрес');
      }
      
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      
      const result = await signUp(data.email, data.password, {
        full_name: data.fullName,
      });

      // If we have a pet name, we'll store it temporarily for after email verification
      if (data.petName) {
        localStorage.setItem('pendingPetName', data.petName);
      }

      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut();
      clearAuth();
      router.push('/');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordReset = async (email: string) => {
    try {
      setLoading(true);
      await resetPassword(email);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (newPassword: string) => {
    try {
      setLoading(true);
      await updatePassword(newPassword);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async () => {
    if (!user?.email) {
      throw new Error('Пользователь не найден');
    }
    
    try {
      setLoading(true);
      await resendEmailVerification(user.email);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const checkVerification = async () => {
    try {
      const verified = await checkEmailVerification();
      setEmailVerified(verified);
      return verified;
    } catch (error) {
      console.error('Error checking verification:', error);
      return false;
    }
  };

  const refreshProfile = async () => {
    if (!user) return;
    
    try {
      const userProfile = await getProfile(user.id);
      setProfile(userProfile);
      return userProfile;
    } catch (error) {
      console.error('Error refreshing profile:', error);
      throw error;
    }
  };

  return {
    // State
    user,
    profile,
    isLoading,
    isEmailVerified,
    isAuthenticated: isAuthenticated(),
    isAdmin: isAdmin(),
    isPro: isPro(),
    isTrialActive: isTrialActive(),
    
    // Actions
    login,
    register,
    logout,
    sendPasswordReset,
    changePassword,
    resendVerification,
    checkVerification,
    refreshProfile,
  };
}