import React from 'react'
import { PricingCard } from './PricingCard'
import { useToast } from '../../hooks/use-toast'
import { Badge } from '../ui/badge'

export function PricingSection() {
  const { toast } = useToast()

  const handlePlanSelect = (planId: string) => {
    toast({
      title: 'Coming Soon!',
      description: `${planId} plan integration with Stripe is being implemented.`,
    })
  }

  const pricingPlans = [
    {
      id: 'free',
      name: 'Free Trial',
      price: '$0',
      credits: '2 Analyses Total',
      gradient: 'gradient-silver',
      glowColor: 'shadow-gray-500/20',
      features: [
        'AI-Powered Image Analysis',
        'Basic Price Intelligence',
        'Marketplace Recommendations',
        'SEO Content Generation',
        'Visual Comparables'
      ],
      cta: 'Start Free Trial',
      ctaAction: () => handlePlanSelect('Free Trial')
    },
    {
      id: 'basic',
      name: 'Basic',
      price: '$9.99',
      period: '/ month',
      credits: '20 Analyses / month',
      gradient: 'gradient-blue',
      glowColor: 'shadow-blue-500/30',
      features: [
        'Everything in Free Trial',
        'Advanced Market Analysis',
        'Priority Processing',
        'Email Support',
        'Export Results',
        'Price History Tracking'
      ],
      cta: 'Choose Basic',
      ctaAction: () => handlePlanSelect('Basic')
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$19.99',
      period: '/ month',
      credits: '50 Analyses / month',
      gradient: 'gradient-purple',
      glowColor: 'shadow-purple-500/40',
      popular: true,
      features: [
        'Everything in Basic',
        'Bulk Analysis Upload',
        'Advanced Comparables',
        'Custom Branding',
        'Priority Support',
        'API Access',
        'Advanced Analytics'
      ],
      cta: 'Choose Pro',
      ctaAction: () => handlePlanSelect('Pro')
    },
    {
      id: 'business',
      name: 'Business',
      price: '$29.99',
      period: '/ month',
      credits: '100 Analyses / month',
      gradient: 'gradient-green',
      glowColor: 'shadow-green-500/30',
      features: [
        'Everything in Pro',
        'Team Collaboration',
        'Advanced Analytics',
        'White-label Options',
        'Dedicated Support',
        'Custom Integrations',
        'Bulk Operations'
      ],
      cta: 'Choose Business',
      ctaAction: () => handlePlanSelect('Business')
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$69.99',
      period: '/ month',
      credits: 'Unlimited Analyses',
      gradient: 'gradient-orange',
      glowColor: 'shadow-orange-500/30',
      features: [
        'Everything in Business',
        'Unlimited Processing',
        'Custom AI Models',
        'On-premise Deployment',
        '24/7 Phone Support',
        'SLA Guarantee',
        'Custom Training'
      ],
      cta: 'Contact Us',
      ctaAction: () => window.open('mailto:sales@priceai.com', '_blank')
    }
  ]

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full gradient-primary opacity-5 animate-gradient" />
        <div className="absolute top-20 left-20 w-96 h-96 gradient-purple rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 gradient-blue rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 gradient-green rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <Badge className="gradient-secondary text-white border-0 mb-6 text-lg px-6 py-2">
            Pricing Plans
          </Badge>
          <h2 className="text-5xl font-bold text-white mb-6">
            Choose Your Plan
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Select the perfect plan for your business needs. All plans include our core AI features 
            with a <span className="text-green-400 font-semibold">14-day money-back guarantee</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard 
              key={plan.id} 
              plan={plan}
              className={plan.popular ? 'lg:scale-110 lg:-mt-8' : ''}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-6 text-slate-400 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>14-day money-back guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}