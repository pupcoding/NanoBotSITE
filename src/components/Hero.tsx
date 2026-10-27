import React from 'react';
import { ArrowRight, Shield, Zap, Sparkles, Activity, Check, Hash, Lock, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeroProps {
  onOpenInviteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInviteModal }) => {
  const { botInviteUrl } = useAuth();

  const handleExplore = () => {
    const el = document.getElementById('em-acao');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#070B14]">
      {/* Background architectural grid & subtle accent lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Cinematic Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Asymmetric Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Block (7 cols): Bold Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Tagline */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-sky-400 uppercase">
                YOUR COMMUNITY. UPGRADED.
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-8 text-balance">
              Sua comunidade.{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300">
                Mais inteligente.
                <span className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 to-blue-600 rounded-full opacity-80" />
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-xl mb-10 text-balance">
              Moderação, automação, recompensas e ferramentas para transformar seu servidor Discord em uma comunidade que realmente funciona.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenInviteModal}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>ADICIONAR AO DISCORD</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleExplore}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-xs tracking-wider uppercase text-slate-300 hover:text-white bg-[#0F172A] hover:bg-[#1E293B] border border-white/10 transition-all cursor-pointer"
              >
                <span>EXPLORAR NANO</span>
              </button>
            </div>

            {/* Micro badges below hero */}
            <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Discord v10 Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Zero Latência</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span>99.9% Uptime SLA</span>
              </div>
            </div>
          </div>

          {/* Right Block (5 cols): Cinematic Mascot composition with UI HUD and telemetry rings */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[440px] lg:h-[440px] flex items-center justify-center">
              {/* Outer abstract geometric rings */}
              <div className="absolute inset-0 rounded-full border border-blue-500/20" />
              <div className="absolute -inset-6 rounded-full border border-dashed border-sky-400/20 animate-[spin_120s_linear_infinite]" />
              <div className="absolute inset-6 rounded-full bg-gradient-to-b from-blue-900/30 via-[#0B132B]/60 to-[#070B14] backdrop-blur-xl border border-white/[0.08] shadow-2xl" />

              {/* Decorative circuit lines */}
              <div className="absolute -top-4 right-10 w-24 h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-60" />
              <div className="absolute -bottom-4 left-10 w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60" />

              {/* Mascot Image */}
              <div className="relative w-72 h-72 sm:w-84 sm:h-84 lg:w-96 lg:h-96 z-10 flex items-center justify-center">
                <img
                  src="/assets/aistudio/image_c0b02f7b.png"
                  alt="NANO Character"
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(37,99,235,0.45)] select-none pointer-events-none"
                />
              </div>

              {/* Floating UI HUD 1: Moderation Status (Top Left) */}
              <div className="absolute -top-3 -left-4 sm:-left-8 z-20 px-3.5 py-2.5 rounded-xl bg-[#0B132B]/95 backdrop-blur-md border border-white/10 shadow-2xl flex items-center gap-3 transform hover:scale-105 transition-transform duration-200">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-sky-400">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
                    <span>Moderação Ativa</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">0 ameaças detectadas</div>
                </div>
              </div>

              {/* Floating UI HUD 2: Daily Coins (Bottom Left) */}
              <div className="absolute -bottom-4 -left-4 sm:-left-8 z-20 px-3.5 py-2.5 rounded-xl bg-[#0B132B]/95 backdrop-blur-md border border-white/10 shadow-2xl flex items-center gap-3 transform hover:scale-105 transition-transform duration-200">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white">Recompensa Diária</div>
                  <div className="text-[10px] text-emerald-400 font-mono font-semibold">+100 moedas prontas</div>
                </div>
              </div>

              {/* Floating UI HUD 3: Auto-Security (Middle Right) */}
              <div className="absolute top-1/2 -right-4 sm:-right-10 -translate-y-1/2 z-20 px-3.5 py-2.5 rounded-xl bg-[#0B132B]/95 backdrop-blur-md border border-white/10 shadow-2xl flex items-center gap-3 transform hover:scale-105 transition-transform duration-200">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-300">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white">Anti-Raid Shield</div>
                  <div className="text-[10px] text-sky-400 font-mono">Cluster protegido 24/7</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
