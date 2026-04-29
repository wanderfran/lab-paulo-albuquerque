import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lab Dr. Paulo Albuquerque | Laboratório de Análises Clínicas em Macapá",
  description: "Laboratório de análises clínicas em Macapá-AP. Há 19 anos cuidando da sua saúde com excelência. Resultados em até 24h. 5 unidades para melhor atender você.",
  keywords: "laboratório, análises clínicas, exames, Macapá, Amapá, Dr. Paulo Albuquerque, PNCQ, hemograma, patologia",
  openGraph: {
    title: "Lab Dr. Paulo Albuquerque",
    description: "Laboratório de análises clínicas em Macapá-AP. Há 19 anos cuidando da sua saúde com excelência.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScroll />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
