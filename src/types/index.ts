// Database types
export interface Profile {
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

export interface Pet {
  id: string;
  user_id: string;
  name: string;
  species: string;
  breed?: string;
  birth_date?: string;
  photo_url?: string;
  weight?: number;
  color?: string;
  gender?: 'male' | 'female' | 'unknown';
  is_sterilized: boolean;
  microchip_number?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface HealthRecord {
  id: string;
  pet_id: string;
  user_id: string;
  record_type: 'vet_visit' | 'medication' | 'vaccination' | 'procedure' | 'note';
  title: string;
  description?: string;
  record_date: string;
  veterinarian_name?: string;
  clinic_name?: string;
  cost?: number;
  document_urls?: string[];
  next_appointment?: string;
  created_at: string;
  updated_at: string;
}

export interface Expense {
  id: string;
  pet_id: string;
  user_id: string;
  category: 'food' | 'medicine' | 'toys' | 'grooming' | 'other';
  amount: number;
  description: string;
  expense_date: string;
  receipt_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Reminder {
  id: string;
  pet_id: string;
  user_id: string;
  title: string;
  description?: string;
  reminder_type: 'vaccination' | 'medication' | 'feeding' | 'grooming' | 'vet_visit' | 'other';
  reminder_date: string;
  is_recurring: boolean;
  recurrence_pattern?: string;
  is_completed: boolean;
  completed_at?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_type: 'free' | 'pro';
  status: 'active' | 'canceled' | 'expired' | 'trial';
  start_date: string;
  end_date?: string;
  trial_end_date?: string;
  yukassa_subscription_id?: string;
  created_at: string;
  updated_at: string;
}

// Form types
export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  petName?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface PetFormData {
  name: string;
  species: string;
  breed?: string;
  birth_date?: string;
  weight?: number;
  color?: string;
  gender?: 'male' | 'female' | 'unknown';
  is_sterilized: boolean;
  microchip_number?: string;
  notes?: string;
}

export interface HealthRecordFormData {
  record_type: 'vet_visit' | 'medication' | 'vaccination' | 'procedure' | 'note';
  title: string;
  description?: string;
  record_date: string;
  veterinarian_name?: string;
  clinic_name?: string;
  cost?: number;
  next_appointment?: string;
}

export interface ExpenseFormData {
  category: 'food' | 'medicine' | 'toys' | 'grooming' | 'other';
  amount: number;
  description: string;
  expense_date: string;
}

export interface ReminderFormData {
  title: string;
  description?: string;
  reminder_type: 'vaccination' | 'medication' | 'feeding' | 'grooming' | 'vet_visit' | 'other';
  reminder_date: string;
  is_recurring: boolean;
  recurrence_pattern?: string;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// UI State types
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

// Constants
export const EXPENSE_CATEGORIES = {
  food: 'Корм',
  medicine: 'Лекарства/витамины',
  toys: 'Игрушки',
  grooming: 'Груминг/услуги',
  other: 'Прочее',
} as const;

export const HEALTH_RECORD_TYPES = {
  vet_visit: 'Визит к ветеринару',
  medication: 'Лекарства/уколы',
  vaccination: 'Прививка',
  procedure: 'Процедура',
  note: 'Заметка',
} as const;

export const REMINDER_TYPES = {
  vaccination: 'Прививка',
  medication: 'Лекарство',
  feeding: 'Кормление',
  grooming: 'Груминг',
  vet_visit: 'Визит к ветеринару',
  other: 'Другое',
} as const;