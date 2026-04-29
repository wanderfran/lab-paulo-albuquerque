'use client';

import { useState, useMemo, type ReactNode } from 'react';

const categoryIcons: Record<string, ReactNode> = {
  analises: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
    </svg>
  ),
  hormonais: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
    </svg>
  ),
  cardiaco: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
    </svg>
  ),
  paternidade: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
    </svg>
  ),
  patologia: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
    </svg>
  ),
  cancer: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
    </svg>
  ),
  microbiologia: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
    </svg>
  ),
  imunologia: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
    </svg>
  ),
};

const categories = [
  {
    id: 'analises',
    name: 'Análises Clínicas',
    description: 'Exames laboratoriais completos para avaliação geral da sua saúde',
    exams: [
      'Hemograma Completo',
      'Glicemia de Jejum',
      'Colesterol Total e Frações',
      'Triglicerídeos',
      'Ureia e Creatinina',
      'Ácido Úrico',
      'TGO e TGP',
      'Urina Tipo I (EAS)',
      'Parasitológico de Fezes',
      'Vitamina D',
      'Vitamina B12',
      'Ferritina',
    ],
  },
  {
    id: 'hormonais',
    name: 'Dosagens Hormonais',
    description: 'Avaliação completa do funcionamento hormonal do organismo',
    exams: [
      'TSH',
      'T3 e T4 Livre',
      'Testosterona Total e Livre',
      'Estradiol',
      'Progesterona',
      'FSH e LH',
      'Prolactina',
      'Cortisol',
      'Insulina',
      'DHEA',
      'GH - Hormônio do Crescimento',
      'PTH - Paratormônio',
    ],
  },
  {
    id: 'cardiaco',
    name: 'Painel Cardíaco',
    description: 'Marcadores para avaliação da saúde cardiovascular',
    exams: [
      'Troponina',
      'CK-MB',
      'BNP / NT-proBNP',
      'PCR Ultrassensível',
      'Homocisteína',
      'Lipoproteína (a)',
      'Apolipoproteína A e B',
      'D-Dímero',
      'Fibrinogênio',
      'Perfil Lipídico Completo',
    ],
  },
  {
    id: 'paternidade',
    name: 'Teste de Paternidade',
    description: 'Exame de DNA com alta precisão e sigilo total',
    exams: [
      'Teste de Paternidade Duo',
      'Teste de Paternidade Trio',
      'Teste de Paternidade Judicial',
      'Teste de Maternidade',
      'Teste de Irmandade',
      'Teste Avuncular (Tio/Sobrinho)',
      'Teste de Ancestralidade',
      'Perfil Genético Individual',
    ],
  },
  {
    id: 'patologia',
    name: 'Anatomia Patológica',
    description: 'Análise microscópica de tecidos para diagnóstico preciso',
    exams: [
      'Biópsia de Pele',
      'Biópsia de Mama',
      'Biópsia Gástrica',
      'Biópsia de Próstata',
      'Biópsia de Tireoide',
      'Citologia Oncótica (Papanicolau)',
      'Imunohistoquímica',
      'Anatomopatológico de Peças Cirúrgicas',
    ],
  },
  {
    id: 'cancer',
    name: 'Prevenção do Câncer',
    description: 'Marcadores tumorais para detecção precoce',
    exams: [
      'PSA Total e Livre',
      'CA 125 (Ovário)',
      'CA 15-3 (Mama)',
      'CA 19-9 (Pâncreas)',
      'CEA (Colorretal)',
      'AFP (Fígado)',
      'Beta-HCG',
      'Calcitonina',
      'Enolase Neurônio-Específica',
    ],
  },
  {
    id: 'microbiologia',
    name: 'Microbiologia',
    description: 'Identificação de bactérias, fungos e parasitas',
    exams: [
      'Urocultura com Antibiograma',
      'Cultura de Secreções',
      'Hemocultura',
      'Cultura de Fezes (Coprocultura)',
      'Cultura de Escarro',
      'Pesquisa de BAAR',
      'Micológico Direto e Cultura',
      'Swab Nasal/Orofaringe',
    ],
  },
  {
    id: 'imunologia',
    name: 'Imunologia e Alergias',
    description: 'Avaliação do sistema imunológico e testes alérgicos',
    exams: [
      'IgE Total',
      'IgE Específico (Painel Alérgenos)',
      'FAN (Fator Antinuclear)',
      'Fator Reumatoide',
      'Anti-CCP',
      'Complemento C3 e C4',
      'Imunoglobulinas (IgA, IgG, IgM)',
      'Anti-HIV 1 e 2',
      'Hepatites A, B e C',
      'VDRL/RPR',
    ],
  },
];

