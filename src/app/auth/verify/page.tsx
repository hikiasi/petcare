'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

function VerifyContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Проверяем hash параметры из URL (новый формат Supabase)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');

        // Также проверяем query параметры (старый формат)
        const token = searchParams.get('token');
        const queryType = searchParams.get('type');

        if (accessToken && refreshToken && type === 'signup') {
          // Новый формат - устанавливаем сессию
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) throw error;

          setSuccess(true);
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);

        } else if (token && queryType) {
          // Старый формат - используем verifyOtp
          const { error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: queryType as 'signup' | 'recovery' | 'email_change',
          });

          if (error) throw error;

          setSuccess(true);
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);

        } else {
          // Проверяем, может быть пользователь уже авторизован
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session) {
            setSuccess(true);
            setTimeout(() => {
              router.push('/dashboard');
            }, 1000);
          } else {
            setError('Неверная ссылка верификации или ссылка устарела');
          }
        }

      } catch (error: unknown) {
        console.error('Verification error:', error);
        setError(error instanceof Error ? error.message : 'Произошла ошибка при верификации');
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <p>Верифицируем ваш email...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {success ? 'Email подтвержден!' : 'Ошибка верификации'}
            </CardTitle>
            <CardDescription>
              {success 
                ? 'Ваш email успешно подтвержден. Перенаправляем в личный кабинет...'
                : 'Не удалось подтвердить ваш email'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="mb-4">
                <AlertDescription>
                  Добро пожаловать в PetCare! Сейчас вы будете перенаправлены в личный кабинет.
                </AlertDescription>
              </Alert>
            )}

            {!success && (
              <div className="space-y-4">
                <Button 
                  onClick={() => router.push('/auth/login')}
                  className="w-full"
                >
                  Вернуться к входу
                </Button>
                <Button 
                  onClick={() => router.push('/auth/register')}
                  variant="outline"
                  className="w-full"
                >
                  Зарегистрироваться заново
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <p>Загружаем...</p>
          </CardContent>
        </Card>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}