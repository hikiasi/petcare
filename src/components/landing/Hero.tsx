'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Play, CheckCircle } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка - текст */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Больше никогда не забудете о{' '}
              <span className="text-green-500">здоровье</span>{' '}
              своего питомца
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              Простой органайзер, который помнит всё: прививки, лекарства, расходы. 
              Пока другие приложения путают сложностью — мы решаем проблемы просто.
            </p>

            {/* Ключевые боли */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="text-2xl">🤯</div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900 dark:text-white">Забыли о прививке</div>
                  <div className="text-gray-600 dark:text-gray-400">штраф 5000₽</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="text-2xl">📱</div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900 dark:text-white">Сложные приложения</div>
                  <div className="text-gray-600 dark:text-gray-400">с 50 функциями</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="text-2xl">💸</div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900 dark:text-white">Не понимаете</div>
                  <div className="text-gray-600 dark:text-gray-400">сколько тратите</div>
                </div>
              </div>
            </div>

            {/* CTA кнопки */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link href="/auth/register">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg">
                  ПОПРОБОВАТЬ БЕСПЛАТНО
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg"
                onClick={() => {
                  // Здесь будет видео-обзор
                  alert('Видео-обзор скоро будет доступен!');
                }}
              >
                <Play className="mr-2 h-5 w-5" />
                Посмотреть видео-обзор
              </Button>
            </div>

            {/* Социальное доказательство */}
            <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600 dark:text-gray-400">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Уже 847 хозяев используют</span>
            </div>
          </div>

          {/* Правая колонка - визуал */}
          <div className="relative">
            {/* Placeholder для скриншота приложения */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🐕</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Добавить прививку
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Быстро и просто
                  </p>
                  <div className="bg-green-500 text-white px-4 py-2 rounded-lg inline-block">
                    Сохранить
                  </div>
                </div>
              </div>
            </div>

            {/* Фоновое изображение питомца (размыто) */}
            <div className="absolute -z-10 top-10 right-10 w-32 h-32 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -z-10 bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}