import { Heart, Bell, Calculator, Users } from 'lucide-react';

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Всё, что нужно для заботы о питомце
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Четыре ключевые функции, которые решают 90% ежедневных задач владельца питомца
          </p>
        </div>

        <div className="space-y-20">
          {/* Дневник здоровья */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-red-100 dark:bg-red-900/30 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                  <Heart className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Дневник здоровья
                </h3>
              </div>
              <ul className="space-y-4 text-lg text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  Визиты к ветеринару с фотографиями документов
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  История лекарств и процедур
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  Заметки о состоянии питомца
                </li>
              </ul>
            </div>
            <div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">Визит к ветеринару</span>
                    <span className="text-sm text-gray-500">15.01.2024</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Плановый осмотр, прививка от бешенства</p>
                  <div className="flex space-x-2">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">Лекарство</span>
                    <span className="text-sm text-gray-500">Ежедневно</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Витамины для шерсти, 1 таблетка утром</p>
                </div>
              </div>
            </div>
          </div>

          {/* Умные напоминания */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
                <div className="space-y-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-400">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 dark:text-white">Прививка завтра</span>
                      <Bell className="h-5 w-5 text-yellow-500" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Комплексная вакцинация для Барсика</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-400">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 dark:text-white">Дегельминтизация через 3 дня</span>
                      <Bell className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Каждые 6 месяцев</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-400">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 dark:text-white">Витамины сегодня в 9:00</span>
                      <Bell className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Ежедневно утром</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                  <Bell className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Умные напоминания
                </h3>
              </div>
              <ul className="space-y-4 text-lg text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  Прививки по графику вакцинации
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  Дегельминтизация каждые 6 месяцев
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  Ежедневные лекарства в точное время
                </li>
              </ul>
            </div>
          </div>

          {/* Контроль расходов */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                  <Calculator className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Контроль расходов
                </h3>
              </div>
              <ul className="space-y-4 text-lg text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  5 категорий: корм, лекарства, игрушки, услуги, прочее
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  Сумма за месяц и год по каждому питомцу
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  Понимание реальных трат
                </li>
              </ul>
            </div>
            <div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Расходы за январь</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Корм</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">3,200₽</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Лекарства</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">1,800₽</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Игрушки</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">650₽</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Груминг</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">2,500₽</span>
                  </div>
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-gray-900 dark:text-white">Итого</span>
                    <span className="text-gray-900 dark:text-white">8,150₽</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Несколько питомцев */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Мои питомцы</h4>
                  <button className="text-green-500 text-sm font-medium">+ Добавить</button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
                      🐕
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">Барсик</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Лабрадор, 3 года</div>
                    </div>
                    <div className="text-green-500">●</div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center mr-3">
                      🐱
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">Мурка</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Британская, 2 года</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center mr-3">
                      🐦
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">Кеша</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Попугай, 1 год</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Несколько питомцев
                </h3>
              </div>
              <ul className="space-y-4 text-lg text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  Отдельный профиль для каждого
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  Переключение одной кнопкой
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  Общая статистика по всем
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}