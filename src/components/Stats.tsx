const stats = [
  { number: "200.154", label: "Exames & Pacientes", sublabel: "Atendidos em 2024" },
  { number: "1.381", label: "Visitas Domiciliares", sublabel: "Realizadas por Mês" },
  { number: "5+", label: "Unidades Especializadas", sublabel: "Em Macapá e Santana" },
  { number: "98%", label: "Taxa de Satisfação", sublabel: "Dos Clientes" },
];

export default function Stats() {
  return (
    <section className="bg-navy-900 py-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center lg:border-r lg:last:border-r-0 border-navy-700 py-4">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <p className="text-white font-medium">{stat.label}</p>
              <p className="text-navy-300 text-sm">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
