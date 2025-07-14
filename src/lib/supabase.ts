import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kvsfdjrhsnkfmsuhehnv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2c2ZkanJoc25rZm1zdWhlaG52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTM5NDcsImV4cCI6MjA2ODA2OTk0N30.58mafX7ex4CdVNg2V8Ejps241A64mbFTFEexjGl1GDU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      analyses: {
        Row: {
          id: string
          user_id: string
          image_url: string
          status: 'pending' | 'processing' | 'completed' | 'failed'
          item_name: string | null
          condition: string | null
          price_range: {
            low: number
            median: number
            high: number
          } | null
          recommended_marketplace: string | null
          marketplace_reasoning: string | null
          generated_title: string | null
          generated_description: string | null
          generated_tags: string[] | null
          comparables: Array<{
            title: string
            price: number
            url: string
          }> | null
          confidence_score: number | null
          error_message: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          image_url: string
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          item_name?: string | null
          condition?: string | null
          price_range?: {
            low: number
            median: number
            high: number
          } | null
          recommended_marketplace?: string | null
          marketplace_reasoning?: string | null
          generated_title?: string | null
          generated_description?: string | null
          generated_tags?: string[] | null
          comparables?: Array<{
            title: string
            price: number
            url: string
          }> | null
          confidence_score?: number | null
          error_message?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          image_url?: string
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          item_name?: string | null
          condition?: string | null
          price_range?: {
            low: number
            median: number
            high: number
          } | null
          recommended_marketplace?: string | null
          marketplace_reasoning?: string | null
          generated_title?: string | null
          generated_description?: string | null
          generated_tags?: string[] | null
          comparables?: Array<{
            title: string
            price: number
            url: string
          }> | null
          confidence_score?: number | null
          error_message?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          plan_type: 'free' | 'basic' | 'pro' | 'business' | 'enterprise'
          credits_remaining: number
          credits_total: number
          status: 'active' | 'canceled' | 'past_due' | 'incomplete'
          current_period_start: string | null
          current_period_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          plan_type?: 'free' | 'basic' | 'pro' | 'business' | 'enterprise'
          credits_remaining?: number
          credits_total?: number
          status?: 'active' | 'canceled' | 'past_due' | 'incomplete'
          current_period_start?: string | null
          current_period_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          plan_type?: 'free' | 'basic' | 'pro' | 'business' | 'enterprise'
          credits_remaining?: number
          credits_total?: number
          status?: 'active' | 'canceled' | 'past_due' | 'incomplete'
          current_period_start?: string | null
          current_period_end?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}