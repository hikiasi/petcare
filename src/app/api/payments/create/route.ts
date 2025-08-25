import { NextRequest, NextResponse } from 'next/server';
import { yuKassaAPI } from '@/lib/payments/yukassa';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    // Создаем серверный клиент Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = await request.json();
    const { amount, description, userId, planType, returnUrl, metadata } = body;

    // Валидация входных данных
    if (!amount || !description || !userId || !planType || !returnUrl) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Проверяем, что пользователь существует
    const { data: user, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Создаем платеж через YuKassa
    const payment = await yuKassaAPI.createPayment({
      amount,
      description,
      userId,
      planType,
      returnUrl,
      metadata,
    });

    // Сохраняем информацию о платеже в базе данных
    if (payment.id) {
      const { error: dbError } = await supabase
        .from('payments')
        .insert({
          user_id: userId,
          amount: amount,
          currency: 'RUB',
          status: 'pending',
          yukassa_payment_id: payment.id,
          promo_code: metadata?.promo_code || null,
          discount_amount: parseFloat(metadata?.discount_amount || '0'),
        });

      if (dbError) {
        console.error('Failed to save payment to database:', dbError);
        // Не блокируем создание платежа из-за этой ошибки
      }
    }

    // Добавляем payment_id к ответу для клиента
    const responsePayment = {
      ...payment,
      // Модифицируем confirmation_url для добавления payment_id
      confirmation: payment.confirmation ? {
        ...payment.confirmation,
        confirmation_url: payment.confirmation.confirmation_url
      } : undefined
    };

    return NextResponse.json(responsePayment);
  } catch (error) {
    console.error('Payment creation error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}