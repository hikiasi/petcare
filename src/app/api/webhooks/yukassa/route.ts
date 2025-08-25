import { NextRequest, NextResponse } from 'next/server';
import { yuKassaAPI } from '@/lib/payments/yukassa';
import { SubscriptionManager } from '@/lib/utils/subscription';
import { createClient } from '@supabase/supabase-js';

// Интерфейс для webhook уведомления от ЮKassa
interface YuKassaWebhookEvent {
  type: string;
  event: string;
  object: {
    id: string;
    status: string;
    amount: {
      value: string;
      currency: string;
    };
    metadata?: {
      user_id?: string;
      plan_type?: string;
      subscription_type?: string;
      promo_code?: string;
      original_amount?: string;
      discount_amount?: string;
    };
    created_at: string;
    paid: boolean;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Создаем серверный клиент Supabase с service role ключом
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    const body: YuKassaWebhookEvent = await request.json();
    
    console.log('YuKassa webhook received:', body);

    // Проверяем тип события
    if (body.type !== 'notification' || body.event !== 'payment.succeeded') {
      return NextResponse.json({ status: 'ignored' }, { status: 200 });
    }

    const payment = body.object;
    const userId = payment.metadata?.user_id;
    const planType = payment.metadata?.plan_type;

    if (!userId || !planType) {
      console.error('Missing user_id or plan_type in payment metadata');
      return NextResponse.json({ error: 'Invalid metadata' }, { status: 400 });
    }

    // Получаем полную информацию о платеже для верификации
    const fullPayment = await yuKassaAPI.getPayment(payment.id);
    
    if (fullPayment.status !== 'succeeded') {
      console.error('Payment not succeeded:', fullPayment.status);
      return NextResponse.json({ error: 'Payment not succeeded' }, { status: 400 });
    }

    // Записываем платеж в базу данных
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        amount: parseFloat(payment.amount.value),
        currency: payment.amount.currency,
        status: 'succeeded',
        yukassa_payment_id: payment.id,
        promo_code: payment.metadata?.promo_code || null,
        discount_amount: payment.metadata?.discount_amount ? parseFloat(payment.metadata.discount_amount) : 0,
        created_at: new Date().toISOString(),
      });

    if (paymentError) {
      console.error('Error saving payment:', paymentError);
      // Не возвращаем ошибку, чтобы не блокировать обработку подписки
    }

    // Применяем промокод если он был использован
    const promoCode = payment.metadata?.promo_code;
    if (promoCode) {
      try {
        const { PromoCodeManager } = await import('@/lib/utils/promo-codes');
        await PromoCodeManager.applyPromoCode(promoCode);
        console.log('Promo code applied:', promoCode);
      } catch (promoError) {
        console.error('Error applying promo code:', promoError);
        // Не блокируем обработку подписки из-за ошибки промокода
      }
    }

    // Обрабатываем подписку
    try {
      const existingSubscription = await SubscriptionManager.getUserSubscription(userId);
      
      if (existingSubscription && (existingSubscription as any).status === 'trial') {
        // Переводим триал в активную подписку
        await SubscriptionManager.activatePaidSubscription(userId, payment.id);
        console.log('Trial subscription activated for user:', userId);
      } else {
        // Создаем новую активную подписку
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(startDate.getMonth() + 1);

        await SubscriptionManager.createSubscription({
          userId,
          planType: planType as 'pro',
          status: 'active',
          startDate,
          endDate,
          yuKassaSubscriptionId: payment.id,
        });
        console.log('New subscription created for user:', userId);
      }

      // Обновляем профиль пользователя
      await SubscriptionManager.updateUserProfile(userId, planType as 'pro');
      console.log('User profile updated for user:', userId);

      // Отправляем email уведомление (опционально)
      try {
        const { SubscriptionEmailManager } = await import('@/lib/email/subscription-emails');
        await SubscriptionEmailManager.sendSubscriptionActivatedEmail(userId, parseFloat(payment.amount.value));
      } catch (emailError) {
        console.error('Error sending subscription activated email:', emailError);
        // Не блокируем процесс из-за ошибки email
      }

    } catch (subscriptionError) {
      console.error('Error processing subscription:', subscriptionError);
      
      // Записываем ошибку в базу данных для последующей обработки
      await (supabase as any)
        .from('payments')
        .update({
          status: 'failed',
          updated_at: new Date().toISOString(),
        })
        .eq('yukassa_payment_id', payment.id);

      return NextResponse.json(
        { error: 'Subscription processing failed' }, 
        { status: 500 }
      );
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

// Обработка других HTTP методов
export async function GET() {
  return NextResponse.json({ message: 'YuKassa webhook endpoint' }, { status: 200 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}