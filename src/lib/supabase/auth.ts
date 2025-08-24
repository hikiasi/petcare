import { supabase } from './client';
import { createClient } from './server';
// Auth utilities for Supabase

// Sign up with email and password
export async function signUp(email: string, password: string, metadata?: { full_name?: string }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify`,
    },
  });

  if (error) throw error;
  return data;
}

// Sign in with email and password
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Get current user
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

// Create profile after successful signup
export async function createProfile(userId: string, email: string, role: 'user' | 'admin' = 'user') {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: userId,
      email,
      role,
      subscription_type: 'free',
      theme_preference: 'system',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Check if user has verified email
export async function checkEmailVerification() {
  const serverClient = await createClient();
  const { data: { user }, error } = await serverClient.auth.getUser();
  
  if (error) throw error;
  return user?.email_confirmed_at != null;
}

// Resend email verification
export async function resendEmailVerification(email: string) {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
  });

  if (error) throw error;
}

// Reset password
export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
  });

  if (error) throw error;
}

// Update password
export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
}

// Admin invite link functions
export async function createAdminInviteLink(createdBy: string, expiresInHours: number = 24) {
  const token = crypto.randomUUID();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + expiresInHours);

  const { data, error } = await supabase
    .from('admin_invite_links')
    .insert({
      token,
      created_by: createdBy,
      expires_at: expiresAt.toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function validateAdminInviteLink(token: string) {
  const { data, error } = await supabase
    .from('admin_invite_links')
    .select('*')
    .eq('token', token)
    .eq('is_used', false)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error) throw error;
  return data;
}

export async function useAdminInviteLink(token: string, usedBy: string) {
  const { data, error } = await supabase
    .from('admin_invite_links')
    .update({
      is_used: true,
      used_by: usedBy,
    })
    .eq('token', token)
    .select()
    .single();

  if (error) throw error;
  return data;
}