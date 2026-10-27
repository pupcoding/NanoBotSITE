import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { ServerItem } from '../types';
import {
  Server,
  Search,
  Plus,
  Sliders,
  Shield,
  Zap,
  Coins,
  FileText,
  Lock,
  X,
  Check,
  Save,
} from 'lucide-react';

export const ServersPage: React.FC = () => {
  const { servers, botInviteUrl, toggleServerModule, saveServerSettings } = useAuth();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'installed' | 'available'>('all');
  const [selectedServer, setSelectedServer] = useState<ServerItem | null>(null);
  const [managementTab, setManagementTab] = useState<'modules' | 'settings'>('modules');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Settings form within drawer
  const [prefixVal, setPrefixVal] = useState('n!');
  const [logChannelVal, setLogChannelVal] = useState('#mod-logs');
  const [welcomeChannelVal, setWelcomeChannelVal] = useState('#geral');
  const [strictnessVal, setStrictnessVal] = useState<'low' | 'medium' | 'high'>('medium');

  const filteredServers = servers.filter((server) => {
    const matchesSearch = server.name.toLowerCase().includes(search.toLowerCase());
    if (filter === 'installed') return matchesSearch && server.isInstalled;
    if (filter === 'available') return matchesSearch && !server.isInstalled;
    return matchesSearch;
  });

  const handleOpenManager = (server: ServerItem) => {
    setSelectedServer(server);
    setPrefixVal(server.settings?.prefix || 'n!');
    setLogChannelVal(server.settings?.logChannel || '#mod-logs');
    setWelcomeChannelVal(server.settings?.welcomeChannel || '#geral');
    setStrictnessVal(server.settings?.automodStrictness || 'medium');
  };

  const handleToggle = async (moduleKey: string, currentValue: boolean) => {
    if (!selectedServer) return;
    const ok = await toggleServerModule(selectedServer.id, moduleKey, !currentValue);
    if (ok) {
      setSelectedServer((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          modules: {
            ...prev.modules,
            [moduleKey]: !currentValue,
          },
        };
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  const handleSaveSettings = async () => {
    if (!selectedServer) return;
    const ok = await saveServerSettings(selectedServer.id, {
      prefix: prefixVal,
      logChannel: logChannelVal,
      welcomeChannel: welcomeChannelVal,
      automodStrictness: strictnessVal,
    });
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  return (
    <DashboardLayout activeTab="servers" pageTitle="Meus Servidores">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Meus Servidores
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Gerencie comunidades ativas ou autorize o NANO em novos servidores com permissões verificadas no backend.
          </p>
        </div>

        <button
          onClick={() => window.open(botInviteUrl, '_blank', 'noopener,noreferrer')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono font-bold text-xs uppercase text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>CONECTAR NOVO SERVIDOR</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar servidor por nome..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#080D1A] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 font-mono"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#080D1A] border border-white/10 rounded-xl">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-lg transition-colors cursor-pointer ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Todos ({servers.length})
          </button>
          <button
            onClick={() => setFilter('installed')}
            className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-lg transition-colors cursor-pointer ${
              filter === 'installed' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            NANO Instalado ({servers.filter((s) => s.isInstalled).length})
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-lg transition-colors cursor-pointer ${
              filter === 'available' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Disponível ({servers.filter((s) => !s.isInstalled).length})
          </button>
        </div>
      </div>

      {/* Servers List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredServers.map((server) => (
          <div
            key={server.id}
            className="p-6 rounded-3xl bg-[#080D1A] border border-white/[0.07] hover:border-white/[0.12] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-2xl shadow-inner">
                    {server.icon || '💬'}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{server.name}</h3>
                    <div className="text-xs text-slate-400 font-mono tabular-nums mt-0.5">
                      {server.members.toLocaleString('pt-BR')} membros
                    </div>
                  </div>
                </div>

                {server.isInstalled ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Instalado
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold text-slate-400 bg-white/[0.04] border border-white/[0.08]">
                    Não Instalado
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Estrutura</span>
                  <span className="text-slate-300">
                    {server.channelsCount} canais · {server.rolesCount} cargos
                  </span>
                </div>
                {server.isInstalled && (
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Módulos Ativos</span>
                    <span className="text-sky-300 font-bold">
                      {Object.values(server.modules).filter(Boolean).length} / 6
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions: GERENCIAR (se instalado) ou ADICIONAR (se não instalado) */}
            <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                {server.isInstalled ? 'Autorizado' : 'Ação requerida'}
              </span>

              {server.isInstalled ? (
                <button
                  onClick={() => handleOpenManager(server)}
                  className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>GERENCIAR</span>
                </button>
              ) : (
                <button
                  onClick={() => window.open(botInviteUrl, '_blank', 'noopener,noreferrer')}
                  className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-slate-200 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-sky-400" />
                  <span>ADICIONAR</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredServers.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-[#080D1A] border border-white/[0.06] text-slate-400 text-xs font-mono">
          Nenhum servidor encontrado para a busca especificada.
        </div>
      )}

      {/* Server Management Drawer Modal */}
      {selectedServer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#090E1D] border border-white/10 shadow-2xl p-6 sm:p-8 max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-xl">
                  {selectedServer.icon || '💬'}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>{selectedServer.name}</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded">
                      ONLINE
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    ID: {selectedServer.id} · {selectedServer.members.toLocaleString('pt-BR')} membros
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedServer(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Management Tabs */}
            <div className="flex items-center gap-2 pt-4 pb-2 border-b border-white/[0.08] text-xs">
              <button
                onClick={() => setManagementTab('modules')}
                className={`px-3 py-2 rounded-lg font-mono font-bold uppercase transition-colors cursor-pointer ${
                  managementTab === 'modules' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Módulos Ativos
              </button>
              <button
                onClick={() => setManagementTab('settings')}
                className={`px-3 py-2 rounded-lg font-mono font-bold uppercase transition-colors cursor-pointer ${
                  managementTab === 'settings' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Canais & Prefixo
              </button>
            </div>

            {saveSuccess && (
              <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Configuração sincronizada no cluster do bot!</span>
              </div>
            )}

            {/* Content Tab */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {managementTab === 'modules' && (
                <>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#060913] border border-white/[0.05]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-sky-400">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Moderação Automática</h4>
                        <p className="text-[11px] text-slate-400 font-mono">Filtro de links, detecção de spam e registro unificado de punições.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('moderation', selectedServer.modules.moderation)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                        selectedServer.modules.moderation ? 'bg-blue-600 justify-end' : 'bg-slate-800 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#060913] border border-white/[0.05]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Proteção Anti-Raid & Anti-Nuke</h4>
                        <p className="text-[11px] text-slate-400 font-mono">Bloqueio contra entrada em massa e restrição a deleção de canais.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('automod', selectedServer.modules.automod)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                        selectedServer.modules.automod ? 'bg-blue-600 justify-end' : 'bg-slate-800 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#060913] border border-white/[0.05]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                        <Coins className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Sistema de Economia</h4>
                        <p className="text-[11px] text-slate-400 font-mono">Moeda do servidor, loja de cargos cosméticos e ranking de chat.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('economy', selectedServer.modules.economy)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                        selectedServer.modules.economy ? 'bg-blue-600 justify-end' : 'bg-slate-800 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#060913] border border-white/[0.05]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-sky-600/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Boas-Vindas & Autorole</h4>
                        <p className="text-[11px] text-slate-400 font-mono">Cartão de entrada automático e atribuição instantânea de cargo de membro.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('welcome', selectedServer.modules.welcome)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                        selectedServer.modules.welcome ? 'bg-blue-600 justify-end' : 'bg-slate-800 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#060913] border border-white/[0.05]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Logs de Auditoria</h4>
                        <p className="text-[11px] text-slate-400 font-mono">Registro em canal seguro de mensagens deletadas e membros expulsos.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('logs', selectedServer.modules.logs)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                        selectedServer.modules.logs ? 'bg-blue-600 justify-end' : 'bg-slate-800 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                    </button>
                  </div>
                </>
              )}

              {managementTab === 'settings' && (
                <div className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1.5">Prefixo de Comandos</label>
                    <input
                      type="text"
                      value={prefixVal}
                      onChange={(e) => setPrefixVal(e.target.value)}
                      className="w-full bg-[#060913] border border-white/10 rounded-xl px-4 py-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1.5">Canal de Auditoria (Logs)</label>
                    <input
                      type="text"
                      value={logChannelVal}
                      onChange={(e) => setLogChannelVal(e.target.value)}
                      className="w-full bg-[#060913] border border-white/10 rounded-xl px-4 py-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1.5">Canal de Boas-Vindas</label>
                    <input
                      type="text"
                      value={welcomeChannelVal}
                      onChange={(e) => setWelcomeChannelVal(e.target.value)}
                      className="w-full bg-[#060913] border border-white/10 rounded-xl px-4 py-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 uppercase font-bold mb-1.5">Rigor do AutoMod</label>
                    <select
                      value={strictnessVal}
                      onChange={(e) => setStrictnessVal(e.target.value as any)}
                      className="w-full bg-[#060913] border border-white/10 rounded-xl px-4 py-2.5 text-white"
                    >
                      <option value="low">Baixo (Apenas links maliciosos conhecidos)</option>
                      <option value="medium">Médio (Filtro de palavras e antispam)</option>
                      <option value="high">Alto (Quarentena preventiva e anti-nuke)</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleSaveSettings}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold uppercase text-white bg-blue-600 hover:bg-blue-500 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Salvar Configurações</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">Backend RBAC Protegido</span>
              <button
                onClick={() => setSelectedServer(null)}
                className="px-5 py-2 rounded-xl text-xs font-mono font-bold uppercase text-white bg-slate-800 hover:bg-slate-700 cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
