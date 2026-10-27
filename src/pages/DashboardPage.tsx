import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { Server, Gift, Flame, TrendingUp, ArrowRight, ShieldCheck, Plus, CheckCircle2, Clock, BarChart2 } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, servers, navigate } = useAuth();
  const [chartView, setChartView] = useState<'weekly' | 'monthly'>('weekly');

  if (!user) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const rewardClaimedToday = user.lastClaimDate === todayStr;

  return (
    <DashboardLayout activeTab="dashboard" pageTitle="Dashboard">
      {/* Editorial Title & Subtitle */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Bem-vindo de volta, {user.username}.
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Veja o que está acontecendo nas suas comunidades.
        </p>
      </div>

      {/* 4 Cards: SERVIDORES (4), RECOMPENSA (Disponível), SEQUÊNCIA (7 dias), ATIVIDADE (+24%) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        {/* SERVIDORES */}
        <div
          onClick={() => navigate('/servers')}
          className="p-5 rounded-2xl bg-[#080D1A] border border-white/[0.07] hover:border-blue-500/30 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
              SERVIDORES
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-sky-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Server className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-mono text-white tabular-nums mb-1">
            4
          </div>
          <div className="text-xs text-sky-400 font-mono">
            {servers.filter((s) => s.isInstalled).length} com NANO ativo
          </div>
        </div>

        {/* RECOMPENSA */}
        <div
          onClick={() => navigate('/rewards')}
          className="p-5 rounded-2xl bg-[#080D1A] border border-white/[0.07] hover:border-pink-500/30 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
              RECOMPENSA
            </span>
            <div className="w-7 h-7 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:bg-pink-600 group-hover:text-white transition-colors">
              <Gift className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
            {rewardClaimedToday ? (
              <span className="text-emerald-400 font-mono text-xl">Resgatada</span>
            ) : (
              <span className="text-amber-400 font-mono text-xl">Disponível</span>
            )}
          </div>
          <div className="text-xs text-slate-400 font-mono">
            {rewardClaimedToday ? '✓ Próxima em 24h' : '+100 moedas prontas'}
          </div>
        </div>

        {/* SEQUÊNCIA */}
        <div
          onClick={() => navigate('/rewards')}
          className="p-5 rounded-2xl bg-[#080D1A] border border-white/[0.07] hover:border-amber-500/30 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
              SEQUÊNCIA
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Flame className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-mono text-white tabular-nums mb-1">
            {user.streak}{' '}
            <span className="text-sm font-normal text-slate-400 font-sans">dias</span>
          </div>
          <div className="text-xs text-amber-400 font-mono">
            Multiplicador +15% ativo
          </div>
        </div>

        {/* ATIVIDADE */}
        <div className="p-5 rounded-2xl bg-[#080D1A] border border-white/[0.07] hover:border-emerald-500/30 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
              ATIVIDADE
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400 tabular-nums mb-1">
            +24%
          </div>
          <div className="text-xs text-slate-400 font-mono">
            vs. semana anterior
          </div>
        </div>
      </div>

      {/* Activity Chart Section (Inspired by Dashdark X reference image) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#080D1A] border border-white/[0.07] mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.05]">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-sky-400" />
              <span>Engajamento & Mensagens Moderadas</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              Volume de comandos executados e intervenções automáticas nas últimas 24h
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setChartView('weekly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-colors cursor-pointer ${
                chartView === 'weekly' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Semanal
            </button>
            <button
              onClick={() => setChartView('monthly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-colors cursor-pointer ${
                chartView === 'monthly' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Mensal
            </button>
          </div>
        </div>

        {/* Visual SVG Chart Representation */}
        <div className="relative h-56 w-full">
          {/* Subtle grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="border-b border-white/20 w-full" />
            <div className="border-b border-white/20 w-full" />
            <div className="border-b border-white/20 w-full" />
            <div className="border-b border-white/20 w-full" />
          </div>

          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 700 200">
            <defs>
              <linearGradient id="gradientActivity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Area fill */}
            <path
              d="M 0,160 Q 100,120 200,140 T 400,60 T 600,40 T 700,20 L 700,200 L 0,200 Z"
              fill="url(#gradientActivity)"
            />

            {/* Line stroke */}
            <path
              d="M 0,160 Q 100,120 200,140 T 400,60 T 600,40 T 700,20"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Data points */}
            <circle cx="200" cy="140" r="4.5" fill="#38BDF8" stroke="#080D1A" strokeWidth="2" />
            <circle cx="400" cy="60" r="4.5" fill="#38BDF8" stroke="#080D1A" strokeWidth="2" />
            <circle cx="600" cy="40" r="4.5" fill="#38BDF8" stroke="#080D1A" strokeWidth="2" />
            <circle cx="700" cy="20" r="5.5" fill="#60A5FA" stroke="#ffffff" strokeWidth="2.5" />
          </svg>

          {/* Time axis labels */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-3">
            <span>SEG</span>
            <span>TER</span>
            <span>QUA</span>
            <span>QUI</span>
            <span>SEX</span>
            <span>SÁB</span>
            <span className="text-sky-400 font-bold">DOM (Hoje: +24%)</span>
          </div>
        </div>
      </div>

      {/* Painel: Seus servidores */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Seus servidores
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Comunidades do Discord sincronizadas com sua conta
            </p>
          </div>

          <button
            onClick={() => navigate('/servers')}
            className="text-xs font-mono font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
          >
            <span>GERENCIAR TODOS ({servers.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Server Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {servers.map((server) => (
            <div
              key={server.id}
              className="p-5 rounded-2xl bg-[#080D1A] border border-white/[0.07] hover:border-white/[0.12] transition-all flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-2xl shadow-inner">
                    {server.icon || '💬'}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{server.name}</h3>
                    <div className="text-xs text-slate-400 font-mono tabular-nums mt-0.5">
                      {server.members.toLocaleString('pt-BR')} membros
                    </div>
                  </div>
                </div>

                {server.isInstalled ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    NANO Online
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold text-slate-400 bg-white/[0.04] border border-white/[0.08]">
                    Pendente
                  </span>
                )}
              </div>

              <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between">
                <div className="text-xs font-mono text-slate-400">
                  {server.channelsCount} canais · {server.rolesCount} cargos
                </div>

                {server.isInstalled ? (
                  <button
                    onClick={() => navigate('/servers')}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase text-white bg-blue-600 hover:bg-blue-500 transition-all cursor-pointer"
                  >
                    Gerenciar
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/servers')}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
