'use client';

import { useState, FormEvent } from 'react';

interface AgendamentoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const exames = [
  'Hemograma Completo',
  'Glicemia de Jejum',
  'Colesterol Total e Frações',
  'TSH e T4 Livre',
  'Urina Tipo I',
  'Teste de Paternidade',
  'Check-up Completo',
  'Outro (especificar no WhatsApp)',
];

export default function AgendamentoModal({ isOpen, onClose }: AgendamentoModalProps) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [exame, setExame] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const mensagem = `Olá! Gostaria de agendar um exame.

*Nome:* ${nome}
*Telefone:* ${telefone}
*Exame:* ${exame}

Aguardo retorno para confirmar data e horário.`;

    const whatsappUrl = `https://wa.me/5596981055224?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');

    // Reset form
    setNome('');
    setTelefone('');
    setExame('');
    onClose();
  };

  const handleClose = () => {
    setNome('');
    setTelefone('');
    setExame('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="bg-blue-500 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Agendar Exame</h2>
              <p className="text-white/80 text-sm">Rápido e fácil via WhatsApp</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white/60 hover:text-white transition-colors p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-navy-900 font-medium text-sm mb-1.5">
                Qual exame você precisa?
              </label>
              <select
                value={exame}
                onChange={(e) => setExame(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">Selecione o exame</option>
                {exames.map((ex) => (
                  <option key={ex} value={ex}>{ex}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-navy-900 font-medium text-sm mb-1.5">
                Seu nome
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Como podemos te chamar?"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-navy-900 font-medium text-sm mb-1.5">
                Seu telefone
              </label>
              <input
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(96) 99999-9999"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 mt-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
              Continuar no WhatsApp
            </button>
          </form>

          {/* Info */}
          <div className="mt-5 pt-5 border-t border-gray-100">
            <div className="flex items-start gap-3 text-sm text-gray-500">
              <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                Seus dados serão enviados para nossa equipe que entrará em contato para confirmar o agendamento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
