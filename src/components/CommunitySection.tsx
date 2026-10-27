import React, { useState } from 'react';
import { Users, Hash, Volume2, Shield, Sparkles, Send, Bell, Calendar, Check, ExternalLink } from 'lucide-react';

export const CommunitySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'commands' | 'events'>('chat');

  return (
    <section id="comunidade" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Description & Community CTA */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-sky-400 text-xs font-semibold tracking-wider uppercase mb-4">
              Engajamento & Convivência
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 text-balance">
              Feito para comunidades.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              O NANO foi criado para comunidades que querem crescer sem transformar a administração do servidor em uma tarefa complicada.
            </p>

            <div className="space-y-4 mb-8 w-full">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Notificações Inteligentes</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Avisos automáticos sem poluir canais públicos ou gerar menções desnecessárias.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Eventos & Desafios</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Integração nativa com agendas e recompensas em moedas para participantes.</p>
                </div>
              </div>
            </div>

            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-slate-800 hover:bg-slate-700 border border-slate-700/80 transition-all cursor-pointer shadow-lg hover:shadow-xl"
            >
              <span>Entrar na comunidade</span>
              <ExternalLink className="w-4 h-4 text-sky-400" />
            </a>
          </div>

          {/* Right Column: Simulated Discord Community UI Mockup */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-800 bg-[#0A0F1E] shadow-2xl overflow-hidden">
              {/* Window Header */}
              <div className="px-4 py-3 bg-[#070B14] border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-semibold text-slate-400 ml-2">NANO Community Hub</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>1.482 online</span>
                </div>
              </div>

              {/* Discord Content Layout */}
              <div className="grid grid-cols-12 min-h-[380px]">
                {/* Channel List Sidebar */}
                <div className="hidden sm:block sm:col-span-4 bg-[#080D1A] border-r border-slate-800/80 p-3">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">
                    Canais de Texto
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveTab('chat')}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                        activeTab === 'chat'
                          ? 'bg-blue-600/20 text-white font-semibold'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                      }`}
                    >
                      <Hash className="w-3.5 h-3.5 text-sky-400" />
                      <span>geral-bate-papo</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('commands')}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                        activeTab === 'commands'
                          ? 'bg-blue-600/20 text-white font-semibold'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                      }`}
                    >
                      <Hash className="w-3.5 h-3.5 text-sky-400" />
                      <span>comandos-bot</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('events')}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                        activeTab === 'events'
                          ? 'bg-blue-600/20 text-white font-semibold'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                      }`}
                    >
                      <Hash className="w-3.5 h-3.5 text-sky-400" />
                      <span>avisos-e-eventos</span>
                    </button>
                  </div>

                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-5 mb-2 px-2">
                    Canais de Voz
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-400">
                      <Volume2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>Lounge #1 (4/10)</span>
                    </div>
                  </div>
                </div>

                {/* Main Chat Stream */}
                <div className="col-span-12 sm:col-span-8 p-4 flex flex-col justify-between bg-[#0A0F1E]">
                  {activeTab === 'chat' && (
                    <div className="space-y-4">
                      {/* Message 1 */}
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                          MK
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">Mikael</span>
                            <span className="text-[10px] text-slate-500">Hoje às 14:22</span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1">
                            Alguém já testou o novo sistema de recompensa diária do NANO?
                          </p>
                        </div>
                      </div>

                      {/* Message 2 - Bot Command invocation */}
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                          AK
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">Akira</span>
                            <span className="text-[10px] text-slate-500">Hoje às 14:23</span>
                          </div>
                          <p className="text-xs text-sky-300 font-mono mt-1">
                            /recompensa resgatar
                          </p>
                        </div>
                      </div>

                      {/* Message 3 - NANO Bot Response */}
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-950/40 border border-blue-500/25">
                        <div className="w-8 h-8 rounded-xl overflow-hidden shrink-0 border border-sky-400/30">
                          <img
                            src="/assets/aistudio/image_c0b02f7b.png"
                            alt="NANO"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-sky-300">NANO</span>
                            <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 bg-blue-600 text-white rounded">
                              BOT
                            </span>
                            <span className="text-[10px] text-slate-500">Hoje às 14:23</span>
                          </div>
                          <p className="text-xs text-slate-200 mt-1">
                            🎁 Parabéns <span className="text-sky-300 font-medium">@Akira</span>! Você resgatou <strong className="text-amber-300 font-mono">100 moedas</strong> hoje.
                          </p>
                          <div className="mt-2 text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 px-2 py-1 rounded inline-block">
                            Sequência ativa: 7 dias consecutivos (+15% bônus)
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'commands' && (
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-slate-400 mb-2">Comandos Rápidos Disponíveis</div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                        <span className="text-sky-400 font-bold">/moderar ban</span> &lt;@membro&gt; [motivo]
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                        <span className="text-sky-400 font-bold">/recompensa resgatar</span> — Resgata 100 moedas diárias
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                        <span className="text-sky-400 font-bold">/economia rank</span> — Exibe o ranking de moedas do servidor
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                        <span className="text-sky-400 font-bold">/antiraid status</span> — Ativa modo de proteção reforçada
                      </div>
                    </div>
                  )}

                  {activeTab === 'events' && (
                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/20">
                        <div className="text-xs font-bold text-white mb-1">Campeonato de Trivia da Comunidade</div>
                        <div className="text-xs text-slate-300">Prêmio: 5.000 moedas no NANO + Cargo Especial por 30 dias.</div>
                        <div className="text-[10px] text-sky-400 font-mono mt-2">Inicia neste sábado às 20h00</div>
                      </div>
                    </div>
                  )}

                  {/* Chat Input Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
                    <div className="flex-1 px-3 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-center justify-between">
                      <span>Conversar em #geral-bate-papo...</span>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-sky-400">
                      <Send className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
