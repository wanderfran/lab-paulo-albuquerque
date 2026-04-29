'use client';

import { useState, FormEvent } from 'react';
import { saveLead } from '@/lib/analytics';

export default function LeadForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [options, setOptions] = useState({
    antes8h: false,
    cadeirante: false,
    sabados: false,
    domiciliar: false,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    saveLead(formData);
    setIsSubmitted(true);

    setTimeout(() => {
      setFormData({ name: '', phone: '', email: '', message: '' });
      setIsSubmitted(false);
    }, 5000);
  };

  const toggleOption = (key: keyof typeof options) => {
    setOptions({ ...options, [key]: !options[key] });
  };

  return (
    <section id="contato" className="relative">
      <div className="grid lg:grid-cols-2">
        {/* Form Side - Navy Background */}
        <div className="bg-navy-900 py-20 px-5 sm:px-8 lg:px-16">
          <div className="max-w-lg mx-auto lg:ml-auto lg:mr-0">
            <p className="text-blue-400 font-semibold mb-4">Sua Saúde e Segurança São Importantes Para Nós</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Encontre o Laboratório Mais Próximo e Agende Seu Exame
            </h2>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm mb-2">Exame</label>
                    <select className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none cursor-pointer">
                      <option>Exames Gerais</option>
                      <option>Exames Genéticos</option>
                      <option>Anatomia Patológica</option>
                      <option>Coleta Domiciliar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-2">Unidade</label>
                    <select className="w-full px-4 py-3 bg-navy-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border border-navy-700 appearance-none cursor-pointer">
                      <option>Matriz - Centro</option>
                      <option>C.M.E - Santa Rita</option>
                      <option>Zona Norte</option>
                      <option>Santana</option>
                      <option>Patologia</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm mb-2">Nome <span className="text-blue-400">*</span></label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-navy-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border border-navy-700 placeholder-white/50"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-2">E-mail</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-navy-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border border-navy-700 placeholder-white/50"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white text-sm mb-2">Telefone <span className="text-blue-400">*</span></label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-navy-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border border-navy-700 placeholder-white/50"
                      placeholder="(96) 99999-9999"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-2">Data</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-navy-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border border-navy-700"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-2">Horário</label>
                    <select className="w-full px-4 py-3 bg-navy-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border border-navy-700 appearance-none cursor-pointer">
                      <option>Selecionar</option>
                      <option>06:30 - 08:00</option>
                      <option>08:00 - 10:00</option>
                      <option>10:00 - 12:00</option>
                      <option>14:00 - 16:00</option>
                      <option>16:00 - 19:00</option>
                    </select>
                  </div>
                </div>

                {/* Options - Simple Checkboxes */}
                <div className="pt-2">
                  <p className="text-white/60 text-xs mb-2">Necessidades especiais (opcional)</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => toggleOption('antes8h')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        options.antes8h
                          ? 'bg-blue-500 text-white'
                          : 'bg-navy-800 text-white/70 hover:bg-navy-700'
                      }`}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Antes das 8h
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleOption('sabados')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        options.sabados
                          ? 'bg-blue-500 text-white'
                          : 'bg-navy-800 text-white/70 hover:bg-navy-700'
                      }`}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      Sábado
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleOption('domiciliar')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        options.domiciliar
                          ? 'bg-blue-500 text-white'
                          : 'bg-navy-800 text-white/70 hover:bg-navy-700'
                      }`}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                      </svg>
                      Domiciliar
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleOption('cadeirante')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        options.cadeirante
                          ? 'bg-blue-500 text-white'
                          : 'bg-navy-800 text-white/70 hover:bg-navy-700'
                      }`}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 4a2 2 0 11-4 0 2 2 0 014 0zM14 12h4l1 8h-6m-4-4H5l-1 4h6m0-8v4"/>
                      </svg>
                      Acessível
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-bold text-lg transition-all hover:shadow-lg flex items-center justify-center gap-2 mt-6"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                  Agendar Minha Visita
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Recebemos seu contato!</h3>
                <p className="text-white/80">Nossa equipe entrará em contato em breve pelo WhatsApp.</p>
              </div>
            )}
          </div>
        </div>

        {/* Image Side */}
        <div className="relative hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80"
            alt="Profissional de laboratório"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-navy-900/20" />

          {/* Info Cards */}
          <div className="absolute bottom-8 right-8 space-y-4 max-w-sm">
            <div className="bg-white rounded-xl p-5 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-navy-900">Cuidado Centrado no Paciente</h4>
                  <p className="text-sm text-gray-600">Trabalhamos dia e noite para resolver problemas e ajudar aqueles que buscam respostas!</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-navy-900">Melhoria de Qualidade</h4>
                  <p className="text-sm text-gray-600">Nossa equipe processa mais de 3 milhões de pacientes todo mês!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
