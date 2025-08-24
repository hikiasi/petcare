'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';

export default function VerifyPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'pending'>('loading');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const { checkVerification, resendVerification, isLoading, user } = useAuth();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Check if user is already verified
        const isVerified = await checkVerification();
        
        if (isVerified) {
          setStatus('success');
          setMessage('Email успешно подтвержден!');
          
          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        } else {
          setStatus('pending');
          setMessage('Пожалуйста, проверьте вашу почту и нажмите на ссылку подтверждения.');
        }
      } catch {
        setStatus('error');
        setMessage('Произошла ошибка при проверке email.');
      }
    };

    verifyEmail();
  }, [checkVerification, router]);

  const handleResendVerification = async () => {
    try {
      await resendVerification();
      setMessage('Письмо с подтверждением отправлено повторно. Проверьте вашу почту.');
    } catch {
      setMessage('Ошибка при отправке письма. Попробуйте позже.');
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-12 w-12 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-12 w-12 text-green-500" />;
      case 'error':
        return <XCircle className="h-12 w-12 text-red-500" />;
      case 'pending':
        return <Mail className="h-12 w-12 text-blue-500" />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (status) {
      case 'loading':
        return 'Проверка email...';
      case 'success':
        return 'Email подтвержден!';
      case 'error':
        return 'Ошибка подтверждения';
      case 'pending':
        return 'Подтвердите email';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {getIcon()}
            </div>
            <CardTitle className="text-2xl font-bold">
              {getTitle()}
            </CardTitle>
            <CardDescription>
              {status === 'success' && 'Перенаправляем вас в личный кабинет...'}
              {status === 'pending' && 'Мы отправили письмо с подтверждением на ваш email'}
              {status === 'error' && 'Не удалось подтвердить email адрес'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {message && (
              <Alert variant={status === 'error' ? 'destructive' : 'default'}>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            {status === 'pending' && user && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 text-center">
                  Письмо отправлено на: <strong>{user.email}</strong>
                </p>
                
                <Button
                  onClick={handleResendVerification}
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Отправить повторно
                </Button>
              </div>
            )}

            {status === 'success' && (
              <Button
                onClick={() => router.push('/dashboard')}
                className="w-full"
              >
                Перейти в личный кабинет
              </Button>
            )}

            {status === 'error' && (
              <div className="space-y-2">
                <Button
                  onClick={() => router.push('/auth/login')}
                  className="w-full"
                >
                  Вернуться к входу
                </Button>
                <Button
                  onClick={handleResendVerification}
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
                  Отправить письмо повторно
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}