import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import ToolCard from "@/components/ToolCard";
import FAQAccordion, { faqSchema } from "@/components/FAQAccordion";
import Script from "next/script";

export const metadata: Metadata = {
  title: "آلة حاسبة اون لاين | حاسبة علمية مجانية",
  description:
    "استخدم آلة حاسبة اون لاين مجانًا. حاسبة علمية متطورة تعمل على الجوال والكمبيوتر بدون تحميل. حاسبة كاسيو، حاسبة العملات، وأكثر. ابدأ الآن ←",
};

// ─── Section 3 data ──────────────────────────────────────────────────────────
const mostUsedCalcs = [
  {
    icon: "🔬",
    title: "آلة حاسبة علمية",
    description: "حساب المثلثات، اللوغاريتمات، والقوى",
    href: "/الة-حاسبة/علمية/",
    anchorText: "افتح الآلة الحاسبة العلمية ←",
  },
  {
    icon: "🖩",
    title: "حاسبة كاسيو اون لاين",
    description: "تصميم كاسيو الكلاسيكي اون لاين مجانًا",
    href: "/الة-حاسبة/كاسيو/",
    anchorText: "افتح حاسبة كاسيو ←",
  },
  {
    icon: "⚡",
    title: "آلة حاسبة متطورة",
    description: "حاسبة مبرمجة بذاكرة وسجل العمليات",
    href: "/الة-حاسبة/متطورة/",
    anchorText: "افتح الآلة المتطورة ←",
  },
  {
    icon: "➕",
    title: "آلة حاسبة بسيطة",
    description: "حاسبة عادية للعمليات الأساسية",
    href: "/الة-حاسبة/بسيطة/",
    anchorText: "افتح الحاسبة البسيطة ←",
  },
];

// ─── Section 4 data ──────────────────────────────────────────────────────────
const mathTools = [
  {
    icon: "⭕",
    title: "الدائرة المثلثية",
    description: "قيم sin وcos وtan لجميع الزوايا",
    href: "/ادوات-رياضيات/دائرة-مثلثية/",
    anchorText: "افتح الأداة ←",
    badge: "6,700 باحث شهرياً",
  },
  {
    icon: "📊",
    title: "الدالة اللوغاريتمية",
    description: "حاسبة log وln مع شرح الخطوات",
    href: "/ادوات-رياضيات/لوغاريتم/",
    anchorText: "افتح الأداة ←",
  },
  {
    icon: "⭕",
    title: "مساحة الدائرة",
    description: "احسب مساحة ومحيط الدائرة بسهولة",
    href: "/ادوات-رياضيات/مساحة-دائرة/",
    anchorText: "افتح الأداة ←",
  },
  {
    icon: "➗",
    title: "القسمة المطولة",
    description: "حل القسمة المطولة خطوة بخطوة",
    href: "/ادوات-رياضيات/قسمة-مطولة/",
    anchorText: "افتح الأداة ←",
  },
  {
    icon: "✖️",
    title: "جدول الضرب",
    description: "جدول الضرب كامل بالعربي من 1 إلى 12",
    href: "/ادوات-رياضيات/جدول-ضرب/",
    anchorText: "افتح الأداة ←",
  },
];

// ─── Section 5 data ──────────────────────────────────────────────────────────
const specialtyCalcs = [
  {
    icon: "💱",
    title: "حاسبة العملات",
    description:
      "تحويل العملات فوري بأسعار محدثة — ريال، دولار، يورو، وأكثر",
    href: "/حاسبات-متخصصة/حاسبة-العملات/",
    anchorText: "افتح الحاسبة ←",
    badge: "الأكثر استخداماً",
    accentColor: "blue" as const,
  },
  {
    icon: "🤰",
    title: "حاسبة الحمل الدقيقة",
    description: "احسبي موعد الولادة وأسابيع الحمل بدقة",
    href: "/حاسبات-متخصصة/حاسبة-الحمل/",
    anchorText: "افتح الحاسبة ←",
    accentColor: "pink" as const,
  },
  {
    icon: "👕",
    title: "تحويل مقاسات الملابس",
    description: "حوّل المقاسات بين أمريكي، أوروبي، وعربي",
    href: "/حاسبات-متخصصة/تحويل-مقاسات/",
    anchorText: "افتح الحاسبة ←",
    accentColor: "green" as const,
  },
  {
    icon: "%",
    title: "حاسبة النسبة المئوية",
    description: "احسب النسب، الزيادة، والخصومات بسهولة",
    href: "/حاسبات-متخصصة/حاسبة-نسبة/",
    anchorText: "افتح الحاسبة ←",
    accentColor: "orange" as const,
  },
];

