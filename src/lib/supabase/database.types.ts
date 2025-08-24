export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
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
        Relationships: [
          {
            foreignKeyName: "admin_invite_links_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_invite_links_used_by_fkey"
            columns: ["used_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "expenses_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "health_records_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "health_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      payments: {
        Row: {
          id: string
          user_id: string
          subscription_id: string | null
          amount: number
          currency: string
          status: 'pending' | 'succeeded' | 'canceled' | 'failed'
          yukassa_payment_id: string | null
          promo_code: string | null
          discount_amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subscription_id?: string | null
          amount: number
          currency?: string
          status: 'pending' | 'succeeded' | 'canceled' | 'failed'
          yukassa_payment_id?: string | null
          promo_code?: string | null
          discount_amount?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subscription_id?: string | null
          amount?: number
          currency?: string
          status?: 'pending' | 'succeeded' | 'canceled' | 'failed'
          yukassa_payment_id?: string | null
          promo_code?: string | null
          discount_amount?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "pets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
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
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      promo_codes: {
        Row: {
          id: string
          code: string
          discount_type: 'percentage' | 'fixed'
          discount_value: number
          max_uses: number | null
          current_uses: number
          expires_at: string | null
          is_active: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: string
          discount_type: 'percentage' | 'fixed'
          discount_value: number
          max_uses?: number | null
          current_uses?: number
          expires_at?: string | null
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string
          discount_type?: 'percentage' | 'fixed'
          discount_value?: number
          max_uses?: number | null
          current_uses?: number
          expires_at?: string | null
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "promo_codes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "reminders_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reminders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      system_settings: {
        Row: {
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          key: string
          value: Json
          updated_at?: string
        }
        Update: {
          key?: string
          value?: Json
          updated_at?: string
        }
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "usage_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      vaccinations: {
        Row: {
          id: string
          pet_id: string
          user_id: string
          vaccine_name: string
          vaccination_date: string
          next_vaccination_date: string | null
          batch_number: string | null
          veterinarian_name: string | null
          clinic_name: string | null
          cost: number | null
          document_url: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          pet_id: string
          user_id: string
          vaccine_name: string
          vaccination_date: string
          next_vaccination_date?: string | null
          batch_number?: string | null
          veterinarian_name?: string | null
          clinic_name?: string | null
          cost?: number | null
          document_url?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          pet_id?: string
          user_id?: string
          vaccine_name?: string
          vaccination_date?: string
          next_vaccination_date?: string | null
          batch_number?: string | null
          veterinarian_name?: string | null
          clinic_name?: string | null
          cost?: number | null
          document_url?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vaccinations_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vaccinations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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