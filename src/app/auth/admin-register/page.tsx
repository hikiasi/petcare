'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthForm } from '@/components/forms/AuthForm';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { validateAdminInviteLink } from '@/lib/supabase/auth';

function AdminRegisterContent() {
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setError('Отсутствует токен приглашения');
        setIsValidToken(false);
        return;
      }

      try {
        await validateAdminInviteLink(token);
        setIsValidToken(true);
      } catch {
        setError('Недействительная или истекшая ссылка приглашения');
        setIsValidToken(false);
      }
    };

    validateToken();
  }, [token]);

  const handleRegistrationSuccess = async () => {
    if (!token) return;
    
    try {
      // Mark invite link as used
      // This will be handled in the registration process
      router.push('/auth/verify');
    } catch (error) {
      console.error('Error using invite link:', error);
    }
  };

  if (isValidToken === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Проверка приглашения...</p>
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-red-600">
              Ошибка приглашения
            </CardTitle>
            <CardDescription className="text-center">
              Не удалось подтвердить приглашение администратора
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Регистрация администратора
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Создайте аккаунт администратора PetCare
          </p>
        </div>
        
        <AuthForm 
          mode="register" 
          onSuccess={handleRegistrationSuccess}
        />
      </div>
    </div>
  );
}

export default function AdminRegisterPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <AdminRegisterContent />
    </Suspense>
  );
}