export default function HomePage() {
  return (
    <>
      {/* FAQ JSON-LD schema */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ───────────────────────────────────────────────────────────────────
          SECTION 2 — HERO + CALCULATOR WIDGET
      ─────────────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-to-br from-slate-50 via-blue-50/40 to-white"
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* Mobile: calculator first, then text. Desktop: text right, calc left */}
          <div className="flex flex-col md:grid md:grid-cols-2 md:gap-12 items-center">
            {/* LEFT on desktop — Calculator */}
            <div className="w-full order-1 md:order-2">
              <Calculator />
            </div>

            {/* RIGHT on desktop — Hero text */}
            <div className="text-center md:text-start order-2 md:order-1 mt-8 md:mt-0">
              {/* Breadcrumb */}
              <nav aria-label="مسار التنقل" className="mb-4">
                <ol className="flex items-center gap-1.5 text-xs text-slate-400 justify-center md:justify-end">
                  <li>الرئيسية</li>
                  <li aria-hidden="true">›</li>
                  <li className="text-primary font-medium">آلة حاسبة</li>
                </ol>
              </nav>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-5">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                مجاني 100% · بدون تحميل
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4">
                آلة حاسبة
                <br />
                <span className="text-primary">اون لاين</span>
              </h1>

              <p className="text-lg text-slate-600 font-medium mb-3">
                حاسبة مجانية تعمل على جميع الأجهزة
              </p>

              <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                احسب بسرعة ودقة — علمية، بسيطة، أو متطورة
              </p>

              {/* Feature badges */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                {[
                  "✅ علمية ومتقدمة",
                  "✅ تعمل على الجوال",
                  "✅ بدون تسجيل",
                  "✅ بالعربية",
                ].map((feat) => (
                  <span
                    key={feat}
                    className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-lg shadow-sm"
                  >
                    {feat}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 max-w-xs mx-auto md:mx-0">
                {[
                  { value: "+١٠٠ك", label: "مستخدم شهرياً" },
                  { value: "٤.٩★", label: "تقييم المستخدمين" },
                  { value: "مجاني", label: "بدون رسوم" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          SECTION 3 — MOST-USED CALCULATORS
      ─────────────────────────────────────────────────────────────────── */}
      <section id="most-used" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              الآلات الحاسبة الأكثر استخداماً
            </h2>
            <p className="text-slate-500 text-sm">
              اختر نوع الآلة الحاسبة المناسب لك
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mostUsedCalcs.map((card) => (
              <ToolCard key={card.href} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          SECTION 4 — MATH TOOLS
      ─────────────────────────────────────────────────────────────────── */}
      <section id="math-tools" className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              أدوات الرياضيات
            </h2>
            <p className="text-slate-500 text-sm">
              أدوات تفاعلية لحل المسائل الرياضية
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mathTools.map((card) => (
              <ToolCard key={card.href} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          SECTION 5 — SPECIALTY CALCULATORS
      ─────────────────────────────────────────────────────────────────── */}
      <section id="specialty" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              حاسبات متخصصة
            </h2>
            <p className="text-slate-500 text-sm">
              أدوات مخصصة لاحتياجاتك اليومية
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {specialtyCalcs.map((card) => (
              <ToolCard key={card.href} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          SECTION 6 — HOW TO USE
      ─────────────────────────────────────────────────────────────────── */}
      <section id="how-to-use" className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              كيفية استخدام الآلة الحاسبة
            </h2>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {[
              {
                number: "١",
                title: "اختر نوع الحاسبة",
                text: "حدد إذا كنت تحتاج الحاسبة العادية أو العلمية من خلال التبويبات أعلى الشاشة",
              },
              {
                number: "٢",
                title: "أدخل الأرقام",
                text: "اضغط على الأزرار أو استخدم لوحة مفاتيح جهازك لإدخال الأرقام والعمليات الحسابية",
              },
              {
                number: "٣",
                title: "احصل على النتيجة",
                text: "اضغط = للحصول على النتيجة فورًا. يمكنك نسخ النتيجة أو الاستمرار في الحساب",
              },
            ].map((step, i) => (
              <div key={i} className="text-center relative">
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-6 start-1/2 w-full h-px bg-gradient-to-s from-primary/30 to-transparent -z-0" />
                )}
                <div className="relative z-10 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-md shadow-blue-200">
                  {step.number}
                </div>
                <h3 className="text-base font-semibold text-slate-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          {/* SEO paragraph */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <p className="text-sm text-slate-600 leading-loose">
              آلة الحاسبة اون لاين هي أداة رقمية مجانية تتيح لك إجراء
              العمليات الحسابية الأساسية والمتقدمة مباشرة من متصفحك. سواء كنت
              تحتاج حاسبه عادية لجمع الأرقام، أو آلة حاسبة علمية لحساب الجيب
              وجيب التمام والتمام، أو حاسبة متخصصة لتحويل العملات وحساب الحمل
              — ستجد هنا كل ما تحتاجه. تعمل الحاسبة على جميع الأجهزة: الجوال،
              التابلت، والكمبيوتر، بدون تحميل أي تطبيق.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          SECTION 7 — FAQ
      ─────────────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              أسئلة شائعة
            </h2>
            <p className="text-slate-500 text-sm">
              إجابات على أكثر الأسئلة شيوعاً حول الحاسبة
            </p>
          </div>
          <FAQAccordion />
        </div>
      </section>
    </>
  );
}
