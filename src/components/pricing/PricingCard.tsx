import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { CheckCircle, Star, Crown, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PricingPlan {
  id: string
  name: string
  price: string
  period?: string
  credits: string
  gradient: string
  glowColor: string
  popular?: boolean
  features: string[]
  cta: string
  ctaAction: () => void
}

interface PricingCardProps {
  plan: PricingPlan
  className?: string
}

export function PricingCard({ plan, className }: PricingCardProps) {
  const getIcon = () => {
    switch (plan.id) {
      case 'free':
        return <Zap className="w-5 h-5" />
      case 'basic':
        return <CheckCircle className="w-5 h-5" />
      case 'pro':
        return <Star className="w-5 h-5" />
      case 'business':
        return <Crown className="w-5 h-5" />
      case 'enterprise':
        return <Crown className="w-5 h-5" />
      default:
        return <CheckCircle className="w-5 h-5" />
    }
  }

  const getPopularBadge = () => {
    if (plan.popular) {
      return (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="gradient-secondary text-white border-0 px-4 py-1 text-sm font-semibold shadow-lg">
            <Star className="w-3 h-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )
    }
    return null
  }

  const getGlowEffect = () => {
    if (plan.popular) {
      return 'glow-secondary'
    }
    return ''
  }

  return (
    <Card 
      className={cn(
        'relative bg-white border-2 hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden',
        plan.popular && 'border-orange-200 ring-2 ring-orange-500/20',
        getGlowEffect(),
        className
      )}
    >
      {getPopularBadge()}
      
      {/* Gradient Header */}
      <div className={`h-2 ${plan.gradient} w-full`} />
      
      <CardHeader className="text-center pb-4 pt-6">
        {/* Plan Icon */}
        <div className={`w-16 h-16 ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <div className="text-white">
            {getIcon()}
          </div>
        </div>
        
        {/* Plan Name */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        
        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline justify-center">
            <span className="text-4xl font-black text-gray-900">{plan.price}</span>
            {plan.period && (
              <span className="text-lg text-gray-500 ml-1">{plan.period}</span>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1 font-medium">{plan.credits}</p>
        </div>
        
        {/* CTA Button */}
        <Button 
          className={cn(
            'w-full text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105',
            plan.gradient,
            'hover:animate-gradient-fast'
          )}
          onClick={plan.ctaAction}
        >
          {plan.cta}
        </Button>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Features List */}
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* Additional Info for Popular Plan */}
        {plan.popular && (
          <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg border border-orange-200">
            <div className="flex items-center text-sm text-orange-700">
              <Star className="w-4 h-4 mr-2 text-orange-500" />
              <span className="font-medium">Best value for growing businesses</span>
            </div>
          </div>
        )}
        
        {/* Enterprise Contact Info */}
        {plan.id === 'enterprise' && (
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
            <div className="text-sm text-amber-700">
              <div className="font-medium mb-1">Need a custom solution?</div>
              <div>Contact our sales team for enterprise pricing and custom features.</div>
            </div>
          </div>
        )}
      </CardContent>
      
      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  )
}