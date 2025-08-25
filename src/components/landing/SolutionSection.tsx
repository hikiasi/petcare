'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, Bell, PieChart } from 'lucide-react';

export function SolutionSection() {
  return (
    <section id="solution" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Мы сделали то, что должны были сделать другие —{' '}
            <span className="text-green-500">простое решение</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Пока конкуренты усложняют, мы упрощаем. Только то, что действительно нужно каждый день.
          </p>
        </div>

        {/* 3 колонки УТП */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ничего лишнего
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>• Только то, что нужно каждый день</li>
              <li>• Без 50 функций, которыми не пользуетесь</li>
              <li>• Интерфейс понятен за 30 секунд</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Умные напоминания
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>• Уведомления именно тогда, когда нужно</li>
              <li>• В телеграме и на телефоне</li>
              <li>• Учитывает график ваших питомцев</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <PieChart className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Простой учет расходов
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>• Видите сразу: сколько тратите и на что</li>
              <li>• Без сложной аналитики</li>
              <li>• Помогает планировать бюджет</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/auth/register">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg">
              НАЧАТЬ ПОЛЬЗОВАТЬСЯ
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}