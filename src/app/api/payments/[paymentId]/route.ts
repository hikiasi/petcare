import { NextRequest, NextResponse } from 'next/server';
import { yuKassaAPI } from '@/lib/payments/yukassa';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ paymentId: string }> }
) {
  try {
    const { paymentId } = await params;

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    // Получаем информацию о платеже через YuKassa
    const payment = await yuKassaAPI.getPayment(paymentId);

    return NextResponse.json(payment);
  } catch (error) {
    console.error('Payment fetch error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}