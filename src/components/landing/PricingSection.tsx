'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Выберите свой план
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Начните бесплатно и переходите на PRO, когда будете готовы к расширенным возможностям
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Бесплатный план */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                БЕСПЛАТНЫЙ
              </h3>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                0₽
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Навсегда бесплатно
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">До 2 питомцев</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">5 записей в дневнике здоровья в месяц</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">Базовые напоминания</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">Простая аналитика расходов</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">Поддержка по email</span>
              </li>
            </ul>

            <Link href="/auth/register" className="block">
              <Button variant="outline" size="lg" className="w-full">
                НАЧАТЬ БЕСПЛАТНО
              </Button>
            </Link>
          </div>

          {/* PRO план */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-8 rounded-2xl border-2 border-green-500 relative">
            {/* Бейдж популярного выбора */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                <Star className="h-4 w-4 mr-1 fill-current" />
                ПОПУЛЯРНЫЙ ВЫБОР
              </div>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                PRO
              </h3>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                299₽
                <span className="text-lg font-normal text-gray-600 dark:text-gray-400">/месяц</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Все возможности для профессионального ухода
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300"><strong>Неограниченно питомцев</strong></span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300"><strong>Полный дневник здоровья</strong></span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300"><strong>Умные напоминания в Telegram</strong></span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300"><strong>Подробная аналитика расходов</strong></span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300"><strong>История прививок и документов</strong></span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300"><strong>Приоритетная поддержка</strong></span>
              </li>
            </ul>

            <Link href="/auth/register" className="block">
              <Button size="lg" className="w-full bg-green-500 hover:bg-green-600 text-white">
                ПОПРОБОВАТЬ PRO 14 ДНЕЙ
              </Button>
            </Link>
          </div>
        </div>

        {/* Гарантия */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400">
            <strong>14 дней бесплатно.</strong> Отмена в любой момент. Без скрытых платежей.
          </p>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Почему владельцы выбирают PRO?
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl mb-4">💰</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Экономия денег</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                В среднем экономят 3,000₽ в месяц благодаря контролю расходов
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4">⏰</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Экономия времени</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Умные напоминания экономят 2 часа в неделю на планировании
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4">❤️</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Спокойствие</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Уверенность, что здоровье питомца под полным контролем
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}