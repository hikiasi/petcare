'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap, Target, Gift } from 'lucide-react';

export function FinalCTA() {
  const [email, setEmail] = useState('');

  const handleQuickSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Перенаправляем на страницу регистрации с предзаполненным email
    window.location.href = `/auth/register?email=${encodeURIComponent(email)}`;
  };

  return (
    <section id="final-cta" className="py-20 bg-gradient-to-br from-green-500 to-blue-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Начните заботиться лучше уже сегодня
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
            Присоединяйтесь к <strong>847 ответственным владельцам</strong>, которые больше ничего не забывают
          </p>
        </div>

        {/* 3 преимущества в строку */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">⚡ Настройка за 5 минут</h3>
            <p className="opacity-80">Добавьте питомца и получите первые напоминания</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">🎯 Первое напоминание завтра</h3>
            <p className="opacity-80">Система сразу начнет работать на вас</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">💝 14 дней бесплатно</h3>
            <p className="opacity-80">Попробуйте все PRO функции без ограничений</p>
          </div>
        </div>

        {/* Форма быстрой регистрации */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-center mb-6">
              Быстрая регистрация
            </h3>
            
            <form onSubmit={handleQuickSignup} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  type="email"
                  placeholder="Ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/90 border-white/30 text-gray-900 placeholder-gray-600"
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-white text-green-600 hover:bg-gray-100 font-semibold"
                >
                  СОЗДАТЬ АККАУНТ
                </Button>
              </div>
            </form>
            
            {/* Альтернативная кнопка */}
            <div className="text-center mt-6">
              <p className="text-sm opacity-80 mb-4">или</p>
              <Link href="/auth/register">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white hover:text-green-600 px-8"
                >
                  НАЧАТЬ ПОЛЬЗОВАТЬСЯ БЕСПЛАТНО
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Гарантии */}
        <div className="text-center mt-12">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm opacity-80">
            <span>✓ Без спама</span>
            <span>✓ Отписка в 1 клик</span>
            <span>✓ 14 дней бесплатно</span>
            <span>✓ Отмена в любой момент</span>
          </div>
        </div>

        {/* Последний социальный proof */}
        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
            <div className="text-3xl mb-2">🎉</div>
            <p className="font-semibold mb-1">Сегодня зарегистрировались:</p>
            <p className="text-2xl font-bold">+23 новых владельца</p>
          </div>
        </div>
      </div>
    </section>
  );
}