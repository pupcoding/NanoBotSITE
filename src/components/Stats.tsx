import React from 'react';

interface StatItem {
  value: string;
  label: string;
  sublabel: string;
}

const statsData: StatItem[] = [
  {
    value: '10K+',
    label: 'Comunidades',
    sublabel: 'Servidores ativos em escala',
  },
  {
    value: '50K+',
    label: 'Usuários',
    sublabel: 'Membros atendidos diariamente',
  },
  {
    value: '99.9%',
    label: 'Disponibilidade',
    sublabel: 'Uptime auditado em tempo real',
  },
  {
    value: '24/7',
    label: 'Operação',
    sublabel: 'Proteção e respostas contínuas',
  },
];

export const Stats: React.FC = () => {
  return (
    <section className="relative py-20 border-y border-white/[0.06] bg-[#050811]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {statsData.map((item, idx) => (
            <div key={idx} className="flex flex-col group">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-mono tabular-nums mb-2 group-hover:text-sky-300 transition-colors">
                {item.value}
              </div>
              <div className="text-sm font-bold tracking-wider uppercase text-sky-400 mb-1">
                {item.label}
              </div>
              <div className="text-xs text-slate-400 font-mono">
                {item.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
