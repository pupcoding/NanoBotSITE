import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'O NANO é gratuito?',
    answer: 'Sim! Os principais recursos de moderação, proteção anti-raid, economia, automação de boas-vindas e recompensas diárias são 100% gratuitos para qualquer comunidade no Discord.',
  },
  {
    question: 'Como adiciono o NANO ao meu servidor?',
    answer: 'Basta clicar no botão "Adicionar ao Discord" no topo da página, selecionar o servidor onde você possui permissão de gerenciamento e conceder as permissões necessárias na janela oficial do Discord.',
  },
  {
    question: 'Preciso ter permissões de administrador?',
    answer: 'Para adicionar o bot ao servidor, você precisa de permissões de "Gerenciar Servidor" ou "Administrador". Para membros comuns, não é necessária nenhuma permissão especial para usar comandos ou resgatar moedas.',
  },
  {
    question: 'Como funciona a recompensa diária?',
    answer: 'A cada 24 horas você pode entrar no site ou usar o comando /recompensa no seu servidor para coletar 100 moedas. Manter sequências diárias consecutivas garante bônus adicionais de moedas.',
  },
  {
    question: 'Meus dados do Discord ficam seguros?',
    answer: 'Com certeza. O NANO utiliza o protocolo oficial Discord OAuth2 e nunca armazena senhas, tokens privados ou dados bancários. Apenas dados públicos do perfil (ID, nome de usuário e servidores compartilhados) são lidos para o painel.',
  },
  {
    question: 'Posso remover o NANO do meu servidor?',
    answer: 'Sim, a qualquer momento você pode expulsar ou banir o bot diretamente pela lista de membros do seu Discord. Todas as configurações do seu servidor ficarão salvas caso queira adicioná-lo novamente.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative py-24 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-sky-400 text-xs font-semibold tracking-wider uppercase mb-3">
            Dúvidas Frequentes
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Perguntas frequentes
          </h2>
          <p className="text-base text-slate-400">
            Respostas claras sobre funcionamento, permissões e segurança do NANO.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-[#0B132B]/50 transition-colors overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm sm:text-base text-white hover:text-sky-300 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-sky-400 transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
