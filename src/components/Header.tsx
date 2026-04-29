'use client';

import { useState } from 'react';
import Link from 'next/link';
import ResultadosModal from './ResultadosModal';
import AgendamentoModal from './AgendamentoModal';
import { asset } from '@/lib/path';

const menuItems = [
  { label: 'Início', href: '/', active: true },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Exames', href: '#servicos' },
  { label: 'Unidades', href: '#unidades' },
  { label: 'Convênios', href: '#convenios' },
  { label: 'Blog', href: '/blog' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resultadosModalOpen, setResultadosModalOpen] = useState(false);
  const [agendamentoModalOpen, setAgendamentoModalOpen] = useState(false);

  return (
    <>
      {/* Top Bar - Navy */}
      <div className="bg-navy-900 text-white text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-y-1 py-2 sm:py-2.5">
            {/* Left Info — sempre visível */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-x-6">
              <a href="tel:+559632254288" className="flex items-center gap-1.5 sm:gap-2 hover:text-blue-400 transition-colors">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium">Central:</span> (96) 3225-4288
              </a>

              <div className="hidden md:flex items-center gap-1.5 sm:gap-2">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Macapá - AP</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-pulse shrink-0" />
                <span>Seg - Sáb: 6:30 às 19h</span>
              </div>
            </div>

            {/* Right Links */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#convenios" className="hover:text-blue-400 transition-colors">Convênios</a>
              <button
                onClick={() => setResultadosModalOpen(true)}
                className="hover:text-blue-400 transition-colors"
              >
                Resultados
              </button>
              <Link href="/admin" className="hover:text-blue-400 transition-colors">Área Admin</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar - White */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img
                src={asset("/logo.png")}
                alt="Laboratório Médico Dr. Paulo J. Albuquerque"
                className="h-14 md:h-16 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-2 font-medium transition-colors ${
                    item.active
                      ? 'text-blue-500'
                      : 'text-navy-900 hover:text-blue-500'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setResultadosModalOpen(true)}
                className="hidden md:flex items-center gap-2 text-blue-500 hover:bg-blue-50 border-2 border-blue-500 px-5 py-2.5 rounded-lg font-semibold transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resultados
              </button>

              <button
                onClick={() => setAgendamentoModalOpen(true)}
                className="hidden sm:flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Agendar Exame
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-navy-900 hover:text-blue-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 py-4">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                      item.active
                        ? 'text-blue-500 bg-blue-50'
                        : 'text-navy-900 hover:text-blue-500 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setResultadosModalOpen(true);
                  }}
                  className="block w-full text-left px-4 py-3 rounded-lg font-medium text-navy-900 hover:text-blue-500 hover:bg-gray-50 transition-colors"
                >
                  Resultados
                </button>
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-100 px-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAgendamentoModalOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold transition-all w-full"
                >
                  Agendar Exame
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Resultados Modal */}
      <ResultadosModal
        isOpen={resultadosModalOpen}
        onClose={() => setResultadosModalOpen(false)}
      />

      {/* Agendamento Modal */}
      <AgendamentoModal
        isOpen={agendamentoModalOpen}
        onClose={() => setAgendamentoModalOpen(false)}
      />
    </>
  );
}
