import React, { useState } from 'react';
import { X, Check, Shield, ExternalLink, Sparkles, Server } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose }) => {
  const { botInviteUrl, servers, user } = useAuth();
  const [selectedServer, setSelectedServer] = useState<string>('');

  if (!isOpen) return null;

  const permissions = [
    'Gerenciar Canais e Cargos',
    'Expulsar e Banir Membros',
    'Enviar Mensagens e Anexar Arquivos',
    'Adicionar Reações e Usar Emojis',
    'Moderação Automática e Logs',
  ];

  const handleContinue = () => {
    window.open(botInviteUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0B132B] border border-blue-500/30 shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-blue-600 to-sky-400 shadow-md">
            <img
              src="/assets/aistudio/image_c0b02f7b.png"
              alt="NANO"
              className="w-full h-full object-cover rounded-[14px]"
            />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">Adicionar NANO ao Discord</h3>
            <p className="text-xs text-sky-400">Autorização oficial Discord v10</p>
          </div>
        </div>

        {/* Server Selection if logged in */}
        {user && servers.length > 0 && (
          <div className="mb-5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Selecione sua comunidade
            </label>
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {servers.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedServer(s.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedServer === s.id
                      ? 'bg-blue-600/20 border-blue-500 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{s.icon || '💬'}</span>
                    <span className="font-semibold">{s.name}</span>
                  </div>
                  {s.isInstalled ? (
                    <span className="text-[10px] text-emerald-400 font-medium">Já instalado</span>
                  ) : (
                    <span className="text-[10px] text-sky-400 font-medium">Disponível</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Permissions */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2 mb-2.5">
            <Shield className="w-4 h-4 text-sky-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Permissões Solicitadas
            </h4>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {permissions.map((p, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleContinue}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all cursor-pointer"
          >
            <span>Continuar para o Discord</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
