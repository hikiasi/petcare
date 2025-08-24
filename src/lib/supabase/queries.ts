import { supabase } from './client';
import type { Database } from './database.types';

type Tables = Database['public']['Tables'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

// Profile queries
export async function getProfile(userId: string) {
  const { data, error } = await db
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(
  userId: string,
  updates: Partial<Tables['profiles']['Update']>
) {
  const { data, error } = await db
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Pet queries
export async function getUserPets(userId: string) {
  const { data, error } = await db
    .from('pets')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getPet(petId: string, userId: string) {
  const { data, error } = await db
    .from('pets')
    .select('*')
    .eq('id', petId)
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function createPet(pet: Tables['pets']['Insert']) {
  const { data, error } = await db
    .from('pets')
    .insert(pet)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePet(
  petId: string,
  userId: string,
  updates: Partial<Tables['pets']['Update']>
) {
  const { data, error } = await db
    .from('pets')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', petId)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePet(petId: string, userId: string) {
  const { error } = await db
    .from('pets')
    .delete()
    .eq('id', petId)
    .eq('user_id', userId);

  if (error) throw error;
}

// Health records queries
export async function getHealthRecords(petId: string, userId: string) {
  const { data, error } = await db
    .from('health_records')
    .select('*')
    .eq('pet_id', petId)
    .eq('user_id', userId)
    .order('record_date', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createHealthRecord(record: Tables['health_records']['Insert']) {
  const { data, error } = await db
    .from('health_records')
    .insert(record)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Expenses queries
export async function getExpenses(petId: string, userId: string) {
  const { data, error } = await db
    .from('expenses')
    .select('*')
    .eq('pet_id', petId)
    .eq('user_id', userId)
    .order('expense_date', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createExpense(expense: Tables['expenses']['Insert']) {
  const { data, error } = await db
    .from('expenses')
    .insert(expense)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Reminders queries
export async function getReminders(userId: string) {
  const { data, error } = await db
    .from('reminders')
    .select(`
      *,
      pets (
        id,
        name,
        species
      )
    `)
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('reminder_date', { ascending: true });

  if (error) throw error;
  return data;
}

export async function createReminder(reminder: Tables['reminders']['Insert']) {
  const { data, error } = await db
    .from('reminders')
    .insert(reminder)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Subscription queries
export async function getUserSubscription(userId: string) {
  const { data, error } = await db
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
  return data;
}

// Usage stats queries
export async function getUsageStats(userId: string, monthYear: string) {
  const { data, error } = await db
    .from('usage_stats')
    .select('*')
    .eq('user_id', userId)
    .eq('month_year', monthYear)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function updateUsageStats(
  userId: string,
  monthYear: string,
  stats: Partial<Tables['usage_stats']['Update']>
) {
  const { data, error } = await db
    .from('usage_stats')
    .upsert({
      user_id: userId,
      month_year: monthYear,
      ...stats,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}