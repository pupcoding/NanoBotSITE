import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, X, ArrowRight, Shield, LayoutDashboard, User as UserIcon, LogOut } from 'lucide-react';

interface NavbarProps {
  onOpenInviteModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInviteModal }) => {
  const { user, currentPath, navigate, logout, botInviteUrl } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string, hash?: string) => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    if (path.startsWith('/#') || (path === '/' && hash)) {
      if (currentPath !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(hash || path.replace('/#', ''));
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(hash || path.replace('/#', ''));
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050811]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Left: NANO + Symbol/Logo */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3.5 group cursor-pointer focus:outline-none"
          >
            <div className="relative w-8 h-8 rounded-lg overflow-hidden p-0.5 bg-gradient-to-tr from-blue-600 via-sky-400 to-indigo-600 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <img
                src="/assets/aistudio/image_c0b02f7b.png"
                alt="NANO Logo"
                className="w-full h-full object-cover rounded-[6px]"
              />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-sky-300 transition-colors uppercase font-mono">
              NANO
            </span>
          </button>

          {/* Center: INÍCIO, RECURSOS, COMUNIDADE, STATUS */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-slate-300 uppercase">
            <button
              onClick={() => handleNavClick('/')}
              className={`hover:text-white transition-colors cursor-pointer py-1 relative ${
                currentPath === '/' ? 'text-white font-extrabold' : 'text-slate-400'
              }`}
            >
              INÍCIO
              {currentPath === '/' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
              )}
            </button>
            <button
              onClick={() => handleNavClick('/', 'recursos')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer py-1"
            >
              RECURSOS
            </button>
            <button
              onClick={() => handleNavClick('/', 'comunidade')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer py-1"
            >
              COMUNIDADE
            </button>
            <button
              onClick={() => navigate('/status')}
              className={`hover:text-white transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
                currentPath === '/status' ? 'text-white font-extrabold' : 'text-slate-400'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>STATUS</span>
            </button>
          </nav>

          {/* Right: ENTRAR & ADICIONAR AO DISCORD */}
          <div className="hidden md:flex items-center gap-3.5 shrink-0">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-[#0F172A] hover:bg-[#1E293B] border border-white/10 rounded-lg text-xs font-medium text-white transition-all cursor-pointer"
                >
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-5 h-5 rounded-md object-cover border border-blue-400/30"
                  />
                  <span className="font-semibold text-slate-200">{user.username}</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#090E1D] border border-white/10 rounded-xl shadow-2xl p-2 py-2 flex flex-col gap-1 z-50 animate-fade-in">
                    <div className="px-3 py-2 border-b border-white/5">
                      <p className="text-xs font-semibold text-white">{user.username}#{user.discriminator}</p>
                      <p className="text-[11px] text-sky-400 font-mono tabular-nums">{user.coins} moedas</p>
                    </div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        navigate('/dashboard');
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors cursor-pointer text-left"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-sky-400" />
                      <span>Dashboard</span>
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        navigate('/servers');
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors cursor-pointer text-left"
                    >
                      <Shield className="w-3.5 h-3.5 text-sky-400" />
                      <span>Meus Servidores</span>
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        navigate('/profile');
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors cursor-pointer text-left"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-sky-400" />
                      <span>Perfil</span>
                    </button>
                    <div className="border-t border-white/5 my-1"></div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-400" />
                      <span>Sair</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-xs font-bold tracking-wider uppercase text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                ENTRAR
              </button>
            )}

            <button
              onClick={() => {
                if (onOpenInviteModal) {
                  onOpenInviteModal();
                } else {
                  window.open(botInviteUrl, '_blank', 'noopener,noreferrer');
                }
              }}
              className="px-4 py-2 text-xs font-bold tracking-wider uppercase text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all shadow-md shadow-blue-600/25 cursor-pointer"
            >
              ADICIONAR AO DISCORD
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-5 border-t border-white/[0.08] bg-[#070B14]/98 backdrop-blur-2xl rounded-2xl px-5 flex flex-col gap-3 shadow-2xl">
            <button
              onClick={() => handleNavClick('/')}
              className="text-left text-xs font-bold tracking-widest uppercase py-2.5 text-slate-200 hover:text-sky-400 border-b border-white/5"
            >
              INÍCIO
            </button>
            <button
              onClick={() => handleNavClick('/', 'recursos')}
              className="text-left text-xs font-bold tracking-widest uppercase py-2.5 text-slate-200 hover:text-sky-400 border-b border-white/5"
            >
              RECURSOS
            </button>
            <button
              onClick={() => handleNavClick('/', 'comunidade')}
              className="text-left text-xs font-bold tracking-widest uppercase py-2.5 text-slate-200 hover:text-sky-400 border-b border-white/5"
            >
              COMUNIDADE
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/status');
              }}
              className="text-left text-xs font-bold tracking-widest uppercase py-2.5 text-slate-200 hover:text-sky-400 border-b border-white/5 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>STATUS</span>
            </button>

            <div className="flex flex-col gap-2 pt-2">
              {user ? (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/dashboard');
                    }}
                    className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 rounded-lg text-center"
                  >
                    DASHBOARD ({user.username})
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full py-2 px-4 text-xs font-bold uppercase tracking-wider text-rose-400 hover:bg-rose-500/10 rounded-lg text-center"
                  >
                    SAIR
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/login');
                    }}
                    className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#0F172A] border border-white/10 rounded-lg text-center"
                  >
                    ENTRAR
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenInviteModal) {
                        onOpenInviteModal();
                      } else {
                        window.open(botInviteUrl, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 rounded-lg text-center"
                  >
                    ADICIONAR AO DISCORD
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
