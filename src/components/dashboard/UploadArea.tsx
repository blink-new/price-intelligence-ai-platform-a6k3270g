import React, { useState, useCallback } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/use-toast'
import { supabase } from '../../lib/supabase'
import { convertHeicToJpeg, validateImageFile, uploadImageToSupabase } from '../../utils/imageUtils'
import { 
  Upload, 
  X, 
  Camera, 
  FileImage, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Sparkles
} from 'lucide-react'

interface UploadAreaProps {
  onClose: () => void
  onSuccess: () => void
}

export function UploadArea({ onClose, onSuccess }: UploadAreaProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const { user } = useAuth()
  const { toast } = useToast()

  const handleFileSelect = useCallback(async (selectedFile: File) => {
    const validation = validateImageFile(selectedFile)
    if (!validation.valid) {
      toast({
        title: 'Invalid File',
        description: validation.error,
        variant: 'destructive'
      })
      return
    }

    try {
      // Convert HEIC if needed
      const processedFile = await convertHeicToJpeg(selectedFile)
      setFile(processedFile)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(processedFile)

      toast({
        title: 'File Ready',
        description: `${processedFile.name} is ready for analysis`,
      })
    } catch (error) {
      console.error('Error processing file:', error)
      toast({
        title: 'Processing Error',
        description: 'Failed to process the image file',
        variant: 'destructive'
      })
    }
  }, [toast])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }, [handleFileSelect])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const handleAnalyze = async () => {
    if (!file || !user) return

    setUploading(true)
    try {
      // Upload image to Supabase Storage
      const imageUrl = await uploadImageToSupabase(file, user.id)

      // Create analysis record
      const { data: analysis, error: createError } = await supabase
        .from('analyses')
        .insert({
          user_id: user.id,
          image_url: imageUrl,
          status: 'pending'
        })
        .select()
        .single()

      if (createError) {
        throw createError
      }

      setUploading(false)
      setAnalyzing(true)

      // Call the analyze-image edge function
      const { data, error } = await supabase.functions.invoke('analyze-image', {
        body: {
          analysis_id: analysis.id,
          image_url: imageUrl
        }
      })

      if (error) {
        throw error
      }

      toast({
        title: 'Analysis Complete!',
        description: `${data.item_name || 'Your item'} has been analyzed with ${data.confidence_score}% confidence`,
      })

      onSuccess()
      onClose()

    } catch (error: any) {
      console.error('Analysis error:', error)
      toast({
        title: 'Analysis Failed',
        description: error.message || 'Failed to analyze the image',
        variant: 'destructive'
      })
    } finally {
      setUploading(false)
      setAnalyzing(false)
    }
  }

  const removeFile = () => {
    setFile(null)
    setPreview(null)
  }

  const isProcessing = uploading || analyzing

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span>Start New Analysis</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!file ? (
            // Upload Area
            <div
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-primary bg-primary/5 rainbow-border' 
                  : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {dragActive ? 'Drop your image here' : 'Upload Product Image'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your image or click to browse
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports JPG, PNG, WebP, and HEIC formats (max 10MB)
                  </p>
                </div>

                <Button 
                  variant="outline" 
                  className="relative overflow-hidden"
                  disabled={isProcessing}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Choose File
                  <input
                    type="file"
                    accept="image/*,.heic"
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isProcessing}
                  />
                </Button>
              </div>
            </div>
          ) : (
            // File Preview
            <div className="space-y-4">
              <div className="relative bg-gray-50 rounded-xl p-4">
                <div className="flex items-start space-x-4">
                  {preview && (
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
                    />
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 truncate">
                          {file.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                        disabled={isProcessing}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="mt-2 flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600 font-medium">
                        Ready for analysis
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analysis Status */}
              {isProcessing && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="loading-spinner w-6 h-6 rounded-full"></div>
                    <div>
                      <h4 className="font-medium text-blue-900">
                        {uploading ? 'Uploading image...' : 'Analyzing with AI...'}
                      </h4>
                      <p className="text-sm text-blue-700">
                        {uploading 
                          ? 'Securely uploading your image to our servers'
                          : 'Our AI is analyzing your product and searching for market data'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            
            <Button 
              className="gradient-primary text-white hover:animate-gradient-fast"
              onClick={handleAnalyze}
              disabled={!file || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {uploading ? 'Uploading...' : 'Analyzing...'}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start Analysis
                </>
              )}
            </Button>
          </div>

          {/* Info Section */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <FileImage className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  What happens next?
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• AI analyzes your image using Google Cloud Vision</li>
                  <li>• Searches multiple marketplaces for comparable items</li>
                  <li>• Generates pricing recommendations and SEO content</li>
                  <li>• Results appear in your dashboard within seconds</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}