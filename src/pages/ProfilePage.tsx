import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { User, Server, Flame, Gift, Coins, LogOut, Shield, Calendar, Hash, Mail } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, servers, logout } = useAuth();

  if (!user) return null;

  const totalClaimedDays = user.history.filter((h) => h.claimed).length;

  return (
    <DashboardLayout activeTab="profile" pageTitle="Meu Perfil">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card Header */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0B132B]/90 border border-blue-500/30 shadow-2xl backdrop-blur-xl mb-8 relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 relative z-10">
            {/* Avatar */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden p-1 bg-gradient-to-tr from-blue-600 via-sky-400 to-indigo-500 shadow-xl shrink-0">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-full h-full object-cover rounded-[22px]"
              />
              <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0B132B]" />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
                    <span>{user.username}</span>
                    <span className="text-slate-400 text-lg font-mono">
                      #{user.discriminator}
                    </span>
                  </h1>
                </div>

                <button
                  onClick={logout}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-colors cursor-pointer self-center sm:self-auto"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sair da conta</span>
                </button>
              </div>

              {/* Discord ID & Join Date */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 mt-2 font-mono">
                <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                  <Hash className="w-3.5 h-3.5 text-sky-400" />
                  <span>ID: {user.discordId}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  <span>Conta criada: {user.joinedAt}</span>
                </div>
                {user.email && (
                  <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                    <Mail className="w-3.5 h-3.5 text-sky-400" />
                    <span>{user.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Stat 1: Servidores */}
          <div className="p-5 rounded-2xl bg-[#0B132B]/70 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              <Server className="w-4 h-4 text-sky-400" />
              <span>Servidores</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums">
              {servers.length}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {servers.filter((s) => s.isInstalled).length} com NANO ativo
            </p>
          </div>

          {/* Stat 2: Dias Consecutivos */}
          <div className="p-5 rounded-2xl bg-[#0B132B]/70 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Dias Consecutivos</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums">
              {user.streak}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Sequência atual</p>
          </div>

          {/* Stat 3: Recompensas Coletadas */}
          <div className="p-5 rounded-2xl bg-[#0B132B]/70 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              <Gift className="w-4 h-4 text-pink-400" />
              <span>Recompensas</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums">
              {totalClaimedDays + 14}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Total resgatado</p>
          </div>

          {/* Stat 4: Moedas */}
          <div className="p-5 rounded-2xl bg-[#0B132B]/70 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>Moedas</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-300 tabular-nums">
              {user.coins}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Saldo na carteira</p>
          </div>
        </div>

        {/* Security / OAuth Section */}
        <div className="p-6 rounded-2xl bg-[#0B132B]/60 border border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Segurança & Conexão Discord</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Sua conta está conectada de forma segura através do Discord OAuth2 com escopo de identificação básica e lista de servidores. O NANO nunca tem acesso à sua senha ou mensagens diretas privadas.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};
