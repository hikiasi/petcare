import { v4 as uuidv4 } from 'uuid';

interface YuKassaPaymentRequest {
  amount: {
    value: string;
    currency: string;
  };
  confirmation: {
    type: 'redirect';
    return_url: string;
  };
  capture: boolean;
  description: string;
  metadata?: Record<string, string>;
}

interface YuKassaPaymentResponse {
  id: string;
  status: string;
  amount: {
    value: string;
    currency: string;
  };
  confirmation: {
    type: string;
    confirmation_url: string;
  };
  created_at: string;
  description: string;
  metadata?: Record<string, string>;
  paid: boolean;
}

class YuKassaAPI {
  private shopId: string;
  private secretKey: string;
  private baseUrl = 'https://api.yookassa.ru/v3';

  constructor() {
    this.shopId = process.env.YUKASSA_SHOP_ID || '';
    this.secretKey = process.env.YUKASSA_SECRET_KEY || '';
    
    // В production режиме требуем обязательного наличия ключей
    if (process.env.NODE_ENV === 'production' && (!this.shopId || !this.secretKey)) {
      throw new Error('YuKassa credentials are not configured');
    }
  }

  private checkCredentials() {
    if (!this.shopId || !this.secretKey) {
      throw new Error('YuKassa credentials are not configured. Please set YUKASSA_SHOP_ID and YUKASSA_SECRET_KEY environment variables.');
    }
  }

  private getAuthHeader(): string {
    const credentials = Buffer.from(`${this.shopId}:${this.secretKey}`).toString('base64');
    return `Basic ${credentials}`;
  }

  async createPayment(params: {
    amount: number;
    description: string;
    userId: string;
    planType: 'pro';
    returnUrl: string;
    metadata?: Record<string, string>;
  }): Promise<YuKassaPaymentResponse> {
    this.checkCredentials();
    const idempotenceKey = uuidv4();
    
    const paymentData: YuKassaPaymentRequest = {
      amount: {
        value: params.amount.toFixed(2),
        currency: 'RUB',
      },
      confirmation: {
        type: 'redirect',
        return_url: params.returnUrl,
      },
      capture: true,
      description: params.description,
      metadata: {
        user_id: params.userId,
        plan_type: params.planType,
        ...params.metadata,
      },
    };

    const response = await fetch(`${this.baseUrl}/payments`, {
      method: 'POST',
      headers: {
        'Authorization': this.getAuthHeader(),
        'Content-Type': 'application/json',
        'Idempotence-Key': idempotenceKey,
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`YuKassa API error: ${response.status} ${error}`);
    }

    return response.json();
  }

  async getPayment(paymentId: string): Promise<YuKassaPaymentResponse> {
    this.checkCredentials();
    const response = await fetch(`${this.baseUrl}/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': this.getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`YuKassa API error: ${response.status} ${error}`);
    }

    return response.json();
  }

  async capturePayment(paymentId: string, amount?: number): Promise<YuKassaPaymentResponse> {
    this.checkCredentials();
    const idempotenceKey = uuidv4();
    
    const captureData = amount ? {
      amount: {
        value: amount.toFixed(2),
        currency: 'RUB',
      },
    } : {};

    const response = await fetch(`${this.baseUrl}/payments/${paymentId}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': this.getAuthHeader(),
        'Content-Type': 'application/json',
        'Idempotence-Key': idempotenceKey,
      },
      body: JSON.stringify(captureData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`YuKassa API error: ${response.status} ${error}`);
    }

    return response.json();
  }

  async cancelPayment(paymentId: string): Promise<YuKassaPaymentResponse> {
    this.checkCredentials();
    const idempotenceKey = uuidv4();

    const response = await fetch(`${this.baseUrl}/payments/${paymentId}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': this.getAuthHeader(),
        'Content-Type': 'application/json',
        'Idempotence-Key': idempotenceKey,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`YuKassa API error: ${response.status} ${error}`);
    }

    return response.json();
  }
}

export const yuKassaAPI = new YuKassaAPI();
export type { YuKassaPaymentResponse };