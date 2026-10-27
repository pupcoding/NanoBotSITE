import React, { useState } from 'react';
import { Shield, Zap, Coins, Gift, Lock, Users, ArrowUpRight, Check, Activity, BarChart3, Bell } from 'lucide-react';

export const NanoInAction: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'moderacao' | 'automacao' | 'economia' | 'recompensas' | 'seguranca' | 'comunidade'>('moderacao');

  const modules = [
    { id: 'moderacao', label: 'MODERAÇÃO', icon: <Shield className="w-4 h-4" /> },
    { id: 'automacao', label: 'AUTOMAÇÃO', icon: <Zap className="w-4 h-4" /> },
    { id: 'economia', label: 'ECONOMIA', icon: <Coins className="w-4 h-4" /> },
    { id: 'recompensas', label: 'RECOMPENSAS', icon: <Gift className="w-4 h-4" /> },
    { id: 'seguranca', label: 'SEGURANÇA', icon: <Lock className="w-4 h-4" /> },
    { id: 'comunidade', label: 'COMUNIDADE', icon: <Users className="w-4 h-4" /> },
  ] as const;

  return (
    <section id="em-acao" className="relative py-28 bg-[#050811] border-y border-white/[0.06] overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-sky-400 uppercase block mb-3">
            O NANO EM AÇÃO
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Tudo trabalhando junto.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Módulos independentes sincronizados em tempo real para orquestrar sua comunidade sem sobrecarregar sua equipe de moderadores.
          </p>
        </div>

        {/* Module Selector Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          <div className="p-1.5 rounded-xl bg-[#090E1D] border border-white/[0.08] flex items-center gap-1.5">
            {modules.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveModule(m.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                  activeModule === m.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Showcase Frame (Inspired by reference images) */}
        <div className="rounded-3xl border border-white/[0.08] bg-[#090E1D]/90 backdrop-blur-2xl shadow-2xl p-6 sm:p-8 overflow-hidden">
          {/* Top Bar of the Mock Dashboard */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-400 ml-2">
                NANO Operational Cluster • v2.6.4
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="hidden sm:inline text-slate-400">Gateway Ping:</span>
              <span className="text-emerald-400 font-bold">24ms</span>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                ● 100% Sincronizado
              </span>
            </div>
          </div>

          {/* Dynamic Content based on selected module */}
          <div className="min-h-[380px] grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left 4 Cols: Interactive Metric Summary */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#060913] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider block mb-2">
                  Visão em Tempo Real
                </span>
                <h3 className="text-2xl font-bold text-white mb-3 capitalize">
                  Módulo de {activeModule}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {activeModule === 'moderacao' && 'Monitoramento ativo de links suspeitos, bans temporários e registro unificado de infrações.'}
                  {activeModule === 'automacao' && 'Gatilhos automáticos de cargos por reação, boas-vindas programadas e canais de voz dinâmicos.'}
                  {activeModule === 'economia' && 'Controle de carteiras, moedas do servidor, transações atômicas e rankings diários.'}
                  {activeModule === 'recompensas' && 'Ciclos de 24 horas controlados via backend com preservação de sequências e bônus escalonados.'}
                  {activeModule === 'seguranca' && 'Contenção automática contra ataques de raid massivo e quarentena imediata de contas comprometidas.'}
                  {activeModule === 'comunidade' && 'Hub de eventos, enquetes nativas sem bot externo e quadro de avisos com notificações discretas.'}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Status do Processo:</span>
                  <span className="text-emerald-400 font-mono font-bold">Ativo em segundo plano</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Carga na CPU:</span>
                  <span className="text-sky-300 font-mono">0.4% (Otimizado)</span>
                </div>
              </div>
            </div>

            {/* Right 8 Cols: Graphic demonstration with charts & mock cards */}
            <div className="lg:col-span-8 p-6 rounded-2xl bg-[#060913] border border-white/[0.06] flex flex-col justify-between">
              {activeModule === 'moderacao' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-[#0B132B] border border-white/[0.06]">
                      <span className="text-[11px] text-slate-400 block mb-1">Avisos Emitidos</span>
                      <span className="text-xl font-bold text-white font-mono">142</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0B132B] border border-white/[0.06]">
                      <span className="text-[11px] text-slate-400 block mb-1">Mutes Automáticos</span>
                      <span className="text-xl font-bold text-sky-400 font-mono">29</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0B132B] border border-white/[0.06]">
                      <span className="text-[11px] text-slate-400 block mb-1">Links Bloqueados</span>
                      <span className="text-xl font-bold text-emerald-400 font-mono">814</span>
                    </div>
                  </div>

                  {/* Simulated Audit Feed */}
                  <div className="space-y-2 mt-4">
                    <div className="p-3 rounded-xl bg-[#0A1022] border border-white/[0.04] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-slate-300 font-mono">[AutoMod] Link de phishing interceptado em #geral</span>
                      </div>
                      <span className="text-slate-500 font-mono text-[11px]">há 2 min</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0A1022] border border-white/[0.04] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span className="text-slate-300 font-mono">[Mod] Membro temporariamente silenciado (Spam de menção)</span>
                      </div>
                      <span className="text-slate-500 font-mono text-[11px]">há 8 min</span>
                    </div>
                  </div>
                </div>
              )}

              {activeModule === 'automacao' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#0B132B] border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">Fluxo: Autorole & Mensagem de Boas-Vindas</span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/20">ATIVO</span>
                    </div>
                    <p className="text-xs text-slate-400">Quando um novo membro entra no servidor, atribuir cargo @Explorador e enviar cartão com regras em #boas-vindas.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0B132B] border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">Fluxo: Canais de Voz Temporários</span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/20">ATIVO</span>
                    </div>
                    <p className="text-xs text-slate-400">Criar canal dinâmico quando alguém entra na sala principal e deletar ao esvaziar.</p>
                  </div>
                </div>
              )}

              {activeModule === 'economia' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#0B132B] border border-white/[0.06]">
                    <div>
                      <span className="text-xs text-slate-400 block">Moeda do Servidor</span>
                      <span className="text-xl font-bold text-amber-300 font-mono">NanoCoins (NC$)</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Circulação Total</span>
                      <span className="text-xl font-bold text-white font-mono">1.480.000 NC$</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0A1022] border border-white/[0.04]">
                    <span className="text-xs font-bold text-white block mb-2">Top Membros Ativos</span>
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between text-slate-300">
                        <span>#1 Alex#0001</span>
                        <span className="text-amber-400">42.500 NC$</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>#2 Kuro#0001</span>
                        <span className="text-amber-400">38.200 NC$</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeModule === 'recompensas' && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 to-sky-950/40 border border-blue-500/20 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-sky-400 font-mono font-bold block mb-1">PROGRAMA DE RETENÇÃO</span>
                      <h4 className="text-lg font-bold text-white">+100 Moedas por Login Consecutivo</h4>
                      <p className="text-xs text-slate-300 mt-1">Garante que seus membros retornem diariamente à comunidade.</p>
                    </div>
                    <div className="text-3xl font-extrabold font-mono text-amber-400">7x</div>
                  </div>
                </div>
              )}

              {activeModule === 'seguranca' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-[#0B132B] border border-emerald-500/20">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-emerald-400">Sistema Anti-Nuke Ativado</span>
                      <span className="text-[10px] font-mono text-slate-400">Permissão restrita a donos</span>
                    </div>
                    <p className="text-xs text-slate-300">Impede que administradores desonestos excluam múltiplos canais ou banam todos os membros em segundos.</p>
                  </div>
                </div>
              )}

              {activeModule === 'comunidade' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-[#0B132B] border border-white/[0.06]">
                    <div className="text-xs font-bold text-white mb-1">Enquetes com Ranking de Votos</div>
                    <p className="text-xs text-slate-300">Crie decisões comunitárias rápidas com cálculo automático de quórum.</p>
                  </div>
                </div>
              )}

              {/* Sub-footer inside dashboard */}
              <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Modo de Operação: Autônomo</span>
                <span className="text-sky-400">Sincronizado com API Discord v10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
