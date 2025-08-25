'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSubscription } from '@/hooks/useSubscription';
import { CheckCircle, Crown, ArrowRight, Home } from 'lucide-react';

export default function SubscriptionSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleSuccessfulPayment, refetch } = useSubscription();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const processPayment = async () => {
      const paymentId = searchParams.get('payment_id');
      
      if (!paymentId) {
        setError('Не найден ID платежа');
        setIsProcessing(false);
        return;
      }

      try {
        await handleSuccessfulPayment(paymentId);
        await refetch();
        setSuccess(true);
      } catch (error) {
        console.error('Payment processing error:', error);
        setError(error instanceof Error ? error.message : 'Ошибка обработки платежа');
      } finally {
        setIsProcessing(false);
      }
    };

    processPayment();
  }, [searchParams, handleSuccessfulPayment, refetch]);

  if (isProcessing) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Обрабатываем ваш платеж...</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Пожалуйста, подождите. Это займет несколько секунд.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Ошибка обработки платежа</CardTitle>
            <CardDescription>
              Произошла ошибка при активации подписки
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-red-600">{error}</p>
            <div className="flex gap-2">
              <Button onClick={() => router.push('/dashboard/subscription')}>
                Вернуться к подпискам
              </Button>
              <Button variant="outline" onClick={() => router.push('/dashboard')}>
                На главную
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="p-6 max-w-2xl mx-auto space-y-6">
        {/* Успешная активация */}
        <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
              Подписка успешно активирована!
            </h1>
            <p className="text-green-600 dark:text-green-300 mb-6">
              Добро пожаловать в PetCare PRO! Все функции теперь доступны.
            </p>
            
            <div className="flex items-center justify-center gap-2 mb-6">
              <Crown className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800 dark:text-green-200">
                PRO статус активен
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Что теперь доступно */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-green-600" />
              Что теперь доступно
            </CardTitle>
            <CardDescription>
              Все PRO функции разблокированы для вашего аккаунта
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Неограниченное количество питомцев</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Полный дневник здоровья</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Умные напоминания в Telegram</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Подробная аналитика расходов</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">История прививок и документов</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Приоритетная поддержка</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Следующие шаги */}
        <Card>
          <CardHeader>
            <CardTitle>Что дальше?</CardTitle>
            <CardDescription>
              Рекомендуем начать с этих действий
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Button 
                className="justify-start h-auto p-4"
                variant="outline"
                onClick={() => router.push('/dashboard')}
              >
                <div className="flex items-center gap-3">
                  <Home className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Перейти в дашборд</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Управляйте своими питомцами
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </div>
              </Button>
              
              <Button 
                className="justify-start h-auto p-4"
                variant="outline"
                onClick={() => router.push('/dashboard/pets')}
              >
                <div className="flex items-center gap-3">
                  <Crown className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Добавить питомцев</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Теперь без ограничений
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}