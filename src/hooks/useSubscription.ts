import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

interface Subscription {
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

export function useSubscription() {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setSubscription(null)
      setLoading(false)
      return
    }

    const fetchSubscription = async () => {
      try {
        const { data, error } = await supabase
          .from('user_subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching subscription:', error)
          return
        }

        setSubscription(data)
      } catch (error) {
        console.error('Error fetching subscription:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscription()
  }, [user])

  const updateCredits = async (creditsUsed: number) => {
    if (!subscription || !user) return false

    const newCreditsRemaining = Math.max(0, subscription.credits_remaining - creditsUsed)

    try {
      const { error } = await supabase
        .from('user_subscriptions')
        .update({ 
          credits_remaining: newCreditsRemaining,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)

      if (error) {
        console.error('Error updating credits:', error)
        return false
      }

      setSubscription(prev => prev ? { ...prev, credits_remaining: newCreditsRemaining } : null)
      return true
    } catch (error) {
      console.error('Error updating credits:', error)
      return false
    }
  }

  const refreshSubscription = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error)
        return
      }

      setSubscription(data)
    } catch (error) {
      console.error('Error fetching subscription:', error)
    }
  }

  return {
    subscription,
    loading,
    updateCredits,
    refreshSubscription
  }
}