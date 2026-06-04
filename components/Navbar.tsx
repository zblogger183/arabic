"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "آلة حاسبة علمية", href: "/الة-حاسبة/علمية/" },
  { label: "حاسبة العملات", href: "/حاسبات-متخصصة/حاسبة-العملات/" },
  { label: "الدائرة المثلثية", href: "/ادوات-رياضيات/دائرة-مثلثية/" },
  { label: "أدوات رياضيات", href: "/ادوات-رياضيات/" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-white border-b border-slate-200 transition-all duration-300 ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo — right side in RTL */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-primary hover:opacity-80 transition-opacity"
        >
          <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">
            ح
          </span>
          <span className="text-[#1E293B]">حاسبة</span>
        </Link>

        {/* Desktop nav links — left side in RTL */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-primary hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/الة-حاسبة/علمية/"
            className="ms-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
          >
            ابدأ الحساب ←
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="فتح القائمة"
          aria-expanded={mobileOpen}
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`block h-0.5 bg-slate-700 rounded transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-slate-700 rounded transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-slate-700 rounded transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden bg-white border-t border-slate-100 overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-sm font-medium text-slate-700 hover:text-primary hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/الة-حاسبة/علمية/"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-4 py-3 bg-primary text-white text-sm font-semibold rounded-lg text-center hover:bg-blue-700 transition-colors"
          >
            ابدأ الحساب ←
          </Link>
        </div>
      </div>
    </header>
  );
}
