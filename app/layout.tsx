import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "آلة حاسبة اون لاين | حاسبة علمية مجانية",
  description:
    "استخدم آلة حاسبة اون لاين مجانًا. حاسبة علمية متطورة تعمل على الجوال والكمبيوتر بدون تحميل. حاسبة كاسيو، حاسبة العملات، وأكثر. ابدأ الآن ←",
  keywords: [
    "آلة حاسبة",
    "حاسبه",
    "حاسبة",
    "الحاسبة",
    "حاسبة علمية",
    "حاسبة اون لاين",
    "الة حاسبة",
    "حاسبه اله",
    "احسب",
    "حاسب الي",
  ],
  openGraph: {
    title: "آلة حاسبة اون لاين مجانية",
    description:
      "استخدم آلة حاسبة اون لاين مجانًا. حاسبة علمية متطورة تعمل على الجوال والكمبيوتر بدون تحميل. حاسبة كاسيو، حاسبة العملات، وأكثر. ابدأ الآن ←",
    locale: "ar_SA",
    type: "website",
  },
  alternates: {
    languages: {
      ar: "/",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "آلة حاسبة اون لاين",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    inLanguage: "ar",
    description: "آلة حاسبة علمية مجانية اون لاين",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: "https://yourdomain.com/",
      },
    ],
  };

  return (
    <html lang="ar" dir="rtl" className={cairo.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className="bg-background text-text-primary antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
