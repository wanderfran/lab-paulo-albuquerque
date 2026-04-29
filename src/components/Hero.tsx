'use client';

import { useState, useEffect, useCallback } from 'react';

const banners = [
  {
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920&q=80",
    title: "Resultados Claros, Confiáveis e Informativos!",
    subtitle: "Utilizamos nossa expertise médica para oferecer os melhores exames, investindo em tecnologia para transformar a entrega de cuidados de saúde.",
  },
  {
    image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=1920&q=80",
    title: "Equipe Especializada ao Seu Dispor",
    subtitle: "Profissionais qualificados e experientes dedicados a cuidar da sua saúde com excelência e humanidade.",
  },
  {
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1920&q=80",
    title: "Pioneiros no Diagnóstico do Câncer",
    subtitle: "Há 19 anos sendo referência no Amapá em prevenção e diagnóstico com histopatológicos em até 24 horas.",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative">
      {/* Banner Slider */}
      <div className="relative aspect-square md:aspect-auto md:h-[85vh] md:min-h-[600px] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/70 to-navy-900/40" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                    {banner.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 leading-relaxed">
                    {banner.subtitle}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-2 sm:gap-4">
                    <a
                      href="https://wa.me/5596981055224"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-1.5 sm:gap-2 bg-white text-navy-900 px-3 sm:px-6 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-100 transition-all group whitespace-nowrap"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 group-hover:translate-x-1 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                      Agendar<span className="hidden sm:inline"> Coleta Domiciliar</span>
                    </a>
                    <a
                      href="#servicos"
                      className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-6 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold transition-all whitespace-nowrap"
                    >
                      Exames e Serviços
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Arrows */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full items-center justify-center text-white transition-all z-20 border border-white/20"
          aria-label="Banner anterior"
          type="button"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full items-center justify-center text-white transition-all z-20 border border-white/20"
          aria-label="Próximo banner"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        {/* Slider Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-blue-400 w-8'
                  : 'bg-white/50 hover:bg-white/80 w-3'
              }`}
              aria-label={`Ir para banner ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
