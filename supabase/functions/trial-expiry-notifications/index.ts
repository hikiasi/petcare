import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  try {
    console.log('Running trial expiry notifications check...')

    // Находим пользователей с истекающими пробными периодами
    const threeDaysFromNow = new Date()
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3)
    
    const oneDayFromNow = new Date()
    oneDayFromNow.setDate(oneDayFromNow.getDate() + 1)

    // Пользователи с пробным периодом, истекающим через 3 дня
    const { data: expiring3Days } = await supabase
      .from('subscriptions')
      .select(`
        user_id,
        trial_end_date,
        profiles!inner(email, full_name)
      `)
      .eq('status', 'trial')
      .gte('trial_end_date', threeDaysFromNow.toISOString().split('T')[0])
      .lt('trial_end_date', new Date(threeDaysFromNow.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0])

    // Пользователи с пробным периодом, истекающим завтра
    const { data: expiring1Day } = await supabase
      .from('subscriptions')
      .select(`
        user_id,
        trial_end_date,
        profiles!inner(email, full_name)
      `)
      .eq('status', 'trial')
      .gte('trial_end_date', oneDayFromNow.toISOString().split('T')[0])
      .lt('trial_end_date', new Date(oneDayFromNow.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0])

    console.log(`Found ${expiring3Days?.length || 0} users with trial expiring in 3 days`)
    console.log(`Found ${expiring1Day?.length || 0} users with trial expiring in 1 day`)

    // Отправляем уведомления для пользователей с истечением через 3 дня
    if (expiring3Days && expiring3Days.length > 0) {
      for (const user of expiring3Days) {
        try {
          await supabase.functions.invoke('send-email', {
            body: {
              to: user.profiles.email,
              subject: '⏰ Пробный период истекает через 3 дня',
              html: getTrialExpiringEmailTemplate(user.profiles.full_name || 'Пользователь', 3),
              text: getTrialExpiringEmailText(user.profiles.full_name || 'Пользователь', 3),
            },
          })
          
          console.log(`Sent 3-day expiry notification to ${user.profiles.email}`)
        } catch (error) {
          console.error(`Error sending email to ${user.profiles.email}:`, error)
        }
      }
    }

    // Отправляем уведомления для пользователей с истечением завтра
    if (expiring1Day && expiring1Day.length > 0) {
      for (const user of expiring1Day) {
        try {
          await supabase.functions.invoke('send-email', {
            body: {
              to: user.profiles.email,
              subject: '⏰ Пробный период истекает завтра!',
              html: getTrialExpiringEmailTemplate(user.profiles.full_name || 'Пользователь', 1),
              text: getTrialExpiringEmailText(user.profiles.full_name || 'Пользователь', 1),
            },
          })
          
          console.log(`Sent 1-day expiry notification to ${user.profiles.email}`)
        } catch (error) {
          console.error(`Error sending email to ${user.profiles.email}:`, error)
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        processed: {
          expiring3Days: expiring3Days?.length || 0,
          expiring1Day: expiring1Day?.length || 0
        }
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in trial-expiry-notifications:', error)
    
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    )
  }
})

function getTrialExpiringEmailTemplate(userName: string, daysLeft: number): string {
  const isLastDay = daysLeft <= 1
  
  return `
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
          <a href="${Deno.env.get('NEXT_PUBLIC_APP_URL')}/dashboard/subscription" 
             style="background: #22C55E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
            Продлить подписку
          </a>
        </div>
      </div>
    </div>
  `
}

function getTrialExpiringEmailText(userName: string, daysLeft: number): string {
  const isLastDay = daysLeft <= 1
  
  return `
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
    
    Продлить подписку: ${Deno.env.get('NEXT_PUBLIC_APP_URL')}/dashboard/subscription
  `
}