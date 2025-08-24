export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'user' | 'admin'
          subscription_type: 'free' | 'pro'
          subscription_end_date: string | null
          trial_end_date: string | null
          theme_preference: 'light' | 'dark' | 'system'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'user' | 'admin'
          subscription_type?: 'free' | 'pro'
          subscription_end_date?: string | null
          trial_end_date?: string | null
          theme_preference?: 'light' | 'dark' | 'system'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'user' | 'admin'
          subscription_type?: 'free' | 'pro'
          subscription_end_date?: string | null
          trial_end_date?: string | null
          theme_preference?: 'light' | 'dark' | 'system'
          created_at?: string
          updated_at?: string
        }
      }
      admin_invite_links: {
        Row: {
          id: string
          token: string
          created_by: string | null
          is_used: boolean
          used_by: string | null
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          token: string
          created_by?: string | null
          is_used?: boolean
          used_by?: string | null
          expires_at: string
          created_at?: string
        }
        Update: {
          id?: string
          token?: string
          created_by?: string | null
          is_used?: boolean
          used_by?: string | null
          expires_at?: string
          created_at?: string
        }
      }
      pets: {
        Row: {
          id: string
          user_id: string
          name: string
          species: string
          breed: string | null
          birth_date: string | null
          photo_url: string | null
          weight: number | null
          color: string | null
          gender: 'male' | 'female' | 'unknown' | null
          is_sterilized: boolean
          microchip_number: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          species: string
          breed?: string | null
          birth_date?: string | null
          photo_url?: string | null
          weight?: number | null
          color?: string | null
          gender?: 'male' | 'female' | 'unknown' | null
          is_sterilized?: boolean
          microchip_number?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          species?: string
          breed?: string | null
          birth_date?: string | null
          photo_url?: string | null
          weight?: number | null
          color?: string | null
          gender?: 'male' | 'female' | 'unknown' | null
          is_sterilized?: boolean
          microchip_number?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      health_records: {
        Row: {
          id: string
          pet_id: string
          user_id: string
          record_type: 'vet_visit' | 'medication' | 'vaccination' | 'procedure' | 'note'
          title: string
          description: string | null
          record_date: string
          veterinarian_name: string | null
          clinic_name: string | null
          cost: number | null
          document_urls: string[] | null
          next_appointment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          pet_id: string
          user_id: string
          record_type: 'vet_visit' | 'medication' | 'vaccination' | 'procedure' | 'note'
          title: string
          description?: string | null
          record_date: string
          veterinarian_name?: string | null
          clinic_name?: string | null
          cost?: number | null
          document_urls?: string[] | null
          next_appointment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          pet_id?: string
          user_id?: string
          record_type?: 'vet_visit' | 'medication' | 'vaccination' | 'procedure' | 'note'
          title?: string
          description?: string | null
          record_date?: string
          veterinarian_name?: string | null
          clinic_name?: string | null
          cost?: number | null
          document_urls?: string[] | null
          next_appointment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      expenses: {
        Row: {
          id: string
          pet_id: string
          user_id: string
          category: 'food' | 'medicine' | 'toys' | 'grooming' | 'other'
          amount: number
          description: string
          expense_date: string
          receipt_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          pet_id: string
          user_id: string
          category: 'food' | 'medicine' | 'toys' | 'grooming' | 'other'
          amount: number
          description: string
          expense_date: string
          receipt_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          pet_id?: string
          user_id?: string
          category?: 'food' | 'medicine' | 'toys' | 'grooming' | 'other'
          amount?: number
          description?: string
          expense_date?: string
          receipt_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reminders: {
        Row: {
          id: string
          pet_id: string
          user_id: string
          title: string
          description: string | null
          reminder_type: 'vaccination' | 'medication' | 'feeding' | 'grooming' | 'vet_visit' | 'other'
          reminder_date: string
          is_recurring: boolean
          recurrence_pattern: string | null
          is_completed: boolean
          completed_at: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          pet_id: string
          user_id: string
          title: string
          description?: string | null
          reminder_type: 'vaccination' | 'medication' | 'feeding' | 'grooming' | 'vet_visit' | 'other'
          reminder_date: string
          is_recurring?: boolean
          recurrence_pattern?: string | null
          is_completed?: boolean
          completed_at?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          pet_id?: string
          user_id?: string
          title?: string
          description?: string | null
          reminder_type?: 'vaccination' | 'medication' | 'feeding' | 'grooming' | 'vet_visit' | 'other'
          reminder_date?: string
          is_recurring?: boolean
          recurrence_pattern?: string | null
          is_completed?: boolean
          completed_at?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_type: 'free' | 'pro'
          status: 'active' | 'canceled' | 'expired' | 'trial'
          start_date: string
          end_date: string | null
          trial_end_date: string | null
          yukassa_subscription_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_type: 'free' | 'pro'
          status: 'active' | 'canceled' | 'expired' | 'trial'
          start_date: string
          end_date?: string | null
          trial_end_date?: string | null
          yukassa_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_type?: 'free' | 'pro'
          status?: 'active' | 'canceled' | 'expired' | 'trial'
          start_date?: string
          end_date?: string | null
          trial_end_date?: string | null
          yukassa_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      usage_stats: {
        Row: {
          id: string
          user_id: string
          month_year: string
          health_records_count: number
          pets_count: number
          reminders_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          month_year: string
          health_records_count?: number
          pets_count?: number
          reminders_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          month_year?: string
          health_records_count?: number
          pets_count?: number
          reminders_count?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}