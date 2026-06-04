import Link from "next/link";

const quickLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "آلة حاسبة علمية", href: "/الة-حاسبة/علمية/" },
  { label: "حاسبة العملات", href: "/حاسبات-متخصصة/حاسبة-العملات/" },
  { label: "الدائرة المثلثية", href: "/ادوات-رياضيات/دائرة-مثلثية/" },
  { label: "حاسبة الحمل", href: "/حاسبات-متخصصة/حاسبة-الحمل/" },
  { label: "جدول الضرب", href: "/ادوات-رياضيات/جدول-ضرب/" },
];

const aboutLinks = [
  { label: "عن الموقع", href: "/عن-الموقع/" },
  { label: "سياسة الخصوصية", href: "/سياسة-الخصوصية/" },
  { label: "اتصل بنا", href: "/اتصل-بنا/" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 — Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-base">
                ح
              </span>
              <span className="text-xl font-bold">حاسبة</span>
            </div>
            <p className="text-blue-400 font-semibold text-sm mb-3">
              آلة حاسبة اون لاين مجانية
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              أفضل حاسبة عربية على الإنترنت — علمية، بسيطة، ومتخصصة
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="px-3 py-1.5 bg-gray-800 rounded-lg text-xs text-gray-400 border border-gray-700">
                🇸🇦 السعودية
              </div>
              <div className="px-3 py-1.5 bg-gray-800 rounded-lg text-xs text-gray-400 border border-gray-700">
                🇪🇬 مصر
              </div>
              <div className="px-3 py-1.5 bg-gray-800 rounded-lg text-xs text-gray-400 border border-gray-700">
                🇦🇪 الإمارات
              </div>
            </div>
          </div>

          {/* Column 2 — Quick links */}
          <div>
            <h3 className="text-base font-semibold mb-5 text-white">
              روابط سريعة
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-600 group-hover:bg-blue-400 rounded-full transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — About */}
          <div>
            <h3 className="text-base font-semibold mb-5 text-white">
              عن الموقع
            </h3>
            <ul className="space-y-2.5 mb-6">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-600 group-hover:bg-blue-400 rounded-full transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
              <p className="text-xs text-gray-400 leading-relaxed">
                آلة الحاسبة تعمل على جميع المتصفحات والأجهزة بدون تحميل أي
                تطبيق.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            © 2026 حاسبة. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <Link
              href="/سياسة-الخصوصية/"
              className="hover:text-gray-400 transition-colors"
            >
              سياسة الخصوصية
            </Link>
            <span>·</span>
            <Link
              href="/اتصل-بنا/"
              className="hover:text-gray-400 transition-colors"
            >
              اتصل بنا
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
