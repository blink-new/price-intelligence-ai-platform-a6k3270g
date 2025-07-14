import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { useAuth } from '../../hooks/useAuth'
import { useSubscription } from '../../hooks/useSubscription'
import { supabase } from '../../lib/supabase'
import { useToast } from '../../hooks/use-toast'
import { 
  Upload, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  BarChart3,
  Zap,
  CreditCard,
  Sparkles,
  Target,
  DollarSign,
  Globe,
  Eye,
  Calendar,
  Activity
} from 'lucide-react'
import { UploadArea } from './UploadArea'
import { AnalysisHistory } from './AnalysisHistory'

interface Analysis {
  id: string
  image_url: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  item_name: string | null
  created_at: string
  confidence_score: number | null
  price_range: {
    low: number
    median: number
    high: number
  } | null
  recommended_marketplace: string | null
}

export function Dashboard() {
  const { user, signOut } = useAuth()
  const { subscription, loading: subscriptionLoading } = useSubscription()
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [loading, setLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const { toast } = useToast()

  const fetchAnalyses = useCallback(async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('analyses')
        .select('id, image_url, status, item_name, created_at, confidence_score, price_range, recommended_marketplace')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) {
        console.error('Error fetching analyses:', error)
        return
      }

      setAnalyses(data || [])
    } catch (error) {
      console.error('Error fetching analyses:', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      fetchAnalyses()
    }
  }, [user, fetchAnalyses])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'processing':
        return <Clock className="w-4 h-4 text-orange-500 animate-pulse" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="status-completed">Completed</Badge>
      case 'processing':
        return <Badge className="status-processing">Processing</Badge>
      case 'failed':
        return <Badge className="status-failed">Failed</Badge>
      default:
        return <Badge variant="outline">Pending</Badge>
    }
  }

  const getPlanGradient = (planType: string) => {
    switch (planType) {
      case 'basic':
        return 'gradient-blue'
      case 'pro':
        return 'gradient-purple'
      case 'business':
        return 'gradient-green'
      case 'enterprise':
        return 'gradient-orange'
      default:
        return 'gradient-silver'
    }
  }

  const getMarketplaceBadge = (marketplace: string) => {
    const marketplaceClass = `marketplace-${marketplace?.toLowerCase()}`
    return (
      <Badge className={`${marketplaceClass} text-white border-0`}>
        {marketplace}
      </Badge>
    )
  }

  const creditsPercentage = subscription 
    ? (subscription.credits_remaining / subscription.credits_total) * 100 
    : 0

  const completedAnalyses = analyses.filter(a => a.status === 'completed')
  const successRate = analyses.length > 0 
    ? Math.round((completedAnalyses.length / analyses.length) * 100)
    : 0

  if (loading || subscriptionLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
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
              <Badge variant="secondary" className="bg-accent/10 text-accent-foreground font-medium">
                <CreditCard className="w-3 h-3 mr-1" />
                {subscription?.credits_remaining || 0} credits
              </Badge>
              <Button variant="outline" size="sm" onClick={signOut} className="hover:bg-red-50 hover:text-red-600 hover:border-red-200">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-3">
              Welcome back, 
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent ml-2">
                {user?.email?.split('@')[0]}!
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Ready to analyze your next product? Upload an image to get started.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Credits Card */}
            <Card className="border-2 hover:shadow-xl transition-all duration-300 card-hover bg-gradient-to-br from-white to-blue-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Credits Remaining</CardTitle>
                <div className="w-8 h-8 gradient-blue rounded-lg flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-3 text-blue-600">
                  {subscription?.credits_remaining || 0}
                </div>
                <div className="space-y-2">
                  <Progress 
                    value={creditsPercentage} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{subscription?.credits_remaining || 0} left</span>
                    <span>{subscription?.credits_total || 0} total</span>
                  </div>
                </div>
                <Badge className={`mt-3 ${getPlanGradient(subscription?.plan_type || 'free')} text-white border-0`}>
                  {subscription?.plan_type?.toUpperCase() || 'FREE'} Plan
                </Badge>
              </CardContent>
            </Card>

            {/* Total Analyses */}
            <Card className="border-2 hover:shadow-xl transition-all duration-300 card-hover bg-gradient-to-br from-white to-green-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Analyses</CardTitle>
                <div className="w-8 h-8 gradient-green rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2 text-green-600">{analyses.length}</div>
                <p className="text-xs text-muted-foreground">
                  {completedAnalyses.length} completed successfully
                </p>
                <div className="mt-3 flex items-center text-sm">
                  <Activity className="w-3 h-3 mr-1 text-green-500" />
                  <span className="text-green-600 font-medium">Active</span>
                </div>
              </CardContent>
            </Card>

            {/* Success Rate */}
            <Card className="border-2 hover:shadow-xl transition-all duration-300 card-hover bg-gradient-to-br from-white to-purple-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <div className="w-8 h-8 gradient-purple rounded-lg flex items-center justify-center">
                  <Target className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2 text-purple-600">
                  {successRate}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Analysis accuracy rate
                </p>
                <div className="mt-3 flex items-center text-sm">
                  <Zap className="w-3 h-3 mr-1 text-purple-500" />
                  <span className="text-purple-600 font-medium">Excellent</span>
                </div>
              </CardContent>
            </Card>

            {/* Average Price */}
            <Card className="border-2 hover:shadow-xl transition-all duration-300 card-hover bg-gradient-to-br from-white to-orange-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Price Range</CardTitle>
                <div className="w-8 h-8 gradient-orange rounded-lg flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2 text-orange-600">
                  ${completedAnalyses.length > 0 
                    ? Math.round(completedAnalyses.reduce((acc, a) => acc + (a.price_range?.median || 0), 0) / completedAnalyses.length)
                    : 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Median recommended price
                </p>
                <div className="mt-3 flex items-center text-sm">
                  <TrendingUp className="w-3 h-3 mr-1 text-orange-500" />
                  <span className="text-orange-600 font-medium">Trending</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Action */}
          <Card className="border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all duration-300 bg-gradient-to-br from-white to-purple-50">
            <CardContent className="p-12">
              <div className="text-center">
                <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl animate-pulse-glow">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3">Start New Analysis</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Upload a product image and let our AI analyze it for pricing insights, 
                  marketplace recommendations, and SEO-optimized content.
                </p>
                
                <Button 
                  size="lg" 
                  className="gradient-primary text-white hover:animate-gradient-fast text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300"
                  onClick={() => setShowUpload(true)}
                  disabled={!subscription || subscription.credits_remaining <= 0}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Start New Analysis
                </Button>
                
                {(!subscription || subscription.credits_remaining <= 0) && (
                  <p className="text-sm text-red-600 mt-4 font-medium">
                    No credits remaining. Please upgrade your plan to continue.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Analyses */}
          <Card className="border-2 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-6 h-6 gradient-primary rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <span>Recent Analyses</span>
                <Badge variant="secondary" className="ml-auto">
                  {analyses.length} total
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analyses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h4 className="text-lg font-medium mb-2">No analyses yet</h4>
                  <p className="text-muted-foreground mb-4">Upload your first product image to get started</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowUpload(true)}
                    disabled={!subscription || subscription.credits_remaining <= 0}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start First Analysis
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {analyses.map((analysis) => (
                    <div key={analysis.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-colors group">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img 
                            src={analysis.image_url} 
                            alt="Product"
                            className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200 group-hover:scale-105 transition-transform duration-300"
                          />
                          {analysis.status === 'completed' && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {analysis.item_name || 'Analyzing...'}
                          </h4>
                          <div className="flex items-center space-x-3 mt-1">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(analysis.created_at).toLocaleDateString()}
                            </div>
                            {analysis.price_range && (
                              <div className="flex items-center text-sm text-green-600">
                                <DollarSign className="w-3 h-3 mr-1" />
                                ${analysis.price_range.low}-{analysis.price_range.high}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {analysis.confidence_score && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {analysis.confidence_score}% confidence
                          </Badge>
                        )}
                        
                        {analysis.recommended_marketplace && (
                          getMarketplaceBadge(analysis.recommended_marketplace)
                        )}
                        
                        {getStatusBadge(analysis.status)}
                        
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {analyses.length >= 10 && (
                    <div className="text-center pt-4">
                      <Button variant="outline">
                        View All Analyses
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Upload Modal */}
      {showUpload && (
        <UploadArea 
          onClose={() => setShowUpload(false)}
          onSuccess={() => {
            setShowUpload(false)
            fetchAnalyses()
          }}
        />
      )}
    </div>
  )
}