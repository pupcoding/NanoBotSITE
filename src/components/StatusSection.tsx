import React, { useEffect, useState } from 'react';
import { CheckCircle2, ArrowRight, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { StatusData } from '../types';

export const StatusSection: React.FC = () => {
  const { navigate } = useAuth();
  const [status, setStatus] = useState<StatusData | null>(null);

  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch((err) => console.error('Error fetching status:', err));
  }, []);

  const components = status?.components || [
    { name: 'NANO Bot', status: 'operacional', uptime: '99.99%', description: 'Clusters de gateway e despacho de comandos Discord' },
    { name: 'API Principal', status: 'operacional', uptime: '99.98%', description: 'Rotas REST e sincronização em tempo real' },
    { name: 'Dashboard Web', status: 'operacional', uptime: '100%', description: 'Painel administrativo e autenticação OAuth2' },
    { name: 'Sistema de Recompensas', status: 'operacional', uptime: '99.97%', description: 'Cálculo de sequências e carteira de moedas' },
  ];

  return (
    <section className="relative py-20 bg-[#070B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-10 bg-[#0B132B]/60 border border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Todos os sistemas operacionais
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Status do NANO
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-slate-400">Disponibilidade Geral</div>
                <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
                  {status?.uptimePercentage ?? 99.98}%
                </div>
              </div>
              <button
                onClick={() => navigate('/status')}
                className="px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Ver histórico completo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 4 Monitors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {components.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white">{item.name}</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Operacional
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Uptime</span>
                  <span className="text-sky-300 font-semibold">{item.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
