'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { user, profile, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Личный кабинет</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button onClick={logout} variant="outline">
              Выйти
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Информация о пользователе</CardTitle>
              <CardDescription>Ваши данные в системе</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Имя:</strong> {profile?.full_name || 'Не указано'}</p>
                <p><strong>Роль:</strong> {profile?.role || 'user'}</p>
                <p><strong>Подписка:</strong> {profile?.subscription_type || 'free'}</p>
                <p><strong>Email подтвержден:</strong> {user?.email_confirmed_at ? 'Да' : 'Нет'}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Добро пожаловать в PetCare!</CardTitle>
              <CardDescription>Ваш органайзер для питомцев готов к использованию</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Здесь будет основной функционал приложения: управление питомцами, 
                дневник здоровья, расходы и напоминания.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}