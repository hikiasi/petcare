import { supabase } from '@/lib/supabase/client';

interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export class SubscriptionEmailManager {
  /**
   * Отправка email уведомления о начале пробного периода
   */
  static async sendTrialStartedEmail(userId: string): Promise<boolean> {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('email, full_name')
        .eq('id', userId)
        .single();

      if (!profile?.email) {
        console.error('User email not found');
        return false;
      }

      const template = this.getTrialStartedTemplate(profile.full_name || 'Пользователь');
      
      // Используем Supabase Edge Function для отправки email
      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          to: profile.email,
          subject: template.subject,
          html: template.html,
          text: template.text,
        },
      });

      if (error) {
        console.error('Error sending trial started email:', error);
        return false;
      }

      console.log('Trial started email sent to:', profile.email);
      return true;
    } catch (error) {
      console.error('Error in sendTrialStartedEmail:', error);
      return false;
    }
  }

  /**
   * Отправка email уведомления об активации платной подписки
   */
  static async sendSubscriptionActivatedEmail(userId: string, paymentAmount: number): Promise<boolean> {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('email, full_name')
        .eq('id', userId)
        .single();

      if (!profile?.email) {
        console.error('User email not found');
        return false;
      }

      const template = this.getSubscriptionActivatedTemplate(
        profile.full_name || 'Пользователь',
        paymentAmount
      );
      
      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          to: profile.email,
          subject: template.subject,
          html: template.html,
          text: template.text,
        },
      });

      if (error) {
        console.error('Error sending subscription activated email:', error);
        return false;
      }

      console.log('Subscription activated email sent to:', profile.email);
      return true;
    } catch (error) {
      console.error('Error in sendSubscriptionActivatedEmail:', error);
      return false;
    }
  }

  /**
   * Отправка email уведомления об истечении пробного периода
   */
  static async sendTrialExpiringEmail(userId: string, daysLeft: number): Promise<boolean> {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('email, full_name')
        .eq('id', userId)
        .single();

      if (!profile?.email) {
        console.error('User email not found');
        return false;
      }

      const template = this.getTrialExpiringTemplate(
        profile.full_name || 'Пользователь',
        daysLeft
      );
      
      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          to: profile.email,
          subject: template.subject,
          html: template.html,
          text: template.text,
        },
      });

      if (error) {
        console.error('Error sending trial expiring email:', error);
        return false;
      }

      console.log('Trial expiring email sent to:', profile.email);
      return true;
    } catch (error) {
      console.error('Error in sendTrialExpiringEmail:', error);
      return false;
    }
  }

  /**
   * Отправка email уведомления об отмене подписки
   */
  static async sendSubscriptionCancelledEmail(userId: string, reason?: string): Promise<boolean> {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('email, full_name')
        .eq('id', userId)
        .single();

      if (!profile?.email) {
        console.error('User email not found');
        return false;
      }

      const template = this.getSubscriptionCancelledTemplate(
        profile.full_name || 'Пользователь',
        reason
      );
      
      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          to: profile.email,
          subject: template.subject,
          html: template.html,
          text: template.text,
        },
      });

      if (error) {
        console.error('Error sending subscription cancelled email:', error);
        return false;
      }

      console.log('Subscription cancelled email sent to:', profile.email);
      return true;
    } catch (error) {
      console.error('Error in sendSubscriptionCancelledEmail:', error);
      return false;
    }
  }

  /**
   * Шаблон email для начала пробного периода
   */
  private static getTrialStartedTemplate(userName: string): EmailTemplate {
    return {
      subject: '🎉 Добро пожаловать в PetCare PRO!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #22C55E, #16A34A); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">🐾 PetCare PRO</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Профессиональная забота о питомцах</p>
          </div>
          
          <div style="padding: 30px; background: #ffffff;">
            <h2 style="color: #1F2937; margin-bottom: 20px;">Привет, ${userName}!</h2>
            
            <p style="color: #4B5563; line-height: 1.6; margin-bottom: 20px;">
              Поздравляем! Вы успешно активировали <strong>14-дневный бесплатный пробный период</strong> PetCare PRO.
            </p>
            
            <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1F2937; margin-top: 0;">Что теперь доступно:</h3>
              <ul style="color: #4B5563; line-height: 1.8;">
                <li>✅ Неограниченное количество питомцев</li>
                <li>✅ Полный дневник здоровья с фотографиями</li>
                <li>✅ Умные напоминания в удобное время</li>
                <li>✅ Подробная аналитика расходов</li>
                <li>✅ Приоритетная поддержка</li>
              </ul>
            </div>
            
            <p style="color: #4B5563; line-height: 1.6; margin-bottom: 30px;">
              Пробный период действует до <strong>${new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU')}</strong>. 
              После этого вы можете продолжить пользоваться PRO за 299₽/месяц или перейти на бесплатный план.
            </p>
            
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
                 style="background: #22C55E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                Начать пользоваться
              </a>
            </div>
          </div>
          
          <div style="background: #F9FAFB; padding: 20px; text-align: center; color: #6B7280; font-size: 14px;">
            <p>С уважением, команда PetCare</p>
            <p>Если у вас есть вопросы, напишите нам: support@petcare.ru</p>
          </div>
        </div>
      `,
      text: `
        Привет, ${userName}!
        
        Поздравляем! Вы успешно активировали 14-дневный бесплатный пробный период PetCare PRO.
        
        Что теперь доступно:
        - Неограниченное количество питомцев
        - Полный дневник здоровья с фотографиями
        - Умные напоминания в удобное время
        - Подробная аналитика расходов
        - Приоритетная поддержка
        
        Пробный период действует до ${new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU')}.
        
        Начать пользоваться: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard
        
        С уважением, команда PetCare
      `
    };
  }

  /**
   * Шаблон email для активации платной подписки
   */
  private static getSubscriptionActivatedTemplate(userName: string, amount: number): EmailTemplate {
    return {
      subject: '✅ Подписка PetCare PRO активирована',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #22C55E, #16A34A); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">👑 PetCare PRO</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Подписка активирована</p>
          </div>
          
          <div style="padding: 30px; background: #ffffff;">
            <h2 style="color: #1F2937; margin-bottom: 20px;">Спасибо за покупку, ${userName}!</h2>
            
            <p style="color: #4B5563; line-height: 1.6; margin-bottom: 20px;">
              Ваша подписка PetCare PRO успешно активирована. Платеж на сумму <strong>${amount}₽</strong> обработан.
            </p>
            
            <div style="background: #EFF6FF; border-left: 4px solid #3B82F6; padding: 20px; margin: 20px 0;">
              <h3 style="color: #1E40AF; margin-top: 0;">Детали подписки:</h3>
              <p style="color: #1E3A8A; margin: 5px 0;">💳 Сумма: ${amount}₽</p>
              <p style="color: #1E3A8A; margin: 5px 0;">📅 Следующий платеж: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU')}</p>
              <p style="color: #1E3A8A; margin: 5px 0;">🔄 Автопродление: Включено</p>
            </div>
            
            <p style="color: #4B5563; line-height: 1.6; margin-bottom: 30px;">
              Теперь у вас есть полный доступ ко всем PRO функциям без ограничений!
            </p>
            
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
                 style="background: #22C55E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                Перейти в дашборд
              </a>
            </div>
          </div>
          
          <div style="background: #F9FAFB; padding: 20px; text-align: center; color: #6B7280; font-size: 14px;">
            <p>Управлять подпиской: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription</p>
            <p>Поддержка: support@petcare.ru</p>
          </div>
        </div>
      `,
      text: `
        Спасибо за покупку, ${userName}!
        
        Ваша подписка PetCare PRO успешно активирована. Платеж на сумму ${amount}₽ обработан.
        
        Детали подписки:
        - Сумма: ${amount}₽
        - Следующий платеж: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU')}
        - Автопродление: Включено
        
        Перейти в дашборд: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard
        Управлять подпиской: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription
      `
    };
  }

  /**
   * Шаблон email для истечения пробного периода
   */
  private static getTrialExpiringTemplate(userName: string, daysLeft: number): EmailTemplate {
    const isLastDay = daysLeft <= 1;
    
    return {
      subject: isLastDay ? '⏰ Пробный период истекает сегодня!' : `⏰ Пробный период истекает через ${daysLeft} дней`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #F59E0B, #D97706); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">⏰ PetCare PRO</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Пробный период истекает</p>
          </div>
          
          <div style="padding: 30px; background: #ffffff;">
            <h2 style="color: #1F2937; margin-bottom: 20px;">Привет, ${userName}!</h2>
            
            <p style="color: #4B5563; line-height: 1.6; margin-bottom: 20px;">
              ${isLastDay 
                ? 'Ваш 14-дневный пробный период PetCare PRO <strong>истекает сегодня</strong>.'
                : `Ваш 14-дневный пробный период PetCare PRO истекает через <strong>${daysLeft} дней</strong>.`
              }
            </p>
            
            <div style="background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 20px; margin: 20px 0;">
              <h3 style="color: #92400E; margin-top: 0;">Что произойдет дальше:</h3>
              <ul style="color: #92400E; line-height: 1.8;">
                <li>Без продления аккаунт перейдет на бесплатный план</li>
                <li>Ограничение: максимум 2 питомца</li>
                <li>Ограничение: 5 записей в дневнике/месяц</li>
                <li>Базовые напоминания</li>
              </ul>
            </div>
            
            <p style="color: #4B5563; line-height: 1.6; margin-bottom: 30px;">
              Продлите подписку всего за <strong>299₽/месяц</strong>, чтобы сохранить все PRO функции!
            </p>
            
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription" 
                 style="background: #22C55E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin-right: 10px;">
                Продлить подписку
              </a>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
                 style="background: transparent; color: #6B7280; padding: 12px 24px; text-decoration: none; border: 1px solid #D1D5DB; border-radius: 6px;">
                Перейти в дашборд
              </a>
            </div>
          </div>
          
          <div style="background: #F9FAFB; padding: 20px; text-align: center; color: #6B7280; font-size: 14px;">
            <p>Остались вопросы? Напишите нам: support@petcare.ru</p>
          </div>
        </div>
      `,
      text: `
        Привет, ${userName}!
        
        ${isLastDay 
          ? 'Ваш 14-дневный пробный период PetCare PRO истекает сегодня.'
          : `Ваш 14-дневный пробный период PetCare PRO истекает через ${daysLeft} дней.`
        }
        
        Что произойдет дальше:
        - Без продления аккаунт перейдет на бесплатный план
        - Ограничение: максимум 2 питомца
        - Ограничение: 5 записей в дневнике/месяц
        - Базовые напоминания
        
        Продлите подписку всего за 299₽/месяц, чтобы сохранить все PRO функции!
        
        Продлить подписку: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription
      `
    };
  }

  /**
   * Шаблон email для отмены подписки
   */
  private static getSubscriptionCancelledTemplate(userName: string, reason?: string): EmailTemplate {
    return {
      subject: '😢 Подписка PetCare PRO отменена',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #6B7280; padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">😢 PetCare</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Подписка отменена</p>
          </div>
          
          <div style="padding: 30px; background: #ffffff;">
            <h2 style="color: #1F2937; margin-bottom: 20px;">До свидания, ${userName}</h2>
            
            <p style="color: #4B5563; line-height: 1.6; margin-bottom: 20px;">
              Мы сожалеем, что вы решили отменить подписку PetCare PRO. Ваша подписка была успешно отменена.
            </p>
            
            ${reason ? `
            <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1F2937; margin-top: 0;">Причина отмены:</h3>
              <p style="color: #4B5563; margin: 0;">${reason}</p>
            </div>
            ` : ''}
            
            <div style="background: #FEF2F2; border-left: 4px solid #EF4444; padding: 20px; margin: 20px 0;">
              <h3 style="color: #DC2626; margin-top: 0;">Что изменится:</h3>
              <ul style="color: #DC2626; line-height: 1.8;">
                <li>PRO функции будут доступны до конца текущего периода</li>
                <li>Затем аккаунт перейдет на бесплатный план</li>
                <li>Ограничение: максимум 2 питомца</li>
                <li>Ограничение: 5 записей в дневнике/месяц</li>
              </ul>
            </div>
            
            <p style="color: #4B5563; line-height: 1.6; margin-bottom: 30px;">
              Вы всегда можете вернуться к PRO подписке в любое время. Мы будем рады видеть вас снова!
            </p>
            
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
                 style="background: #6B7280; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                Продолжить с бесплатным планом
              </a>
            </div>
          </div>
          
          <div style="background: #F9FAFB; padding: 20px; text-align: center; color: #6B7280; font-size: 14px;">
            <p>Спасибо, что пользовались PetCare PRO!</p>
            <p>Поддержка: support@petcare.ru</p>
          </div>
        </div>
      `,
      text: `
        До свидания, ${userName}
        
        Мы сожалеем, что вы решили отменить подписку PetCare PRO. Ваша подписка была успешно отменена.
        
        ${reason ? `Причина отмены: ${reason}\n` : ''}
        
        Что изменится:
        - PRO функции будут доступны до конца текущего периода
        - Затем аккаунт перейдет на бесплатный план
        - Ограничение: максимум 2 питомца
        - Ограничение: 5 записей в дневнике/месяц
        
        Вы всегда можете вернуться к PRO подписке в любое время.
        
        Продолжить с бесплатным планом: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard
      `
    };
  }
}