'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function TrabalheConoscoPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    area: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you could save to localStorage or send to an API
    setIsSubmitted(true);
  };

  const areas = [
    'Biomedicina',
    'Enfermagem',
    'Técnico de Laboratório',
    'Recepção',
    'Administrativo',
    'TI',
    'Recursos Humanos',
    'Outro',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Lab Dr. Paulo Albuquerque" className="h-12" />
            </Link>
            <Link
              href="/"
              className="text-white/80 hover:text-white font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar ao Site
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-navy-900 text-white pb-20 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-400 font-semibold mb-2">Faça parte da nossa equipe</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Trabalhe Conosco</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Estamos sempre em busca de profissionais dedicados e apaixonados pela área da saúde.
            Junte-se a nós e faça a diferença na vida de milhares de pacientes.
          </p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Benefits */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-navy-900 mb-6">Por que trabalhar conosco?</h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900">Salário Competitivo</h3>
                    <p className="text-sm text-gray-600">Remuneração compatível com o mercado</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900">Plano de Saúde</h3>
                    <p className="text-sm text-gray-600">Benefícios para você e sua família</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900">Desenvolvimento</h3>
                    <p className="text-sm text-gray-600">Treinamentos e capacitações constantes</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900">Ambiente Acolhedor</h3>
                    <p className="text-sm text-gray-600">Equipe unida e colaborativa</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900">19 Anos de Mercado</h3>
                    <p className="text-sm text-gray-600">Empresa sólida e reconhecida</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-navy-900 rounded-2xl p-6 text-white">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-400">5</p>
                  <p className="text-sm text-white/70">Unidades</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-400">50+</p>
                  <p className="text-sm text-white/70">Colaboradores</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-400">19</p>
                  <p className="text-sm text-white/70">Anos</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-400">PNCQ</p>
                  <p className="text-sm text-white/70">Certificado</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {!isSubmitted ? (
                <>
                  <h2 className="text-2xl font-bold text-navy-900 mb-2">Envie seu currículo</h2>
                  <p className="text-gray-600 mb-6">Preencha o formulário abaixo e entraremos em contato.</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-navy-900 font-medium mb-2">Nome completo *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-navy-900 font-medium mb-2">E-mail *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="seu@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-navy-900 font-medium mb-2">Telefone *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="(96) 99999-9999"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-navy-900 font-medium mb-2">Área de interesse *</label>
                      <select
                        required
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Selecione uma área</option>
                        {areas.map((area) => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-navy-900 font-medium mb-2">Mensagem</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Conte-nos um pouco sobre você e sua experiência..."
                      />
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
                      <p className="font-medium mb-1">Envie seu currículo por e-mail:</p>
                      <a href="mailto:rh@labpauloalbuquerque.com.br" className="text-blue-600 hover:underline">
                        rh@labpauloalbuquerque.com.br
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-bold text-lg transition-all"
                    >
                      Enviar Candidatura
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-navy-900 mb-2">Candidatura Enviada!</h3>
                  <p className="text-gray-600 mb-6">
                    Obrigado pelo interesse! Nossa equipe de RH analisará seu perfil e entrará em contato em breve.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Voltar ao site
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
