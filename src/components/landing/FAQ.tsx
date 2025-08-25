'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Можно ли использовать без интернета?",
      answer: "Да, все данные сохраняются локально на вашем устройстве. Интернет нужен только для синхронизации между устройствами и получения напоминаний."
    },
    {
      question: "Как работают напоминания в Telegram?",
      answer: "В PRO версии вы подключаете нашего бота к своему аккаунту Telegram, выбираете удобное время для уведомлений. Бот автоматически напоминает о важных процедурах."
    },
    {
      question: "Безопасны ли данные о питомце?",
      answer: "Абсолютно. Все данные шифруются и хранятся в защищенной базе данных. Мы не передаем информацию третьим лицам и не используем её в рекламных целях."
    },
    {
      question: "Можно ли отменить подписку?",
      answer: "Да, в любой момент в личном кабинете одним кликом. Без скрытых платежей, штрафов или сложных процедур. Данные останутся доступны в бесплатной версии."
    },
    {
      question: "Подойдет ли для экзотических животных?",
      answer: "Конечно! Можно добавить любой вид: хомяк, попугай, игуана, змея, кролик и даже рыбки. Система адаптируется под особенности каждого вида животных."
    },
    {
      question: "Есть ли мобильное приложение?",
      answer: "Пока только веб-версия, которая отлично адаптирована под мобильные устройства. Нативное мобильное приложение находится в разработке и выйдет в 2025 году."
    },
    {
      question: "Можно ли экспортировать данные?",
      answer: "Да, в PRO версии доступен экспорт всех данных в PDF формате для ветеринара или в Excel для личного архива. Также можно экспортировать отдельные записи."
    },
    {
      question: "Работает ли оффлайн?",
      answer: "Базовые функции (просмотр записей, добавление новых) работают оффлайн. Напоминания и синхронизация требуют подключения к интернету."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Частые вопросы
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Ответы на самые популярные вопросы от владельцев питомцев
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl transition-colors"
                >
                  <span className="font-semibold text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Дополнительная помощь */}
        <div className="text-center mt-16">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Не нашли ответ на свой вопрос?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Наша команда поддержки готова помочь вам в любое время
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@petcare.ru" 
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Написать в поддержку
              </a>
              <a 
                href="https://t.me/petcare_support" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Telegram чат
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}