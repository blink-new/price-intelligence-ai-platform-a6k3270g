import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { CheckCircle, Clock, XCircle, Eye } from 'lucide-react'

interface Analysis {
  id: string
  image_url: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  item_name: string | null
  created_at: string
  confidence_score: number | null
}

interface AnalysisHistoryProps {
  analyses: Analysis[]
  onViewAnalysis: (id: string) => void
}

export function AnalysisHistory({ analyses, onViewAnalysis }: AnalysisHistoryProps) {
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
        return <Badge className="bg-green-500 text-white">Completed</Badge>
      case 'processing':
        return <Badge className="bg-orange-500 text-white animate-pulse">Processing</Badge>
      case 'failed':
        return <Badge className="bg-red-500 text-white">Failed</Badge>
      default:
        return <Badge variant="outline">Pending</Badge>
    }
  }

  const getCategoryColor = (itemName: string | null) => {
    if (!itemName) return 'bg-gray-500'
    
    const name = itemName.toLowerCase()
    if (name.includes('clothing') || name.includes('jacket') || name.includes('shirt')) {
      return 'bg-pink-500'
    }
    if (name.includes('electronics') || name.includes('phone') || name.includes('computer')) {
      return 'bg-blue-500'
    }
    if (name.includes('home') || name.includes('furniture') || name.includes('decor')) {
      return 'bg-green-500'
    }
    return 'bg-purple-500'
  }

  if (analyses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analysis History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No analyses yet</p>
            <p className="text-sm text-muted-foreground">Your analysis history will appear here</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analysis History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {analyses.map((analysis) => (
            <div 
              key={analysis.id} 
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src={analysis.image_url} 
                    alt="Product"
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div 
                    className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getCategoryColor(analysis.item_name)}`}
                  />
                </div>
                
                <div>
                  <h4 className="font-medium">
                    {analysis.item_name || 'Analyzing...'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(analysis.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {analysis.confidence_score && (
                  <Badge variant="outline" className="text-xs">
                    {analysis.confidence_score}% confidence
                  </Badge>
                )}
                
                {getStatusBadge(analysis.status)}
                
                {analysis.status === 'completed' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onViewAnalysis(analysis.id)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                )}
                
                {getStatusIcon(analysis.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}