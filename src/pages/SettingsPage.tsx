import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { Sliders, Shield, Bell, Globe, Check, Save, Key, Lock } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings } = useAuth();
  const [formData, setFormData] = useState({
    language: settings?.language || 'pt-BR',
    theme: settings?.theme || 'dark-electric',
    emailNotifications: settings?.emailNotifications ?? true,
    discordDmNotifications: settings?.discordDmNotifications ?? true,
    weeklyDigest: settings?.weeklyDigest ?? false,
    twoFactorRequirement: settings?.twoFactorRequirement ?? true,
    webhookUrl: settings?.webhookUrl || '',
  });

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const ok = await updateSettings(formData);
    setSaving(false);
    if (ok) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  return (
    <DashboardLayout activeTab="settings" pageTitle="Configurações">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-sky-400 uppercase">
              PREFERÊNCIAS & SEGURANÇA
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Configurações da Plataforma
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Personalize a interface, políticas de notificação e chaves de integração do cluster.
          </p>
        </div>

        {savedSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Configurações salvas e aplicadas com sucesso em todo o cluster!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Card 1: Idioma & Aparência */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#080D1A] border border-white/[0.07]">
            <div className="flex items-center gap-3 mb-5">
              <Globe className="w-5 h-5 text-sky-400" />
              <h2 className="text-base font-bold text-white">Idioma e Região</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Idioma da Interface
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value as 'pt-BR' | 'en-US' })}
                  className="w-full bg-[#050811] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (United States)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Tema Visual
                </label>
                <select
                  value={formData.theme}
                  onChange={(e) => setFormData({ ...formData, theme: e.target.value as 'dark-electric' | 'deep-navy' })}
                  className="w-full bg-[#050811] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                >
                  <option value="dark-electric">Escuro Elétrico (Padrão NANO)</option>
                  <option value="deep-navy">Azul Profundo Grafite</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card 2: Notificações */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#080D1A] border border-white/[0.07]">
            <div className="flex items-center gap-3 mb-5">
              <Bell className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">Canais de Notificação</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#050811] border border-white/[0.04] cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-white block">Mensagens Diretas no Discord</span>
                  <span className="text-[11px] text-slate-400">Receba avisos instantâneos quando a recompensa diária estiver disponível.</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.discordDmNotifications}
                  onChange={(e) => setFormData({ ...formData, discordDmNotifications: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#050811] border border-white/[0.04] cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-white block">Alertas Críticos de Segurança</span>
                  <span className="text-[11px] text-slate-400">Avisos imediatos caso um ataque de raid seja contido em seu servidor.</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.emailNotifications}
                  onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Card 3: Segurança e Webhooks */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#080D1A] border border-white/[0.07]">
            <div className="flex items-center gap-3 mb-5">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white">Integração de Webhook & Auditoria</h2>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                URL do Discord Webhook (Opcional)
              </label>
              <input
                type="text"
                value={formData.webhookUrl}
                onChange={(e) => setFormData({ ...formData, webhookUrl: e.target.value })}
                placeholder="https://discord.com/api/webhooks/..."
                className="w-full bg-[#050811] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 font-mono"
              />
              <span className="text-[11px] text-slate-500 font-mono mt-1.5 block">
                Permite enviar logs brutos de incidentes diretamente para seu canal privado.
              </span>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'SALVANDO...' : 'SALVAR ALTERAÇÕES'}</span>
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};
