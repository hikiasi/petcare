'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🐾</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              PetCare
            </span>
          </Link>

          {/* Навигация для десктопа */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Возможности
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Цены
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Отзывы
            </button>
          </nav>

          {/* CTA и переключатель темы для десктопа */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Вход
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                НАЧАТЬ БЕСПЛАТНО
              </Button>
            </Link>
          </div>

          {/* Мобильное меню кнопка */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Возможности
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Цены
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Отзывы
              </button>
              <div className="px-3 py-2 space-y-2">
                <Link href="/auth/login" className="block">
                  <Button variant="outline" className="w-full">
                    Вход
                  </Button>
                </Link>
                <Link href="/auth/register" className="block">
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                    НАЧАТЬ БЕСПЛАТНО
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}