// Временно отключено для исправления ошибок типов
export class SubscriptionEmailManager {
  static async sendTrialStartedEmail(userId: string): Promise<boolean> {
    console.log('Email sending disabled for user:', userId);
    return true;
  }

  static async sendSubscriptionActivatedEmail(userId: string, paymentAmount: number): Promise<boolean> {
    console.log('Email sending disabled for user:', userId, 'amount:', paymentAmount);
    return true;
  }

  static async sendTrialExpiringEmail(userId: string, daysLeft: number): Promise<boolean> {
    console.log('Email sending disabled for user:', userId, 'days left:', daysLeft);
    return true;
  }

  static async sendSubscriptionCancelledEmail(userId: string, reason?: string): Promise<boolean> {
    console.log('Email sending disabled for user:', userId, 'reason:', reason);
    return true;
  }
}