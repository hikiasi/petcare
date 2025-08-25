export function ProblemSection() {
  return (
    <section id="problems" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Знакомо? Вы не одиноки...
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Тысячи владельцев питомцев сталкиваются с этими проблемами каждый день
          </p>
        </div>

        {/* 4 карточки проблем */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-100 dark:border-red-800">
            <div className="text-4xl mb-4">😰</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Просрочили прививку
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              И теперь не пускают в поездку с питомцем. Штраф и стресс для всей семьи.
            </p>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl border border-orange-100 dark:border-orange-800">
            <div className="text-4xl mb-4">💊</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Забыли дать таблетку
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Ветеринар говорит начинать курс заново. Деньги на ветер и здоровье под угрозой.
            </p>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border border-yellow-100 dark:border-yellow-800">
            <div className="text-4xl mb-4">💸</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Не помните, сколько тратите
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              В конце месяца шок от суммы чеков. Бюджет семьи под угрозой.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Сложные приложения
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              20 вкладок, реклама, непонятный интерфейс. Проще записать на бумажке.
            </p>
          </div>
        </div>

        {/* Статистика */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Цифры, которые пугают
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Исследования показывают масштаб проблемы среди владельцев питомцев в России
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                  73%
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    владельцев забывают о важных процедурах
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Прививки, лекарства, визиты к ветеринару
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm">
                  8.5К₽
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    средний ущерб от пропуска прививки
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Штрафы, повторные процедуры, лечение
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}