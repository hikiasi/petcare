'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { supabase } from '@/lib/supabase/client';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });

      if (error) throw error;

      setMessage('Письмо для сброса пароля отправлено на вашу почту');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Произошла ошибка при отправке письма');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Сброс пароля</CardTitle>
            <CardDescription>
              Введите ваш email для получения ссылки сброса пароля
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {message && (
                <Alert>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Отправляем...' : 'Отправить ссылку'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/auth/login"
                className="text-sm text-green-600 hover:text-green-500"
              >
                Вернуться к входу
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}