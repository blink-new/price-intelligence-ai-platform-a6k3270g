import heic2any from 'heic2any'

export async function convertHeicToJpeg(file: File): Promise<File> {
  if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
    try {
      const convertedBlob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.8
      })
      
      // heic2any can return Blob or Blob[], handle both cases
      const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob
      
      return new File([blob], file.name.replace(/\.heic$/i, '.jpg'), {
        type: 'image/jpeg',
        lastModified: file.lastModified
      })
    } catch (error) {
      console.error('Error converting HEIC file:', error)
      throw new Error('Failed to convert HEIC file. Please try a different format.')
    }
  }
  
  return file
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp',
    'image/heic'
  ]
  
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size must be less than 10MB'
    }
  }
  
  const isValidType = allowedTypes.includes(file.type) || 
                     file.name.toLowerCase().endsWith('.heic')
  
  if (!isValidType) {
    return {
      valid: false,
      error: 'Please upload a valid image file (JPG, PNG, WebP, or HEIC)'
    }
  }
  
  return { valid: true }
}

export async function uploadImageToSupabase(file: File, userId: string): Promise<string> {
  const { supabase } = await import('../lib/supabase')
  
  // Convert HEIC if needed
  const processedFile = await convertHeicToJpeg(file)
  
  // Generate unique filename
  const fileExt = processedFile.name.split('.').pop()
  const fileName = `${userId}/${Date.now()}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('analysis-images')
    .upload(fileName, processedFile, {
      cacheControl: '3600',
      upsert: false
    })
  
  if (error) {
    console.error('Upload error:', error)
    throw new Error('Failed to upload image')
  }
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('analysis-images')
    .getPublicUrl(data.path)
  
  return publicUrl
}