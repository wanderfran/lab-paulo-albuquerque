'use client';

import { useState, useEffect } from 'react';

const galleryImages = [
  { src: '/gallery/lab-1.jpeg', alt: 'Fachada do Laboratório' },
  { src: '/gallery/lab-2.jpeg', alt: 'Equipe do Laboratório' },
  { src: '/gallery/lab-3.jpeg', alt: 'Atendimento ao paciente' },
  { src: '/gallery/lab-4.jpeg', alt: 'Equipamentos modernos' },
  { src: '/gallery/lab-5.jpeg', alt: 'Área de coleta' },
  { src: '/gallery/lab-6.jpeg', alt: 'Estrutura do laboratório' },
];

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="sobre" className="relative">
      <div className="grid lg:grid-cols-2 items-stretch">
        {/* Image Carousel Side */}
        <div className="relative min-h-[400px] lg:min-h-[500px] overflow-hidden">
          {galleryImages.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          {/* Experience Badge */}
          <div className="absolute bottom-8 right-8 bg-blue-500 text-white rounded-2xl p-6 shadow-xl z-10">
            <div className="text-center">
              <span className="text-4xl font-bold block">19+</span>
              <span className="text-sm font-medium">Anos de<br/>Experiência</span>
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="absolute bottom-8 left-8 flex gap-2 z-10">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-blue-500 w-6'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content Side */}
        <div className="bg-white py-12 px-6 sm:px-10 lg:px-16 flex items-center">
          <div className="max-w-lg">
            <p className="text-blue-500 font-semibold mb-4">Fornecendo Exames de Alta Qualidade Para Sua Saúde!</p>

            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6 leading-tight">
              Ajudando a Entregar Respostas Para Questões de Saúde.
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Agendamentos podem ser feitos para ajudar a reduzir seu tempo de espera. Se você não conseguir agendar, fazemos nosso melhor para minimizar sua espera, mas a duração dependerá do número de pacientes no Centro de Atendimento.
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Para proporcionar um ambiente confortável e seguro para nossos pacientes e colaboradores, evite usar perfumes fortes ou cremes ao visitar nossos Centros de Atendimento.
            </p>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 border border-blue-100">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-navy-900 mb-1">Diagnósticos de Classe Mundial</h3>
                  <p className="text-gray-600 text-sm">Desenvolvemos algumas das capacidades de testes mais avançadas do mundo para ajudar a melhorar a saúde e as vidas.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 border border-blue-100">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-navy-900 mb-1">Líder em Prevenção do Câncer</h3>
                  <p className="text-gray-600 text-sm">Com o suporte de nossas capacidades de diagnóstico para entregar exames precisos e confiáveis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
