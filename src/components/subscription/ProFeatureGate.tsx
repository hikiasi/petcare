'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSubscription } from '@/hooks/useSubscription';
import { Crown, Lock, Zap, Gift, ArrowRight } from 'lucide-react';

interface ProFeatureGateProps {
  children: ReactNode;
  feature: string;
  description?: string;
  showUpgrade?: boolean;
  fallback?: ReactNode;
}

export function ProFeatureGate({ 
  children, 
  feature, 
  description, 
  showUpgrade = true,
  fallback 
}: ProFeatureGateProps) {
  const router = useRouter();
  const { isPro, loading } = useSubscription();

  // Показываем загрузку
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Если пользователь имеет PRO доступ, показываем контент
  if (isPro) {
    return <>{children}</>;
  }

  // Если есть кастомный fallback, показываем его
  if (fallback) {
    return <>{fallback}</>;
  }

  // Показываем блокировку с предложением апгрейда
  return (
    <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Lock className="h-5 w-5 text-gray-500" />
          <Badge variant="outline" className="text-orange-600 border-orange-200">
            PRO функция
          </Badge>
        </div>
        <CardTitle className="text-lg">{feature}</CardTitle>
        {description && (
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      
      {showUpgrade && (
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Эта функция доступна только в PRO версии
            </p>
            
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Crown className="h-3 w-3" />
                <span>Неограниченно питомцев</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                <span>Все функции</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button
              size="sm"
              className="bg-green-500 hover:bg-green-600"
              onClick={() => router.push('/dashboard/subscription')}
            >
              <Gift className="h-4 w-4 mr-2" />
              Попробовать 14 дней бесплатно
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/dashboard/subscription')}
            >
              Узнать больше
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

// Хук для проверки доступа к PRO функциям
export function useProFeatureAccess() {
  const { isPro, checkLimit } = useSubscription();

  const hasProAccess = isPro;
  const maxPets = checkLimit('maxPets');
  const maxHealthRecords = checkLimit('maxHealthRecordsPerMonth');
  
  // Для проверки текущих лимитов нужно получать данные отдельно
  const canAddPet = maxPets === Infinity || isPro;
  const canAddHealthRecord = maxHealthRecords === Infinity || isPro;

  return {
    hasProAccess,
    canAddPet,
    canAddHealthRecord,
    isPro,
  };
}

// Компонент для ограничения количества элементов
interface LimitGateProps {
  children: ReactNode;
  currentCount: number;
  maxCount: number;
  itemName: string;
}

export function LimitGate({ 
  children, 
  currentCount, 
  maxCount, 
  itemName 
}: LimitGateProps) {
  const { isPro } = useSubscription();

  // PRO пользователи не имеют ограничений
  if (isPro || maxCount === -1) {
    return <>{children}</>;
  }

  // Проверяем лимит
  if (currentCount >= maxCount) {
    return (
      <ProFeatureGate
        feature={`Лимит ${itemName} исчерпан`}
        description={`Бесплатный план позволяет иметь максимум ${maxCount} ${itemName}. Обновитесь до PRO для снятия ограничений.`}
      >
        <div></div>
      </ProFeatureGate>
    );
  }

  return <>{children}</>;
}

// Компонент предупреждения о приближении к лимиту
interface LimitWarningProps {
  currentCount: number;
  maxCount: number;
  itemName: string;
  threshold?: number; // При каком проценте показывать предупреждение (по умолчанию 80%)
}

export function LimitWarning({ 
  currentCount, 
  maxCount, 
  itemName, 
  threshold = 0.8 
}: LimitWarningProps) {
  const router = useRouter();
  const { isPro } = useSubscription();

  // Не показываем для PRO пользователей или безлимитных планов
  if (isPro || maxCount === -1) {
    return null;
  }

  const usagePercent = currentCount / maxCount;
  
  // Показываем только если приближаемся к лимиту
  if (usagePercent < threshold) {
    return null;
  }

  const remaining = maxCount - currentCount;

  return (
    <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-orange-600" />
            <div>
              <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                Приближаетесь к лимиту
              </p>
              <p className="text-xs text-orange-600 dark:text-orange-300">
                Осталось {remaining} из {maxCount} {itemName}
              </p>
            </div>
          </div>
          
          <Button
            size="sm"
            variant="outline"
            className="border-orange-200 text-orange-700 hover:bg-orange-100"
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