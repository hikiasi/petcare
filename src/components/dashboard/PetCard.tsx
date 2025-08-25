'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MoreVertical, 
  Edit, 
  Trash2, 
  Heart,
  Calculator,
  Bell
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Pet {
  id: string;
  name: string;
  species: string;
  breed?: string;
  birth_date?: string;
  photo_url?: string;
  gender?: 'male' | 'female' | 'unknown';
  weight?: number;
  created_at: string;
}

interface PetCardProps {
  pet: Pet;
  onEdit?: (pet: Pet) => void;
  onDelete?: (petId: string) => void;
}

export function PetCard({ pet, onEdit, onDelete }: PetCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const getAgeFromBirthDate = (birthDate?: string) => {
    if (!birthDate) return null;
    
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

  const getGenderEmoji = (gender?: string) => {
    switch (gender) {
      case 'male': return '♂️';
      case 'female': return '♀️';
      default: return '';
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

  // Мок данные для демонстрации
  const mockStats = {
    healthRecords: Math.floor(Math.random() * 10) + 1,
    upcomingReminders: Math.floor(Math.random() * 3),
    monthlyExpenses: Math.floor(Math.random() * 5000) + 1000,
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            {/* Аватар питомца */}
            <div className="relative">
              {pet.photo_url ? (
                <img
                  src={pet.photo_url}
                  alt={pet.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-full flex items-center justify-center text-2xl">
                  {getSpeciesEmoji(pet.species)}
                </div>
              )}
              
              {/* Индикатор активности */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Информация о питомце */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {pet.name}
                </h3>
                {pet.gender && (
                  <span className="text-sm">{getGenderEmoji(pet.gender)}</span>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {pet.species}
                </Badge>
                {pet.breed && (
                  <Badge variant="outline" className="text-xs">
                    {pet.breed}
                  </Badge>
                )}
                {pet.birth_date && (
                  <Badge variant="outline" className="text-xs">
                    {getAgeFromBirthDate(pet.birth_date)}
                  </Badge>
                )}
              </div>

              {/* Статистика */}
              <div className="grid grid-cols-3 gap-4 mt-3">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Heart className="h-4 w-4 text-red-500" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {mockStats.healthRecords}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">записей</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Bell className="h-4 w-4 text-blue-500" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {mockStats.upcomingReminders}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">напоминаний</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Calculator className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {mockStats.monthlyExpenses.toLocaleString()}₽
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">в месяц</p>
                </div>
              </div>
            </div>
          </div>

          {/* Меню действий */}
          <DropdownMenu open={showMenu} onOpenChange={setShowMenu}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(pet)}>
                <Edit className="h-4 w-4 mr-2" />
                Редактировать
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete?.(pet.id)}
                className="text-red-600 dark:text-red-400"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Удалить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Кнопки действий */}
        <div className="flex gap-2 mt-4">
          <Link href={`/dashboard/pets/${pet.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              Открыть профиль
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Calculator className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}