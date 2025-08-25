'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

export function ComparisonSection() {
  return (
    <section id="comparison" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Почему владельцы переходят к нам с других приложений
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Честное сравнение с популярными решениями на рынке
          </p>
        </div>

        {/* Таблица сравнения */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Критерий
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-green-600 dark:text-green-400">
                    PetCare
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Другие приложения
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    Простота
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm text-gray-900 dark:text-white">3 основные функции</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <X className="h-5 w-5 text-red-500 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">20+ запутанных вкладок</span>
                    </div>
                  </td>
                </tr>
                
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    Скорость
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm text-gray-900 dark:text-white">Добавить запись за 10 сек</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <X className="h-5 w-5 text-red-500 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">5 шагов для простого действия</span>
                    </div>
                  </td>
                </tr>
                
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    Напоминания
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm text-gray-900 dark:text-white">Умные, в нужное время</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <X className="h-5 w-5 text-red-500 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Спам-уведомления</span>
                    </div>
                  </td>
                </tr>
                
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    Реклама
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm text-gray-900 dark:text-white">Никакой рекламы</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <X className="h-5 w-5 text-red-500 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Реклама корма каждые 5 минут</span>
                    </div>
                  </td>
                </tr>
                
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    Цена
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm text-gray-900 dark:text-white">299₽/мес за всё</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <X className="h-5 w-5 text-red-500 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">От 590₽/мес + доп.платежи</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/auth/register">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg">
              ПОПРОБОВАТЬ РАЗНИЦУ
            </Button>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            14 дней бесплатно • Отмена в любой момент
          </p>
        </div>
      </div>
    </section>
  );
}