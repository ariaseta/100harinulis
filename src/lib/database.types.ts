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
          created_at: string
          updated_at: string | null
          full_name: string | null
          avatar_url: string | null
          linkedin_id: string | null
          linkedin_url: string | null
          current_day: number
          longest_streak: number
          current_streak: number
          last_post_date: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string | null
          full_name?: string | null
          avatar_url?: string | null
          linkedin_id?: string | null
          linkedin_url?: string | null
          current_day?: number
          longest_streak?: number
          current_streak?: number
          last_post_date?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string | null
          full_name?: string | null
          avatar_url?: string | null
          linkedin_id?: string | null
          linkedin_url?: string | null
          current_day?: number
          longest_streak?: number
          current_streak?: number
          last_post_date?: string | null
        }
      }
      posts: {
        Row: {
          id: string
          created_at: string
          user_id: string
          post_url: string
          day_number: number
          likes_count: number | null
          comments_count: number | null
          title: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          post_url: string
          day_number: number
          likes_count?: number | null
          comments_count?: number | null
          title?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          post_url?: string
          day_number?: number
          likes_count?: number | null
          comments_count?: number | null
          title?: string | null
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
  }
}