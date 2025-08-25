import { supabase } from '@/lib/supabase/client';

export type SubscriptionPlan = 'free' | 'pro';
export type SubscriptionStatus = 'active' | 'canceled' | 'expired' | 'trial';

interface CreateSubscriptionParams {
  userId: string;
  planType: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: Date;
  endDate?: Date;
  trialEndDate?: Date;
  yuKassaSubscriptionId?: string;
}

interface UpdateSubscriptionParams {
  status?: SubscriptionStatus;
  endDate?: Date;
  yuKassaSubscriptionId?: string;
}

export class SubscriptionManager {
  // Создание новой подписки
  static async createSubscription(params: CreateSubscriptionParams) {
    const { data, error } = await (supabase as any)
      .from('subscriptions')
      .insert({
        user_id: params.userId,
        plan_type: params.planType,
        status: params.status,
        start_date: params.startDate.toISOString(),
        end_date: params.endDate?.toISOString(),
        trial_end_date: params.trialEndDate?.toISOString(),
        yukassa_subscription_id: params.yuKassaSubscriptionId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Получение активной подписки пользователя
  static async getUserSubscription(userId: string) {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
    return data;
  }

  // Обновление подписки
  static async updateSubscription(subscriptionId: string, params: UpdateSubscriptionParams) {
    const updateData: any = {};
    
    if (params.status) updateData.status = params.status;
    if (params.endDate) updateData.end_date = params.endDate.toISOString();
    if (params.yuKassaSubscriptionId) updateData.yukassa_subscription_id = params.yuKassaSubscriptionId;

    const { data, error } = await (supabase as any)
      .from('subscriptions')
      .update(updateData)
      .eq('id', subscriptionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }



  // Проверка статуса подписки
  static async checkSubscriptionStatus(userId: string): Promise<{
    isPro: boolean;
    isTrialActive: boolean;
    subscription: any | null;
  }> {
    const subscription = await this.getUserSubscription(userId);
    
    if (!subscription) {
      return {
        isPro: false,
        isTrialActive: false,
        subscription: null,
      };
    }

    const now = new Date();
    const endDate = (subscription as any).end_date ? new Date((subscription as any).end_date) : null;
    const trialEndDate = (subscription as any).trial_end_date ? new Date((subscription as any).trial_end_date) : null;

    // Проверяем активность триала
    const isTrialActive = (subscription as any).status === 'trial' && 
                         trialEndDate && 
                         trialEndDate > now;

    // Проверяем активность PRO подписки
    const isPro = (subscription as any).plan_type === 'pro' && 
                  ((subscription as any).status === 'active' || isTrialActive) &&
                  (!endDate || endDate > now);

    return {
      isPro: !!isPro,
      isTrialActive: !!isTrialActive,
      subscription,
    };
  }

  // Создание пробного периода
  static async createTrialSubscription(userId: string, trialDays: number = 14) {
    const startDate = new Date();
    const trialEndDate = new Date();
    trialEndDate.setDate(startDate.getDate() + trialDays);

    return this.createSubscription({
      userId,
      planType: 'pro',
      status: 'trial',
      startDate,
      trialEndDate,
    });
  }



  // Обновление профиля пользователя с типом подписки
  static async updateUserProfile(userId: string, subscriptionType: SubscriptionPlan) {
    const { error } = await (supabase as any)
      .from('profiles')
      .update({
        subscription_type: subscriptionType,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) throw error;
  }

  // Получение лимитов для плана
  static getSubscriptionLimits(planType: SubscriptionPlan): {
    maxPets: number;
    maxHealthRecordsPerMonth: number;
    hasAdvancedAnalytics: boolean;
    hasTelegramNotifications: boolean;
    hasPhotoUpload: boolean;
    hasPrioritySupport: boolean;
  } {
    switch (planType) {
      case 'free':
        return {
          maxPets: 2,
          maxHealthRecordsPerMonth: 5,
          hasAdvancedAnalytics: false,
          hasTelegramNotifications: false,
          hasPhotoUpload: true,
          hasPrioritySupport: false,
        };
      case 'pro':
        return {
          maxPets: Infinity,
          maxHealthRecordsPerMonth: Infinity,
          hasAdvancedAnalytics: true,
          hasTelegramNotifications: true,
          hasPhotoUpload: true,
          hasPrioritySupport: true,
        };
      default:
        return this.getSubscriptionLimits('free');
    }
  }

  // Проверка лимитов
  static async checkUserLimits(userId: string) {
    const { subscription } = await this.checkSubscriptionStatus(userId);
    const planType = subscription?.plan_type || 'free';
    return this.getSubscriptionLimits(planType);
  }

  // Отмена подписки
  static async cancelSubscription(subscriptionId: string) {
    const { error } = await (supabase as any)
      .from('subscriptions')
      .update({
        status: 'canceled',
        updated_at: new Date().toISOString(),
      })
      .eq('id', subscriptionId);

    if (error) throw error;
  }

  // Активация платной подписки (переход с триала)
  static async activatePaidSubscription(userId: string, paymentId: string) {
    const { error } = await (supabase as any)
      .from('subscriptions')
      .update({
        status: 'active',
        yukassa_subscription_id: paymentId,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('status', 'trial');

    if (error) throw error;
  }
}

// Константы для подписок
export const SUBSCRIPTION_PRICES = {
  pro: 299, // рублей в месяц
} as const;

export const TRIAL_DAYS = 14;