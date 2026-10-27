import React from 'react';
import { Shield, Zap, Lock, Coins, Gift, Sliders, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface EditorialCardProps {
  category: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  colSpan?: string;
  onExplore: () => void;
}

const EditorialCard: React.FC<EditorialCardProps> = ({ category, title, description, icon, colSpan = 'lg:col-span-4', onExplore }) => {
  return (
    <div
      onClick={onExplore}
      className={`group relative p-8 sm:p-10 rounded-3xl bg-[#090E1D] hover:bg-[#0E152B] border border-white/[0.07] hover:border-blue-500/30 transition-all duration-300 cursor-pointer flex flex-col justify-between ${colSpan}`}
    >
      <div>
        <div className="flex items-center justify-between mb-8">
          <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-sky-400 uppercase">
            {category}
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white group-hover:bg-blue-600 transition-all">
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3 group-hover:text-sky-300 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
          {description}
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-white/[0.05] flex items-center justify-between text-xs text-slate-500 font-mono">
        <span>Módulo Integrado</span>
        <span className="text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">Acessar no Painel →</span>
      </div>
    </div>
  );
};

export const Features: React.FC = () => {
  const { navigate, user } = useAuth();

  const handleGo = (path: string) => {
    if (user) navigate(path);
    else navigate(`/login?redirect=${encodeURIComponent(path)}`);
  };

  return (
    <section id="recursos" className="relative py-28 bg-[#070B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-sky-400 uppercase block mb-3">
            CAPACIDADES ESSENCIAIS
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-balance">
            Feito para comunidades que querem crescer.
          </h2>
        </div>

        {/* Asymmetric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* MODERAÇÃO (8 cols on lg) */}
          <EditorialCard
            category="MODERAÇÃO"
            title="Ferramentas para manter sua comunidade organizada."
            description="Banimentos temporários, histórico unificado de infrações, filtros regex inteligentes e comandos ágeis com registro automático em canal de auditoria."
            icon={<Shield className="w-5 h-5" />}
            colSpan="lg:col-span-7"
            onExplore={() => handleGo('/servers')}
          />

          {/* AUTOMAÇÃO (5 cols on lg) */}
          <EditorialCard
            category="AUTOMAÇÃO"
            title="Automatize tarefas repetitivas."
            description="Cargos automáticos por reação, canais de voz dinâmicos temporários e mensagens de boas-vindas personalizadas sem código."
            icon={<Zap className="w-5 h-5" />}
            colSpan="lg:col-span-5"
            onExplore={() => handleGo('/servers')}
          />

          {/* SEGURANÇA (5 cols on lg) */}
          <EditorialCard
            category="SEGURANÇA"
            title="Proteja sua comunidade contra abusos."
            description="Muralha anti-raid em tempo real, proteção contra deleção massiva de canais (Anti-Nuke) e quarentena preventiva para novas contas."
            icon={<Lock className="w-5 h-5" />}
            colSpan="lg:col-span-5"
            onExplore={() => handleGo('/servers')}
          />

          {/* ECONOMIA (7 cols on lg) */}
          <EditorialCard
            category="ECONOMIA"
            title="Crie uma economia própria para sua comunidade."
            description="Moeda virtual exclusiva, ranking de membros ativos, loja de itens customizáveis e recompensas automáticas por engajamento no chat."
            icon={<Coins className="w-5 h-5" />}
            colSpan="lg:col-span-7"
            onExplore={() => handleGo('/servers')}
          />

          {/* RECOMPENSAS (6 cols on lg) */}
          <EditorialCard
            category="RECOMPENSAS"
            title="Incentive membros com recompensas diárias."
            description="Sistema diário de moedas e sequências de login que estimulam o retorno frequente de cada participante do seu servidor."
            icon={<Gift className="w-5 h-5" />}
            colSpan="lg:col-span-6"
            onExplore={() => handleGo('/rewards')}
          />

          {/* PERSONALIZAÇÃO (6 cols on lg) */}
          <EditorialCard
            category="PERSONALIZAÇÃO"
            title="Configure o NANO de acordo com sua comunidade."
            description="Prefixo flexível, canais de logs dedicados, nível de rigor do automod e total integração visual com sua marca no Discord."
            icon={<Sliders className="w-5 h-5" />}
            colSpan="lg:col-span-6"
            onExplore={() => handleGo('/settings')}
          />
        </div>
      </div>
    </section>
  );
};
