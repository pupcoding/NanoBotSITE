import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CheckCircle2, Clock, RefreshCw } from 'lucide-react';
import { StatusData } from '../types';

export const StatusPage: React.FC = () => {
  const [status, setStatus] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = () => {
    setLoading(true);
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        setStatus(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Status fetch error:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const daysTicks = Array.from({ length: 60 }, (_, i) => ({
    day: i + 1,
    uptime: i === 42 ? 99.8 : 100,
  }));

  const components = status?.components || [
    { name: 'NANO BOT', status: 'operacional', uptime: '99.99%', description: 'Clusters de gateway Discord v10 e despacho de comandos' },
    { name: 'API', status: 'operacional', uptime: '99.98%', description: 'Rotas REST autenticadas e Webhooks em tempo real' },
    { name: 'DASHBOARD', status: 'operacional', uptime: '100%', description: 'Painel administrativo e fluxo Discord OAuth2' },
    { name: 'DATABASE', status: 'operacional', uptime: '99.99%', description: 'Instâncias PostgreSQL com replicação contínua' },
    { name: 'REWARDS', status: 'operacional', uptime: '99.97%', description: 'Motor atômico de cálculo de sequências e carteira' },
  ];

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold tracking-wider uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>TODOS OS SISTEMAS OPERACIONAIS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Status do NANO
            </h1>
            <p className="text-sm text-slate-400 mt-1 font-mono">
              Monitoramento ativo de gateway, infraestrutura distribuída e sharding Discord v10.
            </p>
          </div>

          <button
            onClick={fetchStatus}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase text-slate-300 bg-[#090E1D] border border-white/10 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-sky-400 ${loading ? 'animate-spin' : ''}`} />
            <span>Atualizar</span>
          </button>
        </div>

        {/* Global Uptime KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-[#080D1A] border border-white/[0.07]">
            <span className="text-[11px] text-slate-400 uppercase font-mono tracking-wider block mb-1">
              UPTIME GERAL (90 DIAS)
            </span>
            <div className="text-3xl font-extrabold font-mono text-emerald-400 tabular-nums">
              {status?.uptimePercentage ?? 99.98}%
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#080D1A] border border-white/[0.07]">
            <span className="text-[11px] text-slate-400 uppercase font-mono tracking-wider block mb-1">
              LATÊNCIA DE GATEWAY
            </span>
            <div className="text-3xl font-extrabold font-mono text-sky-400 tabular-nums">
              {status?.responseTimeMs ?? 24}ms
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#080D1A] border border-white/[0.07]">
            <span className="text-[11px] text-slate-400 uppercase font-mono tracking-wider block mb-1">
              INCIDENTES ATIVOS
            </span>
            <div className="text-3xl font-extrabold font-mono text-white tabular-nums">
              0
            </div>
          </div>
        </div>

        {/* 5 Core Components */}
        <div className="space-y-4 mb-12">
          <h2 className="text-sm font-mono font-bold tracking-wider uppercase text-slate-400 mb-2">
            Módulos & Componentes Principais
          </h2>

          {components.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#080D1A] border border-white/[0.07] flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-base font-bold font-mono text-white">{item.name}</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    OPERACIONAL
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {item.description}
                </p>
              </div>

              {/* Uptime visual bar */}
              <div className="w-full md:w-64">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                  <span>90 dias atrás</span>
                  <span className="text-emerald-400 font-bold">{item.uptime}</span>
                  <span>Hoje</span>
                </div>
                <div className="flex gap-1 h-5 items-center">
                  {daysTicks.map((tick) => (
                    <div
                      key={tick.day}
                      title={`Dia ${tick.day}: ${tick.uptime}% uptime`}
                      className={`flex-1 h-4 rounded-xs transition-colors cursor-pointer ${
                        tick.uptime < 100 ? 'bg-amber-400' : 'bg-emerald-500/80 hover:bg-emerald-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Incident History Log */}
        <div className="p-6 rounded-2xl bg-[#080D1A] border border-white/[0.07]">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-400" />
            <span>Histórico Recente de Manutenção</span>
          </h3>

          <div className="p-4 rounded-xl bg-[#050811] border border-white/[0.05] text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-white">Otimização nos Clusters de Sharding</span>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                RESOLVIDO
              </span>
            </div>
            <p className="text-slate-400 font-mono">
              Deploy de balanceamento de carga para a API do Discord v10. Duração: 12 minutos.
            </p>
            <div className="text-[10px] text-slate-500 font-mono mt-2">
              20 de Outubro, 2026 às 04:00 UTC
            </div>
          </div>
        </div>
      </main>

      <Footer onOpenInviteModal={() => {}} />
    </div>
  );
};
