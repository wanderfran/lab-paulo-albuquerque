const units = [
  {
    name: "Matriz",
    subtitle: "Centro",
    address: "R. Leopoldo Machado, 1808 - Trem",
    city: "Macapá - AP, 68900-067",
    phone: "(96) 3225-4288",
    phone2: "(96) 3131-1215",
    hours: "6:30 às 19h",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
    whatsapp: "5596932254288"
  },
  {
    name: "C.M.E",
    subtitle: "Santa Rita",
    address: "Rua Dr. Marcelo Cândia, 884 - 3º andar",
    city: "Macapá - AP, 68901-341",
    phone: "(96) 98105-5224",
    hours: "6:30 às 19h",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80",
    whatsapp: "5596981055224"
  },
  {
    name: "Zona Norte",
    subtitle: "Jardim Felicidade",
    address: "Rua Vereador Júlio Maria Pinto Pereira, 750",
    city: "Macapá - AP, 68909-000",
    phone: "(96) 99902-5946",
    hours: "6:30 às 19h",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80",
    whatsapp: "5596999025946"
  },
  {
    name: "Santana",
    subtitle: "Nova Brasília",
    address: "R. Gen. Ubaldo Figueira, 1323",
    city: "Santana - AP, 68925-000",
    phone: "(96) 99165-3528",
    hours: "6:30 às 19h",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    whatsapp: "5596991653528"
  },
  {
    name: "Patologia",
    subtitle: "Hospital São Camilo",
    address: "Rua Almirante Barroso, 1198 - Santa Rita",
    city: "Macapá - São Camilo",
    phone: "(96) 3312-2438",
    hours: "6:30 às 19h",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
    whatsapp: "5596933122438"
  },
];

export default function Units() {
  return (
    <section id="unidades" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-blue-500 font-semibold mb-4">Ajudando a Entregar Respostas Para Questões de Saúde!</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900">
            Compromisso Fixo com a Excelência e Qualidade dos Nossos Resultados.
          </h2>
        </div>

        {/* Units Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group border border-gray-100">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={unit.image}
                  alt={unit.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">{unit.name}</h3>
                  <p className="text-blue-300 text-sm font-medium">{unit.subtitle}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Address */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-navy-900 font-medium text-sm">{unit.address}</p>
                    <p className="text-gray-500 text-sm">{unit.city}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-navy-50 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-navy-900 font-medium text-sm">{unit.phone}</p>
                    {unit.phone2 && <p className="text-gray-500 text-sm">{unit.phone2}</p>}
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Funcionamento</p>
                    <p className="text-navy-900 font-medium text-sm">{unit.hours}</p>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={`https://wa.me/${unit.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                  Agendar nesta unidade
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
