'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { SubscriptionManager, SUBSCRIPTION_PRICES, TRIAL_DAYS } from '@/lib/utils/subscription';

interface SubscriptionState {
  isPro: boolean;
  isTrialActive: boolean;
  subscription: any | null;
  limits: any;
  loading: boolean;
  error: string | null;
}

export function useSubscription() {
  const { user } = useAuth();
  const [state, setState] = useState<SubscriptionState>({
    isPro: false,
    isTrialActive: false,
    subscription: null,
    limits: SubscriptionManager.getSubscriptionLimits('free'),
    loading: true,
    error: null,
  });

  // Загрузка статуса подписки
  const loadSubscriptionStatus = async () => {
    if (!user) {
      setState(prev => ({
        ...prev,
        loading: false,
        isPro: false,
        isTrialActive: false,
        subscription: null,
        limits: SubscriptionManager.getSubscriptionLimits('free'),
      }));
      return;
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const status = await SubscriptionManager.checkSubscriptionStatus(user.id);
      const limits = await SubscriptionManager.checkUserLimits(user.id);

      setState(prev => ({
        ...prev,
        ...status,
        limits,
        loading: false,
      }));
    } catch (error) {
      console.error('Error loading subscription status:', error);
      setState(prev => ({
        ...prev,
        error: 'Ошибка загрузки статуса подписки',
        loading: false,
      }));
    }
  };

  // Начать пробный период
  const startTrial = async () => {
    if (!user) throw new Error('Пользователь не авторизован');

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // Проверяем, нет ли уже активной подписки
      const existingSubscription = await SubscriptionManager.getUserSubscription(user.id);
      if (existingSubscription) {
        throw new Error('У вас уже есть активная подписка');
      }

      // Создаем пробную подписку
      await SubscriptionManager.createTrialSubscription(user.id, TRIAL_DAYS);
      
      // Обновляем профиль пользователя
      await SubscriptionManager.updateUserProfile(user.id, 'pro');

      // Отправляем email уведомление о начале пробного периода (временно отключено)
      // try {
      //   const { SubscriptionEmailManager } = await import('@/lib/email/subscription-emails');
      //   await SubscriptionEmailManager.sendTrialStartedEmail(user.id);
      // } catch (emailError) {
      //   console.error('Error sending trial started email:', emailError);
      //   // Не блокируем процесс из-за ошибки email
      // }

      // Перезагружаем статус
      await loadSubscriptionStatus();

      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка активации пробного периода';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw error;
    }
  };

  // Создать платеж для PRO подписки
  const createProPayment = async (returnUrl: string, promoCode?: string) => {
    if (!user) throw new Error('Пользователь не авторизован');

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      let finalAmount: number = SUBSCRIPTION_PRICES.pro;
      let discountAmount = 0;
      
      // Если есть промокод, применяем скидку
      if (promoCode) {
        const { PromoCodeManager } = await import('@/lib/utils/promo-codes');
        const validation = await PromoCodeManager.validatePromoCode(promoCode);
        
        if (validation.isValid) {
          finalAmount = PromoCodeManager.calculateDiscountedPrice(
            SUBSCRIPTION_PRICES.pro,
            validation.discount,
            validation.discountType
          );
          discountAmount = SUBSCRIPTION_PRICES.pro - finalAmount;
        } else {
          throw new Error(validation.error || 'Промокод недействителен');
        }
      }

      // Lazy import YuKassa API
      const { yuKassaAPI } = await import('@/lib/payments/yukassa');
      
      const payment = await yuKassaAPI.createPayment({
        amount: finalAmount,
        description: promoCode 
          ? `Подписка PetCare PRO на 1 месяц (промокод: ${promoCode})`
          : 'Подписка PetCare PRO на 1 месяц',
        userId: user.id,
        planType: 'pro',
        returnUrl,
        metadata: {
          subscription_type: 'monthly',
          ...(promoCode && { promo_code: promoCode }),
          original_amount: SUBSCRIPTION_PRICES.pro.toString(),
          discount_amount: discountAmount.toString(),
        },
      });

      setState(prev => ({ ...prev, loading: false }));
      return payment;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка создания платежа';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw error;
    }
  };

  // Обработать успешный платеж
  const handleSuccessfulPayment = async (paymentId: string) => {
    if (!user) throw new Error('Пользователь не авторизован');

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // Lazy import YuKassa API
      const { yuKassaAPI } = await import('@/lib/payments/yukassa');
      
      // Получаем информацию о платеже
      const payment = await yuKassaAPI.getPayment(paymentId);
      
      if (payment.status !== 'succeeded') {
        throw new Error('Платеж не был успешно завершен');
      }

      // Активируем или создаем подписку
      const existingSubscription = await SubscriptionManager.getUserSubscription(user.id);
      
      if (existingSubscription && (existingSubscription as any).status === 'trial') {
        // Переводим триал в активную подписку
        await SubscriptionManager.activatePaidSubscription(user.id, paymentId);
      } else {
        // Создаем новую активную подписку
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(startDate.getMonth() + 1);

        await SubscriptionManager.createSubscription({
          userId: user.id,
          planType: 'pro',
          status: 'active',
          startDate,
          endDate,
          yuKassaSubscriptionId: paymentId,
        });
      }

      // Обновляем профиль пользователя
      await SubscriptionManager.updateUserProfile(user.id, 'pro');

      // Отправляем email уведомление об активации подписки (временно отключено)
      // try {
      //   const { SubscriptionEmailManager } = await import('@/lib/email/subscription-emails');
      //   await SubscriptionEmailManager.sendSubscriptionActivatedEmail(user.id, payment.amount.value);
      // } catch (emailError) {
      //   console.error('Error sending subscription activated email:', emailError);
      //   // Не блокируем процесс из-за ошибки email
      // }

      // Перезагружаем статус
      await loadSubscriptionStatus();

      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка обработки платежа';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw error;
    }
  };

  // Отменить подписку
  const cancelSubscription = async () => {
    if (!user || !state.subscription) {
      throw new Error('Нет активной подписки для отмены');
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      await SubscriptionManager.cancelSubscription(state.subscription.id);
      await SubscriptionManager.updateUserProfile(user.id, 'free');

      // Перезагружаем статус
      await loadSubscriptionStatus();

      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка отмены подписки';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw error;
    }
  };

  // Проверить лимиты
  const checkLimit = (limitType: keyof ReturnType<typeof SubscriptionManager.getSubscriptionLimits>) => {
    return state.limits[limitType];
  };

  // Получить оставшиеся дни триала
  const getTrialDaysLeft = () => {
    if (!state.isTrialActive || !state.subscription?.trial_end_date) {
      return 0;
    }

    const trialEnd = new Date(state.subscription.trial_end_date);
    const now = new Date();
    const diffTime = trialEnd.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
  };

  useEffect(() => {
    loadSubscriptionStatus();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    ...state,
    startTrial,
    createProPayment,
    handleSuccessfulPayment,
    cancelSubscription,
    checkLimit,
    getTrialDaysLeft,
    refetch: loadSubscriptionStatus,
  };
}