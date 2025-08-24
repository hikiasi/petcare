import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  email: string;
  full_name?: string;
  role: 'user' | 'admin';
  subscription_type: 'free' | 'pro';
  subscription_end_date?: string;
  trial_end_date?: string;
  theme_preference: 'light' | 'dark' | 'system';
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isEmailVerified: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  setLoading: (loading: boolean) => void;
  setEmailVerified: (verified: boolean) => void;
  clearAuth: () => void;
  
  // Computed
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
  isPro: () => boolean;
  isTrialActive: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      isLoading: true,
      isEmailVerified: false,

      setUser: (user) => set({ user }),
      setProfile: (profile) => set({ profile }),
      setLoading: (isLoading) => set({ isLoading }),
      setEmailVerified: (isEmailVerified) => set({ isEmailVerified }),
      
      clearAuth: () => set({ 
        user: null, 
        profile: null, 
        isEmailVerified: false,
        isLoading: false 
      }),

      // Computed getters
      isAuthenticated: () => {
        const { user, isEmailVerified } = get();
        return !!user && isEmailVerified;
      },

      isAdmin: () => {
        const { profile } = get();
        return profile?.role === 'admin';
      },

      isPro: () => {
        const { profile } = get();
        if (!profile) return false;
        
        if (profile.subscription_type === 'pro') {
          // Check if subscription is still active
          if (profile.subscription_end_date) {
            return new Date(profile.subscription_end_date) > new Date();
          }
          return true;
        }
        
        return false;
      },

      isTrialActive: () => {
        const { profile } = get();
        if (!profile?.trial_end_date) return false;
        
        return new Date(profile.trial_end_date) > new Date();
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
        isEmailVerified: state.isEmailVerified,
      }),
    }
  )
);