"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "هل الآلة الحاسبة اون لاين مجانية؟",
    answer:
      "نعم، آلة الحاسبة اون لاين مجانية تمامًا ولا تتطلب أي تسجيل أو تحميل. يمكنك استخدامها مباشرة من أي متصفح على أي جهاز.",
  },
  {
    question: "ما الفرق بين الآلة الحاسبة العادية والعلمية؟",
    answer:
      "الآلة الحاسبة العادية تُجري العمليات الأساسية الأربع: الجمع والطرح والضرب والقسمة. أما الآلة الحاسبة العلمية فتضيف وظائف متقدمة مثل: الجيب (sin)، جيب التمام (cos)، التمام (tan)، اللوغاريتم، الجذور، والأسس — وهي مناسبة لطلاب الرياضيات والهندسة.",
  },
  {
    question: "هل تعمل الحاسبة على الجوال؟",
    answer:
      "نعم، الآلة الحاسبة مصممة بالكامل لتعمل على الهاتف المحمول والتابلت والكمبيوتر. الأزرار كبيرة وسهلة الضغط على شاشات اللمس.",
  },
  {
    question: "كيف أحسب النسبة المئوية؟",
    answer:
      "لحساب نسبة مئوية، اضغط على الرقم ثم اضغط زر % في الحاسبة العادية. مثال: لحساب 20% من 500، اضغط: 500 × 20 % = وستحصل على 100. أو استخدم حاسبة النسبة المئوية المتخصصة من قائمة الأدوات.",
  },
  {
    question: "ما هو أفضل بديل لحاسبة كاسيو اون لاين؟",
    answer:
      "آلة الحاسبة العلمية في موقعنا تُقدم نفس وظائف حاسبة كاسيو بالكامل — بما فيها: sin، cos، tan، log، ln، الجذر التربيعي، والأسس. تعمل مجانًا اون لاين دون الحاجة لشراء أي جهاز.",
  },
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-blue-200 transition-colors duration-200"
        >
          <button
            id={`faq-btn-${index}`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between px-5 py-4 text-start"
            aria-expanded={openIndex === index}
            aria-controls={`faq-content-${index}`}
          >
            <span className="text-base font-semibold text-slate-800 pe-4">
              {faq.question}
            </span>
            <span
              className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                openIndex === index
                  ? "bg-primary text-white rotate-45"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </span>
          </button>
          <div
            id={`faq-content-${index}`}
            role="region"
            aria-labelledby={`faq-btn-${index}`}
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-64" : "max-h-0"
            }`}
          >
            <div className="px-5 pb-5">
              <div className="h-px bg-slate-100 mb-4" />
              <p className="text-sm text-slate-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
