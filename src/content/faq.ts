import { enderecoLinha, site } from './site';

export type Pergunta = { pergunta: string; resposta: string; visivel: boolean };

const cidades = site.cidadesAtendidas;
const cidadesTexto = `${cidades.slice(0, -1).join(', ')} e ${cidades[cidades.length - 1]}`;

export const faq: Pergunta[] = [
  {
    pergunta: 'Como faço para agendar uma consulta?',
    resposta:
      'Pelo WhatsApp ou por telefone, no número ' +
      site.telefone.exibicao +
      '. Informe a especialidade que você procura e a equipe combina o horário com você.',
    visivel: true,
  },
  {
    pergunta: 'A clínica atende sem hora marcada?',
    resposta:
      'Não. O atendimento é feito mediante agendamento prévio. Antes de vir, fale com a equipe pelo WhatsApp ou por telefone.',
    visivel: true,
  },
  {
    pergunta: 'Quais são os dias e horários de atendimento?',
    resposta: 'De segunda a sexta, das 7h às 18h. Aos sábados, das 7h às 13h.',
    visivel: true,
  },
  {
    pergunta: 'Onde a clínica fica e quais cidades ela atende?',
    resposta: `Ficamos na ${enderecoLinha}. Atendemos moradores de ${cidadesTexto}.`,
    visivel: true,
  },
  {
    pergunta: 'A clínica atende urgência e emergência?',
    resposta:
      'Não. A Center Mais Saúde não é pronto-socorro. Em caso de urgência ou emergência, ligue para o SAMU (192) ou procure um pronto-atendimento.',
    visivel: true,
  },

  // PENDENTES: só entram no site depois que a clínica responder.
  { pergunta: 'A clínica aceita convênios?', resposta: '[PENDENTE: resposta da clínica]', visivel: false },
  { pergunta: 'Quanto custa a consulta?', resposta: '[PENDENTE: resposta da clínica]', visivel: false },
  { pergunta: 'A clínica faz exames? Como me preparo?', resposta: '[PENDENTE: resposta da clínica]', visivel: false },
];

export const faqVisivel = faq.filter((p) => p.visivel);
