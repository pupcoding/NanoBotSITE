import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { Gift, CheckCircle2, Flame, Coins, Calendar, Clock, AlertCircle } from 'lucide-react';

export const RewardsPage: React.FC = () => {
  const { user, claimDailyReward } = useAuth();
  const [claiming, setClaiming] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!user) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const isClaimedToday = user.lastClaimDate === todayStr;

  const handleClaim = async () => {
    if (isClaimedToday || claiming) return;
    setClaiming(true);
    setFeedback(null);

    const res = await claimDailyReward();
    setClaiming(false);

    if (res.success) {
      setFeedback({ type: 'success', message: res.message });
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
  };

  const dayNumbers = [1, 2, 3, 4, 5, 6, 7];

  return (
    <DashboardLayout activeTab="rewards" pageTitle="Recompensa Diária">
      <div className="max-w-4xl mx-auto">
        {/* Editorial Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-pink-400 uppercase block mb-3">
            SISTEMA DIÁRIO DE ATIVIDADE
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-2 text-balance">
            Volte amanhã. Ganhe mais.
          </h1>
          <p className="text-sm text-slate-400">
            Resgate 100 moedas a cada 24 horas e construa sequências para multiplicar bônus na comunidade.
          </p>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold ${
              feedback.type === 'success'
                ? 'bg-emerald-950/80 border border-emerald-500/30 text-emerald-300'
                : 'bg-rose-950/80 border border-rose-500/30 text-rose-300'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Central Reward Card */}
        <div className="relative rounded-3xl p-8 sm:p-12 bg-[#080D1A] border border-white/[0.08] shadow-2xl text-center mb-8 overflow-hidden">
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

          {/* Icon */}
          <div className="relative z-10 w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-tr from-pink-500/20 via-blue-600/20 to-sky-400/20 border border-white/10 flex items-center justify-center text-4xl shadow-xl">
            <Gift className="w-10 h-10 text-pink-400" />
          </div>

          <h2 className="relative z-10 text-xs font-mono font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">
            RECOMPENSA DE HOJE
          </h2>

          <div className="relative z-10 text-4xl sm:text-5xl font-black font-mono text-white tracking-tight mb-8 tabular-nums flex items-center justify-center gap-3">
            <Coins className="w-9 h-9 text-amber-400" />
            <span>100 moedas</span>
          </div>

          {/* Button: RESGATAR */}
          <div className="relative z-10 flex flex-col items-center">
            {isClaimedToday ? (
              <div className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs uppercase tracking-wider shadow-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>✓ RECOMPENSA RESGATADA!</span>
              </div>
            ) : (
              <button
                onClick={handleClaim}
                disabled={claiming}
                className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-mono font-bold text-xs uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/40 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
              >
                <span>{claiming ? 'PROCESSANDO NO BACKEND...' : 'RESGATAR'}</span>
              </button>
            )}

            <p className="text-xs text-slate-400 font-mono mt-4 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>O ciclo de 24 horas é auditado e protegido contra requisições simultâneas</span>
            </p>
          </div>
        </div>

        {/* 2-Column: Sequência & 7-Day Visual Calendar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          {/* Sequência Atual: 7 DIAS */}
          <div className="md:col-span-5 p-6 rounded-2xl bg-[#080D1A] border border-white/[0.07] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-1">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>SEQUÊNCIA ATUAL</span>
              </div>
              <div className="text-4xl font-extrabold font-mono text-white tabular-nums my-3">
                {user.streak} <span className="text-xl font-normal text-slate-400">DIAS</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                Manter a sequência ativa concede +15% de rendimento nas transações de moedas em todos os seus servidores.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Saldo na Carteira:</span>
              <span className="text-amber-400 font-bold">{user.coins} moedas</span>
            </div>
          </div>

          {/* 7-Day Visual Calendar (1, 2, 3, 4, 5, 6, 7) */}
          <div className="md:col-span-7 p-6 rounded-2xl bg-[#080D1A] border border-white/[0.07] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                <Calendar className="w-4 h-4 text-sky-400" />
                <span>CALENDÁRIO DE RECOMPENSAS</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Ciclo Semanal</span>
            </div>

            {/* Days 1 to 7 */}
            <div className="grid grid-cols-7 gap-2 my-2">
              {dayNumbers.map((num) => {
                const historySlot = user.history.find((h) => h.dayNum === num);
                const isClaimed = historySlot?.claimed;

                return (
                  <div
                    key={num}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                      isClaimed
                        ? 'bg-blue-600/20 border-blue-500/40 text-sky-300'
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-500'
                    }`}
                  >
                    <span className="text-xs font-bold font-mono block mb-1">
                      {num}
                    </span>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center">
                      {isClaimed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-slate-500 font-mono mt-4">
              Validação criptográfica atômica no backend NANO.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
