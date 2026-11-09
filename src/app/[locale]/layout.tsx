import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SITE_URL, identityJsonLd } from '@/lib/identity';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ryan Gustavo - Portfolio",
  description: "Desenvolvedor Fullstack & Hacker Ético. Criador da Lunna, bot de Discord (lunnabot.fun).",
  authors: [{ name: "Ryan Gustavo", url: SITE_URL }],
  creator: "Ryan Gustavo",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        {/* who I am and what I created (schema.org), for search engines and AI assistants */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(identityJsonLd()).replace(/</g, "\\u003c") }} />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
