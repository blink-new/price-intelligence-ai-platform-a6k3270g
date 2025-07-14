import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { 
  Camera, 
  TrendingUp, 
  Target, 
  Zap, 
  CheckCircle, 
  Star,
  ArrowRight,
  Sparkles,
  BarChart3,
  Globe,
  Shield,
  Upload,
  Brain,
  Search,
  DollarSign,
  Users,
  Award,
  Rocket
} from 'lucide-react'
import { AuthModal } from '../auth/AuthModal'
import { PricingSection } from '../pricing/PricingSection'

export function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleGetStarted = () => {
    setAuthMode('signup')
    setShowAuthModal(true)
  }

  const handleSignIn = () => {
    setAuthMode('signin')
    setShowAuthModal(true)
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center animate-pulse-glow">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Price Intelligence AI
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={handleSignIn} className="hover:bg-primary/10">
                Sign In
              </Button>
              <Button 
                className="gradient-primary text-white hover:animate-gradient-fast shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleGetStarted}
              >
                <Rocket className="w-4 h-4 mr-2" />
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Animated Background */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 gradient-primary opacity-10 animate-gradient" />
        
        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute w-96 h-96 gradient-purple rounded-full mix-blend-multiply filter blur-xl opacity-30 float-animation"
            style={{ 
              top: '10%', 
              left: '10%',
              transform: `translateY(${scrollY * 0.1}px)`
            }}
          />
          <div 
            className="absolute w-96 h-96 gradient-blue rounded-full mix-blend-multiply filter blur-xl opacity-30 float-animation"
            style={{ 
              top: '20%', 
              right: '10%',
              animationDelay: '2s',
              transform: `translateY(${scrollY * 0.15}px)`
            }}
          />
          <div 
            className="absolute w-96 h-96 gradient-green rounded-full mix-blend-multiply filter blur-xl opacity-30 float-animation"
            style={{ 
              bottom: '10%', 
              left: '50%',
              animationDelay: '4s',
              transform: `translateY(${scrollY * 0.2}px)`
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-primary text-sm font-medium mb-8 shadow-lg">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            AI-Powered Pricing Intelligence Platform
            <Badge className="ml-3 gradient-secondary text-white border-0">NEW</Badge>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 via-teal-500 to-green-500 bg-clip-text text-transparent animate-gradient">
              Turn a Photo
            </span>
            <span className="block bg-gradient-to-r from-green-500 via-teal-500 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
              into Profit.
            </span>
            <span className="block text-foreground text-5xl md:text-6xl mt-4">
              AI-Powered Pricing for Online Sellers.
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            Upload a product photo and get instant AI-powered pricing insights, marketplace recommendations, 
            and SEO-optimized listing content to <span className="text-green-600 font-semibold">maximize your sales</span> across all platforms.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Button 
              size="lg" 
              className="gradient-primary text-white hover:animate-gradient-fast text-xl px-12 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 glow-primary"
              onClick={handleGetStarted}
            >
              <Zap className="w-6 h-6 mr-3" />
              Start Your Free Trial
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-xl px-12 py-6 border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
            >
              <Camera className="w-6 h-6 mr-3" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
            {[
              { icon: CheckCircle, text: 'Google Cloud Vision', color: 'text-blue-500' },
              { icon: Brain, text: 'Gemini AI Analysis', color: 'text-purple-500' },
              { icon: Search, text: 'Multi-Marketplace Search', color: 'text-green-500' },
              { icon: Zap, text: 'Instant Results', color: 'text-orange-500' }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 group">
                <div className={`w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </div>

          {/* App Mockup */}
          <div className="relative max-w-6xl mx-auto">
            <div className="relative bg-white rounded-3xl shadow-2xl border border-border overflow-hidden transform hover:scale-105 transition-transform duration-500">
              {/* Browser Header */}
              <div className="gradient-primary h-3 flex items-center justify-start px-4 space-x-2">
                <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                <div className="w-3 h-3 bg-white/30 rounded-full"></div>
              </div>
              
              {/* Dashboard Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Image Analysis Card */}
                  <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 card-hover">
                    <CardHeader className="pb-3">
                      <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center mb-3 shadow-lg">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-lg text-blue-700">Image Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600 mb-2">94%</div>
                      <div className="text-sm text-blue-600 font-medium">Confidence Score</div>
                      <div className="w-full h-2 bg-blue-200 rounded-full mt-3">
                        <div className="w-[94%] h-full confidence-bar rounded-full"></div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Price Intelligence Card */}
                  <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100 card-hover">
                    <CardHeader className="pb-3">
                      <div className="w-10 h-10 gradient-green rounded-xl flex items-center justify-center mb-3 shadow-lg">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-lg text-green-700">Price Range</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600 mb-2">$89-149</div>
                      <div className="text-sm text-green-600 font-medium">Recommended: $119</div>
                      <div className="w-full h-2 bg-green-200 rounded-full mt-3">
                        <div className="w-[75%] h-full price-range-bar rounded-full"></div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Marketplace Recommendation Card */}
                  <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 card-hover">
                    <CardHeader className="pb-3">
                      <div className="w-10 h-10 gradient-purple rounded-xl flex items-center justify-center mb-3 shadow-lg">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-lg text-purple-700">Best Platform</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-purple-600 mb-2">eBay</div>
                      <div className="text-sm text-purple-600 font-medium">Highest ROI</div>
                      <Badge className="mt-3 marketplace-ebay text-white border-0">Recommended</Badge>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            
            {/* Floating Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 gradient-orange rounded-full animate-bounce shadow-lg" />
            <div className="absolute -top-4 -right-8 w-8 h-8 gradient-pink rounded-full animate-bounce shadow-lg" style={{ animationDelay: '1s' }} />
            <div className="absolute -bottom-6 left-1/4 w-16 h-16 gradient-cyan rounded-full animate-bounce shadow-lg" style={{ animationDelay: '2s' }} />
            <div className="absolute -bottom-4 right-1/3 w-6 h-6 gradient-gold rounded-full animate-bounce shadow-lg" style={{ animationDelay: '3s' }} />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="gradient-secondary text-white border-0 mb-4">How It Works</Badge>
            <h2 className="text-5xl font-bold mb-6">Three Simple Steps to Success</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your product photos into profitable listings with our AI-powered platform
            </p>
          </div>

          <div className="relative">
            {/* Animated Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-2 hidden lg:block">
              <svg className="w-full h-full" viewBox="0 0 100 2" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(271, 91%, 65%)" />
                    <stop offset="25%" stopColor="hsl(221, 83%, 53%)" />
                    <stop offset="50%" stopColor="hsl(180, 84%, 39%)" />
                    <stop offset="100%" stopColor="hsl(160, 84%, 39%)" />
                  </linearGradient>
                </defs>
                <line 
                  x1="0" y1="1" x2="100" y2="1" 
                  stroke="url(#lineGradient)" 
                  strokeWidth="2"
                  className="animate-draw-line"
                />
              </svg>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {[
                {
                  step: '01',
                  title: 'Upload Photo',
                  description: 'Simply drag and drop or upload your product image. We support all formats including HEIC and automatically convert them.',
                  icon: Upload,
                  gradient: 'gradient-blue',
                  features: ['HEIC Support', 'Auto-Convert', 'Drag & Drop', 'Instant Upload']
                },
                {
                  step: '02',
                  title: 'AI Analysis',
                  description: 'Our advanced AI analyzes your image using Google Cloud Vision and searches across multiple marketplaces for competitive data.',
                  icon: Brain,
                  gradient: 'gradient-purple',
                  features: ['Google Vision', 'Gemini AI', 'Market Search', 'Real-time Data']
                },
                {
                  step: '03',
                  title: 'Get Results',
                  description: 'Receive comprehensive pricing recommendations, marketplace suggestions, and SEO-optimized content to maximize your profits.',
                  icon: Award,
                  gradient: 'gradient-green',
                  features: ['Price Analysis', 'Platform Rec', 'SEO Content', 'Profit Max']
                }
              ].map((item, index) => (
                <Card key={index} className="relative bg-white border-2 hover:shadow-2xl transition-all duration-500 hover:scale-105 card-hover group">
                  <CardContent className="p-8 text-center">
                    {/* Icon */}
                    <div className={`w-20 h-20 ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-10 h-10 text-white" />
                    </div>
                    
                    {/* Step Number */}
                    <div className="text-sm font-bold text-muted-foreground mb-3 tracking-wider">{item.step}</div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-4 text-foreground">{item.title}</h3>
                    
                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">{item.description}</p>
                    
                    {/* Features */}
                    <div className="grid grid-cols-2 gap-2">
                      {item.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                    {index + 1}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="gradient-primary text-white border-0 mb-4">Powerful Features</Badge>
            <h2 className="text-5xl font-bold mb-6">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools you need to optimize your product listings and maximize profits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Image Analysis',
                description: 'Advanced AI identifies products, extracts details, and analyzes visual elements with precision.',
                icon: Camera,
                gradient: 'gradient-blue',
                features: ['Google Cloud Vision', 'Object Detection', 'Text Recognition', 'Quality Assessment'],
                color: 'blue'
              },
              {
                title: 'Price Intelligence',
                description: 'Real-time market analysis across multiple platforms for competitive pricing insights.',
                icon: BarChart3,
                gradient: 'gradient-green',
                features: ['Multi-Platform Search', 'Price Trends', 'Profit Optimization', 'Market Analysis'],
                color: 'green'
              },
              {
                title: 'Marketplace Recommendations',
                description: 'AI suggests the best platforms based on your product type and current market conditions.',
                icon: Globe,
                gradient: 'gradient-purple',
                features: ['Platform Analysis', 'Fee Comparison', 'Audience Matching', 'ROI Optimization'],
                color: 'purple'
              },
              {
                title: 'Content Generation',
                description: 'SEO-optimized titles, descriptions, and tags to maximize visibility and conversions.',
                icon: Target,
                gradient: 'gradient-orange',
                features: ['SEO Optimization', 'Keyword Research', 'A/B Testing', 'Performance Tracking'],
                color: 'orange'
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 hover:border-primary/20 card-hover bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className={`w-4 h-4 text-${feature.color}-500 mr-3 flex-shrink-0`} />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Final CTA Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full gradient-primary opacity-10 animate-gradient" />
          <div className="absolute top-20 left-20 w-64 h-64 gradient-purple rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
          <div className="absolute bottom-20 right-20 w-64 h-64 gradient-blue rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <Badge className="gradient-secondary text-white border-0 mb-6 text-lg px-6 py-2">Ready to Get Started?</Badge>
            <h2 className="text-6xl font-bold mb-6">
              Ready to Price with 
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Confidence?
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of sellers who use Price Intelligence AI to optimize their listings 
              and increase sales across all major marketplaces. Start your free trial today!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Button 
              size="lg" 
              className="gradient-primary text-white hover:animate-gradient-fast text-xl px-12 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 glow-primary"
              onClick={handleGetStarted}
            >
              <Star className="w-6 h-6 mr-3" />
              Start Your Free Trial
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-xl px-12 py-6 border-2 border-white text-white hover:bg-white hover:text-slate-900 transition-all duration-300"
            >
              <BarChart3 className="w-6 h-6 mr-3" />
              View Pricing Plans
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Shield, text: 'Enterprise Security', color: 'text-blue-400' },
              { icon: CheckCircle, text: '99.9% Uptime', color: 'text-green-400' },
              { icon: Star, text: '5-Star Support', color: 'text-yellow-400' },
              { icon: Zap, text: 'Instant Results', color: 'text-purple-400' }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center space-y-3 group">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors duration-300">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Price Intelligence AI
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>© 2024 Price Intelligence AI. All rights reserved.</span>
              <div className="flex items-center space-x-4">
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms</a>
                <a href="#" className="hover:text-primary transition-colors">Support</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />
    </div>
  )
}