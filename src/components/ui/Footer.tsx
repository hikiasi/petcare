import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Логотип и описание */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🐾</span>
              </div>
              <span className="text-xl font-bold">PetCare</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Простой органайзер для владельцев питомцев. Ведите дневник здоровья, 
              отслеживайте расходы и получайте напоминания о важных процедурах.
            </p>
            <div className="flex space-x-4">
              <a 
                href="mailto:support@petcare.ru" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                support@petcare.ru
              </a>
            </div>
          </div>

          {/* Ссылки */}
          <div>
            <h3 className="font-semibold mb-4">Продукт</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Возможности
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Цены
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Поддержка */}
          <div>
            <h3 className="font-semibold mb-4">Поддержка</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Договор оферты
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-gray-400 hover:text-white transition-colors">
                  Вход в аккаунт
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 PetCare. Все права защищены.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a 
              href="https://t.me/petcare_support" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Telegram
            </a>
            <a 
              href="https://instagram.com/petcare_ru" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}