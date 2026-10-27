import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface CtaSectionProps {
  onOpenInviteModal: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenInviteModal }) => {
  const { navigate, user } = useAuth();

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-r from-[#0C1530] via-[#0D1C44] to-[#0A1128] border border-blue-500/30 shadow-2xl overflow-hidden">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: CTA Messaging */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-400/30 text-sky-300 text-xs font-semibold tracking-wider uppercase mb-4">
                Pronto para transformar sua comunidade?
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 text-balance">
                Sua comunidade merece o NANO.
              </h2>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl mb-8 leading-relaxed">
                Comece agora e descubra uma nova forma de administrar seu servidor com simplicidade, segurança e diversão.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onOpenInviteModal}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/40 hover:shadow-blue-500/50 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Adicionar NANO ao Discord</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => {
                    if (user) navigate('/dashboard');
                    else navigate('/login');
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 transition-all cursor-pointer"
                >
                  <span>Acessar Painel</span>
                </button>
              </div>
            </div>

            {/* Right Column: Character Visual Composition */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-2xl" />
                <div className="absolute inset-2 rounded-full border border-sky-400/25" />
                <img
                  src="/assets/aistudio/image_c0b02f7b.png"
                  alt="NANO Mascot"
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(37,99,235,0.35)] relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
