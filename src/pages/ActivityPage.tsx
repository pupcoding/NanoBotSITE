import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { Gift, Shield, Server, Sliders, Clock, Activity as ActivityIcon } from 'lucide-react';

export const ActivityPage: React.FC = () => {
  const { activities } = useAuth();

  const getIcon = (type: string) => {
    switch (type) {
      case 'gift':
        return <Gift className="w-4 h-4 text-pink-400" />;
      case 'shield':
        return <Shield className="w-4 h-4 text-emerald-400" />;
      case 'server':
        return <Server className="w-4 h-4 text-sky-400" />;
      case 'sliders':
      default:
        return <Sliders className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <DashboardLayout activeTab="activity" pageTitle="Atividade">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-sky-400 uppercase">
              AUDIT LOG & EVENTOS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Linha do Tempo
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Registro imutável de comandos, recompensas coletadas, servidores conectados e alterações administrativas.
          </p>
        </div>

        {/* Modern Timeline Container */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#080D1A] border border-white/[0.07] relative">
          <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-white/[0.08]">
            {activities.map((act) => (
              <div key={act.id} className="relative flex items-start gap-5 group">
                {/* Timeline node icon */}
                <div className="relative z-10 w-10 h-10 rounded-xl bg-[#0B132B] border border-white/10 flex items-center justify-center shrink-0 shadow-lg group-hover:border-sky-500/40 transition-colors">
                  {getIcon(act.iconType)}
                </div>

                {/* Event Content */}
                <div className="flex-1 p-5 rounded-2xl bg-[#050811] border border-white/[0.05] group-hover:border-white/[0.1] transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <span className="text-xs font-mono font-bold tracking-widest text-sky-400 uppercase">
                      {act.timeAgo}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {act.timestamp}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">
                    {act.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-mono">
                    {act.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {activities.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-500 font-mono">
              Nenhuma atividade registrada até o momento.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
