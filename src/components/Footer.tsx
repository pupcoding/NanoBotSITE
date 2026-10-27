import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenInviteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInviteModal }) => {
  const { navigate, user } = useAuth();

  const handleNav = (path: string, hash?: string) => {
    if (path.startsWith('/#') || (path === '/' && hash)) {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(hash || path.replace('/#', ''));
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="bg-[#03060D] border-t border-white/[0.08] text-slate-400 text-sm">
      {/* Large Call-To-Action Banner inside Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 border-b border-white/[0.06]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-sky-400 uppercase block mb-4">
              EXPANDA SUA COMUNIDADE
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-2xl text-balance">
              Sua comunidade está pronta?
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onOpenInviteModal}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>ADICIONAR NANO</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (user) navigate('/dashboard');
                else navigate('/login');
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-xs tracking-wider uppercase text-slate-300 hover:text-white bg-[#0F172A] hover:bg-[#1E293B] border border-white/10 transition-all cursor-pointer"
            >
              <span>ABRIR PAINEL</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg overflow-hidden p-0.5 bg-gradient-to-tr from-blue-600 to-sky-400">
                <img
                  src="/assets/aistudio/image_c0b02f7b.png"
                  alt="NANO"
                  className="w-full h-full object-cover rounded-[6px]"
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white uppercase font-mono">NANO</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm mb-6">
              Um bot completo para transformar seu servidor Discord em uma comunidade mais organizada, segura e interativa.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Clusters Operacionais • SLA 99.9%</span>
            </div>
          </div>

          {/* Produto & Recursos */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              PRODUTO
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button onClick={() => handleNav('/', 'recursos')} className="hover:text-white transition-colors cursor-pointer">
                  Recursos
                </button>
              </li>
              <li>
                <button onClick={() => { if (user) navigate('/dashboard'); else navigate('/login?redirect=/dashboard'); }} className="hover:text-white transition-colors cursor-pointer">
                  Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => { if (user) navigate('/rewards'); else navigate('/login?redirect=/rewards'); }} className="hover:text-white transition-colors cursor-pointer">
                  Recompensa Diária
                </button>
              </li>
              <li>
                <button onClick={() => { if (user) navigate('/servers'); else navigate('/login?redirect=/servers'); }} className="hover:text-white transition-colors cursor-pointer">
                  Meus Servidores
                </button>
              </li>
            </ul>
          </div>

          {/* Comunidade & Suporte */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              SUPORTE
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button onClick={() => navigate('/status')} className="hover:text-white transition-colors cursor-pointer">
                  Status da API
                </button>
              </li>
              <li>
                <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Comunidade Discord</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <button onClick={() => handleNav('/', 'comunidade')} className="hover:text-white transition-colors cursor-pointer">
                  Central de Ajuda
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              LEGAL
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button onClick={() => navigate('/legal')} className="hover:text-white transition-colors cursor-pointer">
                  Termos de Uso
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/legal')} className="hover:text-white transition-colors cursor-pointer">
                  Privacidade
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/legal')} className="hover:text-white transition-colors cursor-pointer">
                  Segurança & Dados
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © 2026 NANO. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-6">
            <span>Discord OAuth2 Verified</span>
            <span>GDPR/LGPD Compliant</span>
            <span>v2.6.4</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
