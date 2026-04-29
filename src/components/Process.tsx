const steps = [
  {
    number: "1",
    title: "Encontre a Unidade Mais Próxima",
    description: "Encontre a unidade mais perto de você através da nossa página de contato ou ligue para nós.",
    link: "#unidades",
    linkText: "Ver Unidades",
  },
  {
    number: "2",
    title: "Faça Seu Agendamento Online",
    description: "Você pode agendar online ou entrar em contato para que enviemos um de nossos especialistas.",
    link: "https://wa.me/5596981055224",
    linkText: "Agendar Visita",
  },
  {
    number: "3",
    title: "Colete a Amostra e Envie",
    description: "Amostras podem ser coletadas no consultório, laboratório ou o paciente pode coletar em casa.",
    link: "#servicos",
    linkText: "Kits de Coleta",
  },
  {
    number: "4",
    title: "Visite Nosso Centro de Atendimento",
    description: "Comprometidos em tratar pessoas com respeito e de maneiras que as ajudem a manter sua dignidade.",
    link: "#unidades",
    linkText: "Central de Atendimento",
  },
];

export default function Process() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-500 to-blue-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-white rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-white">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
            </svg>
            <span className="font-medium">Melhorias com Automação</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
            </svg>
            <span className="font-medium">Novos Instrumentos Avançados</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
            </svg>
            <span className="font-medium">Práticas de Qualidade Rigorosas</span>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white text-navy-900 rounded-2xl p-6 transition-all duration-300 hover:bg-navy-900 hover:text-white hover:shadow-2xl hover:-translate-y-2 group cursor-pointer"
            >
              {/* Step Number */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-navy-100 text-navy-900 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  {step.number}
                </div>
                <svg className="w-6 h-6 text-navy-300 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold mb-3">{step.title}</h3>
              <p className="text-sm mb-6 leading-relaxed text-gray-600 group-hover:text-navy-200 transition-colors">
                {step.description}
              </p>

              {/* Link */}
              <a
                href={step.link}
                target={step.link.startsWith('http') ? '_blank' : undefined}
                rel={step.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:text-blue-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
                {step.linkText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
