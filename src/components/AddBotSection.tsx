import React from 'react';
import { ArrowRight, Server, CheckCircle2, Sliders, PlayCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AddBotSectionProps {
  onOpenInviteModal: () => void;
}

export const AddBotSection: React.FC<AddBotSectionProps> = ({ onOpenInviteModal }) => {
  const steps = [
    {
      num: '01',
      title: 'Escolha seu servidor',
      desc: 'Selecione em qual comunidade do Discord você deseja ativar o NANO.',
      icon: <Server className="w-5 h-5 text-sky-400" />,
    },
    {
      num: '02',
      title: 'Autorize o NANO',
      desc: 'Conceda as permissões necessárias na janela oficial do Discord.',
      icon: <CheckCircle2 className="w-5 h-5 text-sky-400" />,
    },
    {
      num: '03',
      title: 'Configure suas funções',
      desc: 'Acesse o dashboard intuitivo e ative moderação, economia e boas-vindas.',
      icon: <Sliders className="w-5 h-5 text-sky-400" />,
    },
    {
      num: '04',
      title: 'Comece a usar',
      desc: 'Sua comunidade já estará protegida, engajada e pronta para interagir.',
      icon: <PlayCircle className="w-5 h-5 text-sky-400" />,
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-transparent via-[#091024] to-transparent border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 lg:p-16 bg-[#0B132B]/80 border border-blue-500/20 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-sky-400 text-xs font-semibold tracking-wider uppercase mb-4">
              Instalação Simplificada
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 text-balance">
              Comece a usar o NANO hoje.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Adicione o NANO ao seu servidor e tenha acesso a ferramentas desenvolvidas para facilitar a administração da sua comunidade.
            </p>

            <div className="mt-8">
              <button
                onClick={onOpenInviteModal}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Adicionar NANO ao Discord</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-800/80">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/25 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="font-mono text-sm font-bold text-slate-500">
                    {step.num}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
