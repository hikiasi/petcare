import { Star } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Мария",
      pet: "владелец кота",
      text: "Наконец-то! Простое приложение без кучи ненужных функций. Добавила напоминание о прививке — оно пришло вовремя. Больше никаких пропусков!",
      avatar: "🐱"
    },
    {
      name: "Александр",
      pet: "2 собаки",
      text: "Перешел с 11pets. Там было слишком сложно. Здесь за 5 минут настроил всё для двух собак. Расходы теперь под контролем.",
      avatar: "🐕"
    },
    {
      name: "Елена",
      pet: "ветеринар",
      text: "Рекомендую своим клиентам. Они приходят с актуальной информацией о питомце. Экономит время на приеме.",
      avatar: "👩‍⚕️"
    },
    {
      name: "Дмитрий",
      pet: "кот и попугай",
      text: "Удобно переключаться между питомцами. Коту напоминание о таблетке, попугаю — о витаминах. Все в одном месте.",
      avatar: "🐦"
    },
    {
      name: "Анна",
      pet: "собака",
      text: "Экономлю 2000₽ в месяц! Вижу точно, сколько трачу на корм, и могу планировать покупки.",
      avatar: "🐕‍🦺"
    },
    {
      name: "Игорь",
      pet: "3 кота",
      text: "Пробовал PetDesk — там реклама замучила. Здесь чисто, быстро, по делу. Идеально для занятых людей.",
      avatar: "😺"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Что говорят владельцы, которые уже пользуются
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Реальные отзывы от реальных людей, которые решили свои проблемы с помощью PetCare
          </p>
        </div>

        {/* 6 отзывов в 2 ряда */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              {/* Звезды */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Текст отзыва */}
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              
              {/* Автор */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.pet}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Дополнительная статистика */}
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-green-500 mb-2">847</div>
              <div className="text-gray-600 dark:text-gray-400">довольных владельцев</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">4.9</div>
              <div className="text-gray-600 dark:text-gray-400">средняя оценка в отзывах</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">98%</div>
              <div className="text-gray-600 dark:text-gray-400">рекомендуют друзьям</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}