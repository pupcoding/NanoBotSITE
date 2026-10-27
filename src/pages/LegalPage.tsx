import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const LegalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>('terms');

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-sky-400 uppercase block mb-3">
            CONFORMIDADE & TRANSPARÊNCIA
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            Termos e Privacidade
          </h1>
          <p className="text-sm text-slate-400">
            Última atualização: 26 de Outubro de 2026. Em total conformidade com os Termos de Desenvolvedor do Discord.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex justify-center mb-8">
          <div className="p-1.5 rounded-2xl bg-[#090E1D] border border-white/[0.08] flex items-center gap-2">
            <button
              onClick={() => setActiveTab('terms')}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                activeTab === 'terms' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Termos de Serviço
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                activeTab === 'privacy' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Política de Privacidade
            </button>
          </div>
        </div>

        {/* Document Content */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#090E1D] border border-white/[0.08] shadow-2xl space-y-8 text-sm leading-relaxed text-slate-300">
          {activeTab === 'terms' ? (
            <>
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>1. Aceitação dos Termos</span>
                </h2>
                <p>
                  Ao adicionar o NANO a qualquer servidor do Discord ou acessar nosso painel web, você concorda em cumprir estes Termos de Serviço e todas as Diretrizes da Comunidade do Discord. Caso não concorde com qualquer cláusula, solicitamos a desinstalação imediata do bot.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>2. Uso Permitido e Restrições</span>
                </h2>
                <p>
                  O NANO destina-se à moderação, automação, recompensas diárias e entretenimento de comunidades. É estritamente proibido utilizar o bot para:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-400">
                  <li>Realizar ataques de spam ou raid contra outros servidores;</li>
                  <li>Tentar burlar o sistema de recompensas diárias através de automações ilegais;</li>
                  <li>Explorar vulnerabilidades de API ou tentar engenharia reversa do serviço.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>3. Disponibilidade e SLA</span>
                </h2>
                <p>
                  Nos empenhamos para manter 99.9% de disponibilidade em nossos clusters de sharding e APIs REST. No entanto, manutenções emergenciais ou instabilidades na infraestrutura global do Discord podem ocasionar pequenas pausas programadas.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>1. Dados Coletados</span>
                </h2>
                <p>
                  O NANO coleta exclusivamente dados públicos fornecidos pelo protocolo oficial Discord OAuth2:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-400">
                  <li>Identificador único (Discord ID), nome de usuário e avatar público;</li>
                  <li>Lista de servidores nos quais o usuário possui permissão de gerenciamento;</li>
                  <li>Histórico de transações de moedas e sequências de recompensas diárias coletadas.</li>
                </ul>
                <p className="text-emerald-400 font-mono text-xs">
                  ✓ O NANO nunca tem acesso e nunca solicita senhas, mensagens privadas (DMs) ou dados de cartão de crédito.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>2. Segurança das Sessões e Cookies</span>
                </h2>
                <p>
                  Todas as sessões autenticadas utilizam cookies criptografados com as flags <code>HttpOnly</code>, <code>SameSite=Lax</code> e <code>Secure</code>. Nenhuma informação confidencial fica exposta no armazenamento local do navegador (LocalStorage).
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>3. Direito ao Esquecimento (LGPD & GDPR)</span>
                </h2>
                <p>
                  Qualquer usuário ou proprietário de servidor pode solicitar a exclusão integral de seus dados ou logs de auditoria entrando em contato pelo Discord oficial do NANO.
                </p>
              </section>
            </>
          )}
        </div>
      </main>

      <Footer onOpenInviteModal={() => {}} />
    </div>
  );
};