// Get all exams for search
const allExams = categories.flatMap(cat =>
  cat.exams.map(exam => ({ exam, category: cat.name, categoryId: cat.id }))
);

export default function Services() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const active = categories.find(c => c.id === activeCategory) || categories[0];

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allExams.filter(item =>
      item.exam.toLowerCase().includes(query)
    ).slice(0, 8);
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <section id="servicos" className="py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <p className="text-blue-400 font-semibold mb-4 text-lg">Mais de 500 Tipos de Exames Disponíveis</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Exames Laboratoriais Completos
            <br />
            <span className="text-blue-400">Para Toda a Família</span>
          </h2>
          <p className="text-white/80 text-xl">
            Tecnologia de ponta e profissionais qualificados para entregar resultados precisos e confiáveis
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar exame... (ex: hemograma, TSH, glicemia)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 bg-white rounded-2xl text-navy-900 text-lg placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400/50 shadow-xl"
            />
            <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {isSearching && searchResults.length > 0 && (
            <div className="mt-2 bg-white rounded-xl shadow-xl overflow-hidden">
              {searchResults.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveCategory(item.categoryId);
                    setSearchQuery('');
                  }}
                  className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                    <span className="text-navy-900 font-medium">{item.exam}</span>
                  </div>
                  <span className="text-sm text-gray-500">{item.category}</span>
                </button>
              ))}
            </div>
          )}

          {isSearching && searchResults.length === 0 && (
            <div className="mt-2 bg-white rounded-xl shadow-xl p-5 text-center">
              <p className="text-gray-500">Nenhum exame encontrado. Entre em contato conosco!</p>
            </div>
          )}
        </div>

        {/* Card with Tabs + Content */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
          {/* Category Tabs - Horizontal scroll with better visibility */}
          <div className="bg-gray-50 border-b border-gray-200 p-4 sm:p-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    activeCategory === category.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-white text-navy-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <span className={activeCategory === category.id ? 'text-white' : 'text-blue-500'}>
                    {categoryIcons[category.id]}
                  </span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 sm:p-8">
            {/* Category Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 [&>svg]:w-7 [&>svg]:h-7">
                  {categoryIcons[active.id]}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-navy-900">{active.name}</h3>
                  <p className="text-gray-600">{active.description}</p>
                </div>
              </div>
              <div className="bg-blue-500 text-white px-5 py-2 rounded-full font-bold text-sm">
                {active.exams.length}+ exames
              </div>
            </div>

            {/* Exams Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {active.exams.map((exam, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all group"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-200 transition-colors">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span className="text-navy-800 font-medium text-sm">{exam}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/5596981055224?text=Olá! Gostaria de agendar um exame de ${active.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Agendar pelo WhatsApp
              </a>
              <a
                href="#contato"
                className="flex-1 flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white py-4 rounded-xl font-bold transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                Solicitar Agendamento
              </a>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-3 gap-4 mt-8 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-white/10 rounded-xl border border-white/20">
            <p className="text-3xl font-bold text-white">24h</p>
            <p className="text-sm text-white/80">Resultados Rápidos</p>
          </div>
          <div className="text-center p-6 bg-white/10 rounded-xl border border-white/20">
            <p className="text-3xl font-bold text-white">100%</p>
            <p className="text-sm text-white/80">Digital</p>
          </div>
          <div className="text-center p-6 bg-white/10 rounded-xl border border-white/20">
            <p className="text-3xl font-bold text-white">PNCQ</p>
            <p className="text-sm text-white/80">Certificado</p>
          </div>
        </div>
      </div>
    </section>
  );
}
