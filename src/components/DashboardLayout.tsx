import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Server,
  Gift,
  Clock,
  Sliders,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Coins,
  ChevronRight,
  Shield,
  Activity,
  FileText,
} from 'lucide-react';
import { InviteModal } from './InviteModal';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'servers' | 'rewards' | 'activity' | 'settings' | 'profile';
  pageTitle: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeTab, pageTitle }) => {
  const { user, logout, navigate, currentPath, botInviteUrl } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  React.useEffect(() => {
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [user, navigate, currentPath]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#070B14] flex items-center justify-center">
        <div className="flex items-center gap-3 text-sky-400 text-xs font-mono font-semibold">
          <div className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
          <span>AUTENTICANDO SESSÃO DISCORD...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'servers',
      label: 'Meus Servidores',
      path: '/servers',
      icon: <Server className="w-4 h-4" />,
    },
    {
      id: 'rewards',
      label: 'Recompensa',
      path: '/rewards',
      icon: <Gift className="w-4 h-4" />,
      badge: '+100',
    },
    {
      id: 'activity',
      label: 'Atividade',
      path: '/activity',
      icon: <Clock className="w-4 h-4" />,
    },
    {
      id: 'settings',
      label: 'Configurações',
      path: '/settings',
      icon: <Sliders className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#080D1A] border-b border-white/[0.08] sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
            aria-label="Abrir menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md overflow-hidden">
              <img src="/assets/aistudio/image_c0b02f7b.png" alt="NANO" className="w-full h-full object-cover" />
            </div>
            <span className="font-extrabold text-sm tracking-wider uppercase font-mono text-white">NANO</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-mono font-bold text-amber-300">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>{user.coins}</span>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar: Clean, High-Density Dark SaaS Style */}
      <aside
        className={`fixed md:sticky top-0 left-0 bottom-0 z-50 w-64 bg-[#080D1A] border-r border-white/[0.08] flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } h-screen shrink-0`}
      >
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden p-0.5 bg-gradient-to-tr from-blue-600 to-sky-400 shadow-md">
                <img
                  src="/assets/aistudio/image_c0b02f7b.png"
                  alt="NANO"
                  className="w-full h-full object-cover rounded-[6px]"
                />
              </div>
              <div>
                <span className="text-lg font-extrabold tracking-tight text-white block uppercase font-mono">
                  NANO
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-sky-400 block -mt-0.5 font-mono">
                  DASHBOARD
                </span>
              </div>
            </button>

            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3.5 space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSidebarOpen(false);
                    navigate(item.path);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-white' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && !isActive && (
                    <span className="text-[10px] font-bold text-sky-400 bg-sky-950/80 border border-sky-500/20 px-1.5 py-0.5 rounded font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-4 mt-4 border-t border-white/[0.06] space-y-1">
              <button
                onClick={() => navigate('/legal')}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Termos & Privacidade</span>
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-slate-500" />
                <span>Página Inicial</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Lower Area: Avatar, Name, Online Status, Logout Button */}
        <div className="p-4 border-t border-white/[0.06] bg-[#060A14]">
          <div className="flex items-center justify-between gap-3">
            <div
              onClick={() => navigate('/profile')}
              className="flex items-center gap-3 cursor-pointer overflow-hidden flex-1 group"
            >
              <div className="relative w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-white/10">
                <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                {/* Status Online dot */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#060A14]" />
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors truncate block">
                  {user.username}
                </span>
                <span className="text-[11px] text-emerald-400 font-mono truncate flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Online
                </span>
              </div>
            </div>

            <button
              onClick={logout}
              title="Sair da conta"
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 border-b border-white/[0.06] bg-[#080D1A]/60 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>NANO</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold">{pageTitle}</span>
          </div>

          <div className="flex items-center gap-4">
            <div
              onClick={() => navigate('/rewards')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono font-bold text-amber-300 hover:bg-amber-500/15 cursor-pointer transition-colors"
            >
              <Coins className="w-4 h-4 text-amber-400" />
              <span>{user.coins} moedas</span>
            </div>

            <button
              onClick={() => setInviteModalOpen(true)}
              className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all shadow-sm cursor-pointer"
            >
              + Adicionar Servidor
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      <InviteModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
      />
    </div>
  );
};
