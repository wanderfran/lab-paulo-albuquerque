'use client';

const convenios = [
  { name: 'Unimed', color: 'text-green-600' },
  { name: 'Bradesco Saúde', color: 'text-red-600' },
  { name: 'Amil', color: 'text-blue-600' },
  { name: 'SulAmérica', color: 'text-orange-500' },
  { name: 'Hapvida', color: 'text-orange-600' },
  { name: 'NotreDame', color: 'text-teal-600' },
  { name: 'Porto Seguro', color: 'text-blue-700' },
  { name: 'Prevent Senior', color: 'text-green-700' },
];

export default function Convenios() {
  return (
    <section id="convenios" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-blue-500 font-semibold mb-4">Aceitamos os Principais Convênios</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Convênios e Planos de Saúde
          </h2>
          <p className="text-gray-600 text-lg">
            Trabalhamos com os principais planos de saúde do Brasil. Consulte a disponibilidade para o seu convênio.
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {convenios.map((convenio, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 flex items-center justify-center h-20 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all"
            >
              <span className={`font-bold text-base ${convenio.color}`}>{convenio.name}</span>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-navy-900 mb-4">
                Não encontrou seu convênio?
              </h3>
              <p className="text-gray-600 mb-6">
                Trabalhamos com diversos outros convênios e planos de saúde. Entre em contato conosco para verificar se aceitamos o seu plano ou para saber mais sobre atendimento particular.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/5596981055224?text=Olá! Gostaria de saber se vocês aceitam meu convênio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Consultar Convênio
                </a>
                <a
                  href="tel:+559632254288"
                  className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  Ligar Agora
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <p className="text-3xl font-bold text-navy-900">50+</p>
                <p className="text-sm text-gray-600">Convênios Aceitos</p>
              </div>
              <div className="bg-navy-50 rounded-xl p-6 text-center">
                <p className="text-3xl font-bold text-navy-900">100%</p>
                <p className="text-sm text-gray-600">Cobertura Amapá</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <p className="text-3xl font-bold text-navy-900">24h</p>
                <p className="text-sm text-gray-600">Autorização Rápida</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-6 text-center">
                <p className="text-3xl font-bold text-navy-900">0</p>
                <p className="text-sm text-gray-600">Burocracia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
