'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePets } from '@/hooks/usePets';
import { 
  ArrowLeft, 
  Edit, 
  Heart, 
  Calculator, 
  Bell, 
  Settings,
  Calendar,
  Weight,
  Palette,
  Microchip
} from 'lucide-react';

export default function PetProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { getPetById } = usePets();
  const [activeTab, setActiveTab] = useState('overview');

  const petId = params.id as string;
  const pet = getPetById(petId);

  if (!pet) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Питомец не найден
          </h2>
          <Button onClick={() => router.push('/dashboard')}>
            Вернуться к списку
          </Button>
        </div>
      </div>
    );
  }

  const getAgeFromBirthDate = (birthDate?: string) => {
    if (!birthDate) return 'Не указан';
    
    const birth = new Date(birthDate);
    const today = new Date();
    const ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 + 
                       (today.getMonth() - birth.getMonth());
    
    if (ageInMonths < 12) {
      return `${ageInMonths} мес.`;
    } else {
      const years = Math.floor(ageInMonths / 12);
      const months = ageInMonths % 12;
      return months > 0 ? `${years} г. ${months} мес.` : `${years} г.`;
    }
  };

  const getGenderText = (gender?: string) => {
    switch (gender) {
      case 'male': return 'Мужской ♂️';
      case 'female': return 'Женский ♀️';
      default: return 'Не указан';
    }
  };

  const getSpeciesEmoji = (species: string) => {
    const speciesMap: { [key: string]: string } = {
      'собака': '🐕',
      'кот': '🐱',
      'кошка': '🐱',
      'попугай': '🐦',
      'хомяк': '🐹',
      'кролик': '🐰',
      'рыбка': '🐠',
      'черепаха': '🐢',
      'игуана': '🦎',
      'змея': '🐍',
    };
    
    return speciesMap[species.toLowerCase()] || '🐾';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Хедер */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {pet.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Профиль питомца
            </p>
          </div>
        </div>
        
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Редактировать
        </Button>
      </div>

      {/* Основная информация */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            {/* Фото питомца */}
            <div className="flex-shrink-0">
              {pet.photo_url ? (
                <img
                  src={pet.photo_url}
                  alt={pet.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-full flex items-center justify-center text-6xl">
                  {getSpeciesEmoji(pet.species)}
                </div>
              )}
            </div>

            {/* Информация */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Возраст</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {getAgeFromBirthDate(pet.birth_date)}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Пол</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {getGenderText(pet.gender)}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Weight className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Вес</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {pet.weight ? `${pet.weight} кг` : 'Не указан'}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Palette className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Окрас</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {pet.color || 'Не указан'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Вид и порода</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge variant="secondary">{pet.species}</Badge>
                    {pet.breed && <Badge variant="outline">{pet.breed}</Badge>}
                  </div>
                </div>

                {pet.microchip_number && (
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Microchip className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Чип</span>
                    </div>
                    <p className="text-sm font-mono text-gray-900 dark:text-white">
                      {pet.microchip_number}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {pet.notes && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Заметки</h3>
              <p className="text-gray-900 dark:text-white">{pet.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Вкладки */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="health" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Здоровье
          </TabsTrigger>
          <TabsTrigger value="expenses" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Расходы
          </TabsTrigger>
          <TabsTrigger value="reminders" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Напоминания
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Настройки
          </TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Дневник здоровья</CardTitle>
              <CardDescription>
                История визитов к ветеринару, лекарств и процедур
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Записи в дневнике здоровья пока отсутствуют
                </p>
                <Button>
                  <Heart className="h-4 w-4 mr-2" />
                  Добавить запись
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Расходы</CardTitle>
              <CardDescription>
                Учет трат на питомца по категориям
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Расходы пока не добавлены
                </p>
                <Button>
                  <Calculator className="h-4 w-4 mr-2" />
                  Добавить расход
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Напоминания</CardTitle>
              <CardDescription>
                Уведомления о важных процедурах и событиях
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Напоминания не настроены
                </p>
                <Button>
                  <Bell className="h-4 w-4 mr-2" />
                  Создать напоминание
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Настройки питомца</CardTitle>
              <CardDescription>
                Управление профилем и настройками
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Edit className="h-4 w-4 mr-2" />
                Редактировать профиль
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                Удалить питомца
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}