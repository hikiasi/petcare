'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PetCard } from '@/components/dashboard/PetCard';
import { AddPetForm } from '@/components/dashboard/AddPetForm';
import { SubscriptionStatus } from '@/components/subscription/SubscriptionStatus';
import { LimitGate, LimitWarning, useProFeatureAccess } from '@/components/subscription/ProFeatureGate';
import { usePets } from '@/hooks/usePets';
import { useSubscription } from '@/hooks/useSubscription';
import { 
  Plus, 
  Heart, 
  Calculator, 
  Bell, 
  Crown,
  Calendar
} from 'lucide-react';

export default function DashboardPage() {
  const { pets, loading } = usePets();
  const { limits } = useSubscription();
  const { canAddPet } = useProFeatureAccess();
  const [showAddPetForm, setShowAddPetForm] = useState(false);

  // Мок данные для демонстрации
  const mockStats = {
    upcomingReminders: 3,
    monthlyExpenses: 8150,
    healthRecords: 12,
    lastVetVisit: '15.01.2024'
  };

  const mockReminders = [
    { id: 1, petName: 'Барсик', title: 'Прививка от бешенства', date: 'Завтра', urgent: true },
    { id: 2, petName: 'Мурка', title: 'Витамины', date: 'Сегодня 18:00', urgent: false },
    { id: 3, petName: 'Кеша', title: 'Дегельминтизация', date: 'Через 3 дня', urgent: false },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Заголовок */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Добро пожаловать в PetCare!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Управляйте здоровьем и заботой о ваших питомцах
          </p>
        </div>
        

      </div>

      {/* Статус подписки */}
      <SubscriptionStatus />

      {/* Предупреждение о лимитах */}
      {limits && (
        <LimitWarning
          currentCount={pets?.length || 0}
          maxCount={limits.maxPets}
          itemName="питомцев"
        />
      )}

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Напоминания</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockStats.upcomingReminders}
                </p>
              </div>
              <Bell className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Расходы за месяц</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockStats.monthlyExpenses.toLocaleString()}₽
                </p>
              </div>
              <Calculator className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Записи здоровья</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockStats.healthRecords}
                </p>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Последний визит</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockStats.lastVetVisit}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Мои питомцы */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Мои питомцы
                    <Badge variant="secondary">
                      {pets?.length || 0}/{limits?.maxPets === -1 ? '∞' : limits?.maxPets || 2}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Управляйте профилями ваших питомцев
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => setShowAddPetForm(true)}
                  className="flex items-center gap-2"
                  disabled={!canAddPet}
                >
                  <Plus className="h-4 w-4" />
                  Добавить питомца
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                </div>
              ) : pets && pets.length > 0 ? (
                <div className="grid gap-4">
                  {pets.map((pet) => (
                    <PetCard key={pet.id} pet={pet} />
                  ))}
                </div>
              ) : (
                <LimitGate
                  currentCount={0}
                  maxCount={limits?.maxPets || 2}
                  itemName="питомцев"
                >
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🐾</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Добавьте своего первого питомца
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Создайте профиль питомца, чтобы начать отслеживать его здоровье и расходы
                    </p>
                    <Button onClick={() => setShowAddPetForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Добавить питомца
                    </Button>
                  </div>
                </LimitGate>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Ближайшие напоминания */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Ближайшие напоминания
              </CardTitle>
              <CardDescription>
                Не пропустите важные процедуры
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockReminders.map((reminder) => (
                  <div 
                    key={reminder.id}
                    className={`p-3 rounded-lg border ${
                      reminder.urgent 
                        ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20' 
                        : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900 dark:text-white">
                          {reminder.title}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {reminder.petName}
                        </p>
                      </div>
                      <Badge 
                        variant={reminder.urgent ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {reminder.date}
                      </Badge>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-4">
                  Все напоминания
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Быстрые действия */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Быстрые действия</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Добавить запись в дневник
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calculator className="h-4 w-4 mr-2" />
                  Записать расход
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Создать напоминание
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Форма добавления питомца */}
      {showAddPetForm && (
        <AddPetForm onClose={() => setShowAddPetForm(false)} />
      )}
    </div>
  );
}