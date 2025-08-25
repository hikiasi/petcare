'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSubscription } from '@/hooks/useSubscription';
import { Crown, Calendar, AlertTriangle, Gift, Zap } from 'lucide-react';

export function SubscriptionStatus() {
  const router = useRouter();
  const { 
    isPro, 
    isTrialActive, 
    subscription, 
    loading, 
    getTrialDaysLeft 
  } = useSubscription();

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="animate-pulse flex items-center gap-3">
            <div className="h-5 w-5 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Бесплатный пользователь
  if (!isPro) {
    return (
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gift className="h-5 w-5 text-blue-600" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-blue-800 dark:text-blue-200">
                    Бесплатный план
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    FREE
                  </Badge>
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-300">
                  До 2 питомцев • 5 записей/месяц
                </p>
              </div>
            </div>
            
            <Button
              size="sm"
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => router.push('/dashboard/subscription')}
            >
              <Crown className="h-3 w-3 mr-1" />
              Обновить
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Пробный период
  if (isTrialActive) {
    const daysLeft = getTrialDaysLeft();
    const isExpiringSoon = daysLeft <= 3;

    return (
      <Card className={`border-green-200 ${isExpiringSoon ? 'bg-orange-50 dark:bg-orange-900/20' : 'bg-green-50 dark:bg-green-900/20'}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isExpiringSoon ? (
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              ) : (
                <Gift className="h-5 w-5 text-green-600" />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${isExpiringSoon ? 'text-orange-800 dark:text-orange-200' : 'text-green-800 dark:text-green-200'}`}>
                    Пробный период PRO
                  </span>
                  <Badge className={`text-xs ${isExpiringSoon ? 'bg-orange-500' : 'bg-green-500'} text-white`}>
                    TRIAL
                  </Badge>
                </div>
                <p className={`text-xs ${isExpiringSoon ? 'text-orange-600 dark:text-orange-300' : 'text-green-600 dark:text-green-300'}`}>
                  {daysLeft > 0 ? `Осталось ${daysLeft} дней` : 'Истекает сегодня'}
                </p>
              </div>
            </div>
            
            <Button
              size="sm"
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => router.push('/dashboard/subscription')}
            >
              <Zap className="h-3 w-3 mr-1" />
              Продлить
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Активная PRO подписка
  const getSubscriptionEndDate = () => {
    if (!subscription?.end_date) return null;
    
    const endDate = new Date(subscription.end_date);
    const now = new Date();
    const daysUntilEnd = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      date: endDate.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short'
      }),
      daysLeft: daysUntilEnd,
      isExpiringSoon: daysUntilEnd <= 7
    };
  };

  const endInfo = getSubscriptionEndDate();

  return (
    <Card className={`border-green-200 ${endInfo?.isExpiringSoon ? 'bg-orange-50 dark:bg-orange-900/20' : 'bg-green-50 dark:bg-green-900/20'}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {endInfo?.isExpiringSoon ? (
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            ) : (
              <Crown className="h-5 w-5 text-green-600" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-medium ${endInfo?.isExpiringSoon ? 'text-orange-800 dark:text-orange-200' : 'text-green-800 dark:text-green-200'}`}>
                  PRO подписка
                </span>
                <Badge className={`text-xs ${endInfo?.isExpiringSoon ? 'bg-orange-500' : 'bg-green-500'} text-white`}>
                  PRO
                </Badge>
              </div>
              {endInfo && (
                <p className={`text-xs ${endInfo.isExpiringSoon ? 'text-orange-600 dark:text-orange-300' : 'text-green-600 dark:text-green-300'}`}>
                  {endInfo.isExpiringSoon 
                    ? `Истекает ${endInfo.date} (${endInfo.daysLeft} дн.)`
                    : `Действует до ${endInfo.date}`
                  }
                </p>
              )}
            </div>
          </div>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push('/dashboard/subscription')}
          >
            <Calendar className="h-3 w-3 mr-1" />
            Управление
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}