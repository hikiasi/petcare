import { supabase } from './client';
import { createServiceClient } from './server';

// Storage bucket names
export const STORAGE_BUCKETS = {
  PET_PHOTOS: 'pet-photos',
  HEALTH_DOCUMENTS: 'health-documents',
  RECEIPTS: 'receipts',
} as const;

// Upload file to storage
export async function uploadFile(
  bucket: string,
  path: string,
  file: File,
  options?: {
    cacheControl?: string;
    contentType?: string;
    upsert?: boolean;
  }
) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: options?.cacheControl || '3600',
      contentType: options?.contentType || file.type,
      upsert: options?.upsert || false,
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  return data;
}

// Get public URL for file
export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

// Delete file from storage
export async function deleteFile(bucket: string, path: string) {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  
  if (error) {
    throw new Error(`Delete failed: ${error.message}`);
  }
}

// Create storage buckets (admin function)
export async function createStorageBuckets() {
  const serviceClient = createServiceClient();
  
  const buckets = [
    {
      id: STORAGE_BUCKETS.PET_PHOTOS,
      name: STORAGE_BUCKETS.PET_PHOTOS,
      public: true,
      file_size_limit: 5242880, // 5MB
      allowed_mime_types: ['image/jpeg', 'image/png', 'image/webp'],
    },
    {
      id: STORAGE_BUCKETS.HEALTH_DOCUMENTS,
      name: STORAGE_BUCKETS.HEALTH_DOCUMENTS,
      public: false,
      file_size_limit: 10485760, // 10MB
      allowed_mime_types: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    },
    {
      id: STORAGE_BUCKETS.RECEIPTS,
      name: STORAGE_BUCKETS.RECEIPTS,
      public: false,
      file_size_limit: 5242880, // 5MB
      allowed_mime_types: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    },
  ];

  const results = [];
  
  for (const bucket of buckets) {
    const { data, error } = await serviceClient.storage.createBucket(bucket.id, {
      public: bucket.public,
      fileSizeLimit: bucket.file_size_limit,
      allowedMimeTypes: bucket.allowed_mime_types,
    });
    
    results.push({ bucket: bucket.id, data, error });
  }
  
  return results;
}

// Helper function to generate unique file path
export function generateFilePath(userId: string, fileName: string, folder?: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = fileName.split('.').pop();
  const basePath = folder ? `${folder}/${userId}` : userId;
  
  return `${basePath}/${timestamp}_${randomString}.${extension}`;
}