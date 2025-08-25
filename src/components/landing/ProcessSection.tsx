export function ProcessSection() {
  return (
    <section id="process" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            3 шага до идеального порядка
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Настройка занимает меньше 5 минут. Результат — спокойствие на годы вперед.
          </p>
        </div>

        <div className="space-y-16">
          {/* Шаг 1 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-6">
                <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                  1
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Добавьте питомца
                  </h3>
                  <p className="text-green-600 dark:text-green-400 font-medium">30 секунд</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Имя, фото, дата рождения — и всё. Никаких сложных анкет и лишних полей. 
                Просто самое необходимое для начала работы.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-green-800 dark:text-green-200 font-medium">
                  ✓ Результат: Профиль питомца готов к использованию
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🐕</div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Добавить питомца
                  </h4>
                  <div className="space-y-2">
                    <div className="bg-white dark:bg-gray-800 rounded p-2 text-sm">Имя: Барсик</div>
                    <div className="bg-white dark:bg-gray-800 rounded p-2 text-sm">Порода: Лабрадор</div>
                    <div className="bg-green-500 text-white px-4 py-2 rounded">Сохранить</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Шаг 2 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📋</div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Базовая информация
                  </h4>
                  <div className="space-y-2">
                    <div className="bg-white dark:bg-gray-800 rounded p-2 text-sm">Последняя прививка: 15.01.2024</div>
                    <div className="bg-white dark:bg-gray-800 rounded p-2 text-sm">Лекарства: Витамины</div>
                    <div className="bg-blue-500 text-white px-4 py-2 rounded">Готово</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                  2
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Заполните базовую информацию
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">2 минуты</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Последние прививки, текущие лекарства, важные даты. Система сама подскажет, 
                когда нужно будет повторить процедуры.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-blue-800 dark:text-blue-200 font-medium">
                  ✓ Результат: Умные напоминания настроены автоматически
                </p>
              </div>
            </div>
          </div>

          {/* Шаг 3 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-6">
                <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                  3
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Получайте напоминания
                  </h3>
                  <p className="text-orange-600 dark:text-orange-400 font-medium">Автоматически</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Мы сами напомним о важном: прививках, лекарствах, визитах к ветеринару. 
                В удобное время, без спама и лишних уведомлений.
              </p>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="text-orange-800 dark:text-orange-200 font-medium">
                  ✓ Результат: Больше ничего не забудете
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔔</div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Напоминание
                  </h4>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                    <p className="text-sm font-medium">Завтра прививка для Барсика</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Ветклиника &ldquo;Айболит&rdquo;, 14:00</p>
                    <div className="mt-3 space-x-2">
                      <button className="bg-green-500 text-white px-3 py-1 rounded text-xs">Готов</button>
                      <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs">Позже</button>
                    </div>
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