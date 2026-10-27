import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, Info, User, ShieldCheck } from 'lucide-react';
import { Navbar } from '../components/Navbar';

export const LoginPage: React.FC = () => {
  const { demoLogin, navigate, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [customUsername, setCustomUsername] = useState('');

  const params = new URLSearchParams(window.location.search);
  const redirectTarget = params.get('redirect') || '/dashboard';
  const notice = params.get('notice');
  const error = params.get('error');

  React.useEffect(() => {
    if (user) {
      navigate(redirectTarget);
    }
  }, [user, navigate, redirectTarget]);

  const handleDemoSignIn = async (name: string) => {
    setLoading(true);
    const success = await demoLogin(name);
    setLoading(false);
    if (success) {
      navigate(redirectTarget);
    }
  };

  const handleRealDiscordLogin = () => {
    window.location.href = '/api/auth/discord';
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-32 relative">
        {/* Glow backdrop */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {notice === 'no_discord_keys' && (
            <div className="mb-4 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Credenciais Discord não detectadas no .env</strong>
                Adicione <code>DISCORD_CLIENT_ID</code> e <code>DISCORD_CLIENT_SECRET</code> para autorização via portal do Discord, ou utilize o acesso instantâneo abaixo para navegar imediatamente.
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 rounded-2xl bg-rose-950/50 border border-rose-500/30 text-rose-200 text-xs flex items-start gap-2.5">
              <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Erro de Autorização</strong>
                {error}
              </div>
            </div>
          )}

          {/* Minimalist Login Card */}
          <div className="rounded-3xl p-8 sm:p-10 bg-[#090E1D] border border-white/[0.08] backdrop-blur-2xl shadow-2xl">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-blue-600 to-sky-400 shadow-xl shadow-blue-500/20">
                <img
                  src="/assets/aistudio/image_c0b02f7b.png"
                  alt="NANO"
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Entre no NANO.
              </h1>
              <p className="text-sm text-slate-400 mt-2">
                Conecte sua conta Discord para acessar seu painel.
              </p>
            </div>

            {/* Official Button */}
            <div className="space-y-4">
              <button
                onClick={handleRealDiscordLogin}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-[#5865F2] hover:bg-[#4752C4] shadow-lg shadow-[#5865F2]/25 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                <span>CONTINUAR COM DISCORD</span>
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-white/[0.08]"></div>
                <span className="flex-shrink mx-4 text-slate-500 text-[11px] uppercase font-mono tracking-wider">acesso rápido</span>
                <div className="flex-grow border-t border-white/[0.08]"></div>
              </div>

              {/* Instant Access Mode */}
              <div className="p-4 rounded-2xl bg-[#060913] border border-white/[0.06] space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <User className="w-4 h-4 text-sky-400" />
                  <span>Modo Demonstração Instantâneo</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Avalie o painel administrativo, servidores e sistema de recompensas imediatamente:
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customUsername}
                    onChange={(e) => setCustomUsername(e.target.value)}
                    placeholder="Nome de usuário (ex: KuroNeko)"
                    className="flex-1 bg-[#090E1D] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 font-mono"
                  />
                  <button
                    onClick={() => handleDemoSignIn(customUsername || 'KuroNeko')}
                    disabled={loading}
                    className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-colors disabled:opacity-50 cursor-pointer shrink-0"
                  >
                    {loading ? 'Entrando...' : 'Entrar'}
                  </button>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Nenhuma senha é solicitada ou armazenada</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
