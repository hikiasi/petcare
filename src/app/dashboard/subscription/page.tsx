'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/hooks/useAuth';
import { SUBSCRIPTION_PRICES } from '@/lib/utils/subscription';
import { PromoCodeInput } from '@/components/subscription/PromoCodeInput';
import { CancelSubscriptionDialog } from '@/components/subscription/CancelSubscriptionDialog';
import { PromoCodeValidation } from '@/lib/utils/promo-codes';
import { 
  Check, 
  Crown, 
  Star, 
  CreditCard, 
  Shield, 
  Zap,
  ArrowLeft,
  Gift
} from 'lucide-react';

export default function SubscriptionPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { 
    isPro, 
    isTrialActive, 
    subscription, 
    loading, 
    startTrial, 
    createProPayment, 
    cancelSubscription,
    getTrialDaysLeft 
  } = useSubscription();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<(PromoCodeValidation & { code: string }) | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const trialDaysLeft = getTrialDaysLeft();

  const handleStartTrial = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      await startTrial();
      router.push('/dashboard');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка активации пробного периода');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpgradeToPro = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      
      const returnUrl = `${window.location.origin}/dashboard/subscription/success`;
      const payment = await createProPayment(returnUrl, appliedPromo?.code);
      
      // Перенаправляем на страницу оплаты ЮKassa
      window.location.href = payment.confirmation.confirmation_url;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка создания платежа');
      setIsProcessing(false);
    }
  };

  const handleCancelSubscription = async (reason?: string) => {
    try {
      setIsProcessing(true);
      setError(null);
      
      await cancelSubscription();
      
      // Отправляем email уведомление об отмене подписки
      if (reason) {
        try {
          const { SubscriptionEmailManager } = await import('@/lib/email/subscription-emails');
          await SubscriptionEmailManager.sendSubscriptionCancelledEmail(user?.id || '', reason);
        } catch (emailError) {
          console.error('Error sending cancellation email:', emailError);
          // Не блокируем процесс из-за ошибки email
        }
      }
      setShowCancelDialog(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка отмены подписки');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Заголовок */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => router.push('/dashboard')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Управление подпиской
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Выберите план, который подходит именно вам
          </p>
        </div>
      </div>

      {/* Текущий статус */}
      {isPro && (
        <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Crown className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-200">
                    {isTrialActive ? 'Пробный период PRO' : 'PRO подписка активна'}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    {isTrialActive 
                      ? `Осталось ${trialDaysLeft} дней бесплатно`
                      : 'Все функции разблокированы'
                    }
                  </p>
                </div>
              </div>
              
              {!isTrialActive && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowCancelDialog(true)}
                  disabled={isProcessing}
                >
                  Отменить подписку
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ошибка */}
      {error && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
          <CardContent className="p-4">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Планы подписки */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Бесплатный план */}
        <Card className={`${!isPro ? 'border-blue-200 bg-blue-50 dark:bg-blue-900/20' : ''}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Бесплатный
              </CardTitle>
              {!isPro && <Badge variant="secondary">Текущий план</Badge>}
            </div>
            <CardDescription>
              Базовые функции для начала работы
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold">0₽</div>
            
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                До 2 питомцев
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                5 записей в дневнике/месяц
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Базовые напоминания
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Простая аналитика расходов
              </li>
            </ul>

            {isPro && (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowCancelDialog(true)}
                disabled={isProcessing}
              >
                Перейти на бесплатный план
              </Button>
            )}
          </CardContent>
        </Card>

        {/* PRO план */}
        <Card className={`relative ${isPro ? 'border-green-200 bg-green-50 dark:bg-green-900/20' : 'border-2 border-green-500'}`}>
          {!isPro && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-green-500 text-white px-3 py-1">
                <Star className="h-3 w-3 mr-1" />
                Рекомендуем
              </Badge>
            </div>
          )}
          
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-green-600" />
                PRO
              </CardTitle>
              {isPro && <Badge className="bg-green-500 text-white">Активен</Badge>}
            </div>
            <CardDescription>
              Все возможности для профессионального ухода
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{SUBSCRIPTION_PRICES.pro}₽</span>
              <span className="text-gray-600 dark:text-gray-400">/месяц</span>
            </div>
            
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <strong>Неограниченно питомцев</strong>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <strong>Полный дневник здоровья</strong>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <strong>Умные напоминания в Telegram</strong>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <strong>Подробная аналитика расходов</strong>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <strong>Приоритетная поддержка</strong>
              </li>
            </ul>

            {!isPro && (
              <div className="space-y-3">
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={handleStartTrial}
                  disabled={isProcessing}
                >
                  <Gift className="h-4 w-4 mr-2" />
                  {isProcessing ? 'Активация...' : 'Попробовать 14 дней бесплатно'}
                </Button>
                
                <div className="text-center">
                  <p className="text-xs text-gray-500">или</p>
                </div>
                
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={handleUpgradeToPro}
                  disabled={isProcessing}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Оплатить сразу
                </Button>
              </div>
            )}

            {isTrialActive && subscription?.status !== 'canceled' && (
              <Button 
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                onClick={handleUpgradeToPro}
                disabled={isProcessing}
              >
                <Zap className="h-4 w-4 mr-2" />
                {isProcessing ? 'Обработка...' : 'Продлить после триала'}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Промокод */}
      {!isPro && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Есть промокод?</CardTitle>
            <CardDescription>
              Введите промокод для получения скидки на первый месяц
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PromoCodeInput
              onPromoApplied={setAppliedPromo}
              onPromoRemoved={() => setAppliedPromo(null)}
              disabled={isProcessing}
            />
          </CardContent>
        </Card>
      )}

      {/* Гарантии */}
      <Card className="bg-gray-50 dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Безопасные платежи</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Все платежи защищены SSL шифрованием
              </p>
            </div>
            <div>
              <Zap className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Мгновенная активация</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                PRO функции активируются сразу после оплаты
              </p>
            </div>
            <div>
              <Gift className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Отмена в любой момент</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Без скрытых платежей и штрафов
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Диалог отмены подписки */}
      <CancelSubscriptionDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={handleCancelSubscription}
        subscription={subscription}
        isProcessing={isProcessing}
      />
    </div>
  );
}