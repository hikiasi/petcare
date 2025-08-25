'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSubscription } from '@/hooks/useSubscription';
import { CheckCircle, AlertCircle, ArrowLeft, Crown } from 'lucide-react';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleSuccessfulPayment, refetch, user } = useSubscription();
  
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processPayment = async () => {
      // Ждем загрузки пользователя
      if (!user) {
        return;
      }

      // Пробуем получить payment_id из разных источников
      let paymentId = searchParams.get('payment_id') || 
                     searchParams.get('paymentId') || 
                     searchParams.get('id');
      
      // Если payment_id не найден в URL, проверяем localStorage
      if (!paymentId && typeof window !== 'undefined') {
        paymentId = localStorage.getItem('pending_payment_id');
      }
      
      if (!paymentId) {
        setStatus('error');
        setError('Не найден идентификатор платежа');
        return;
      }

      try {
        await handleSuccessfulPayment(paymentId);
        await refetch(); // Обновляем статус подписки
        
        // Очищаем сохраненный payment_id после успешной обработки
        if (typeof window !== 'undefined') {
          localStorage.removeItem('pending_payment_id');
        }
        
        setStatus('success');
      } catch (error) {
        console.error('Payment processing error:', error);
        setStatus('error');
        setError(error instanceof Error ? error.message : 'Ошибка обработки платежа');
      }
    };

    // Запускаем только один раз при монтировании компонента и когда пользователь загружен
    if (status === 'processing' && user) {
      processPayment();
    }
  }, [user, searchParams]); // Добавляем user в зависимости

  if (status === 'processing') {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Обрабатываем ваш платеж</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Пожалуйста, подождите. Это займет несколько секунд.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card className="border-red-200">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-red-800 dark:text-red-200">
              Ошибка обработки платежа
            </CardTitle>
            <CardDescription className="text-red-600 dark:text-red-300">
              {error}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Если деньги были списаны, они будут возвращены в течение 3-5 рабочих дней.
              Обратитесь в поддержку, если проблема повторится.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard/subscription')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад к подпискам
              </Button>
              <Button onClick={() => router.push('/dashboard')}>
                На главную
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
        <CardHeader className="text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-green-800 dark:text-green-200">
            Платеж успешно обработан!
          </CardTitle>
          <CardDescription className="text-green-600 dark:text-green-300">
            Ваша PRO подписка активирована
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Crown className="h-5 w-5 text-green-500" />
              <span className="font-semibold">PRO план активен</span>
            </div>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>✅ Неограниченное количество питомцев</li>
              <li>✅ Полный дневник здоровья</li>
              <li>✅ Подробная аналитика расходов</li>
              <li>✅ Приоритетная поддержка</li>
            </ul>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>Чек об оплате отправлен на вашу электронную почту.</p>
            <p>Подписка будет автоматически продлеваться каждый месяц.</p>
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard/subscription')}
            >
              Управление подпиской
            </Button>
            <Button 
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => router.push('/dashboard')}
            >
              Начать пользоваться
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}