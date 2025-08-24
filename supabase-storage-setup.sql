-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('pet-photos', 'pet-photos', true, 5242880, '{"image/jpeg","image/png","image/webp"}'),
  ('health-documents', 'health-documents', false, 10485760, '{"image/jpeg","image/png","image/webp","application/pdf"}'),
  ('receipts', 'receipts', false, 5242880, '{"image/jpeg","image/png","image/webp","application/pdf"}')
ON CONFLICT (id) DO NOTHING;

-- Storage policies for pet-photos bucket (public)
CREATE POLICY "Users can upload pet photos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'pet-photos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view pet photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'pet-photos');

CREATE POLICY "Users can update own pet photos" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'pet-photos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own pet photos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'pet-photos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for health-documents bucket (private)
CREATE POLICY "Users can upload health documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'health-documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own health documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'health-documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update own health documents" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'health-documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own health documents" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'health-documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for receipts bucket (private)
CREATE POLICY "Users can upload receipts" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'receipts' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own receipts" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'receipts' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update own receipts" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'receipts' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own receipts" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'receipts' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );