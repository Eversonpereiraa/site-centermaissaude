/**
 * Dados do cliente. Edite aqui, sem mexer nos componentes.
 * Todo valor `null` é uma PENDÊNCIA: o site mostra um marcador visível
 * (se MOSTRAR_PENDENCIAS = true) ou omite o bloco.
 */

/** Mostra os marcadores [PENDENTE: ...] na tela. Coloque false só depois de resolver as pendências. */
export const MOSTRAR_PENDENCIAS = true;

export const site = {
  nome: 'Center Mais Saúde',
  nomeCompleto: 'Clínica Center Mais Saúde',
  razaoSocial: 'Centro de Saúde Integrada Surubim LTDA',
  cnpj: null as string | null, // [PENDENTE: CNPJ]
  responsavelTecnico: null as string | null, // [PENDENTE: responsável técnico]
  emailPrivacidade: null as string | null, // [PENDENTE: e-mail LGPD]
  email: null as string | null, // [PENDENTE: e-mail]
  url: 'https://clinicacentermaissurubim.com.br',

  endereco: {
    rua: 'Av. Oscar Loureiro, 111',
    bairro: 'Cabaceira',
    cidade: 'Surubim',
    uf: 'PE',
    cep: '55750-000',
  },

  telefone: {
    exibicao: '(81) 98433-6313',
    e164: '+5581984336313',
    whatsapp: '5581984336313',
  },

  horarios: [
    { dias: 'Segunda a sexta', curto: 'Seg a sex', abre: '07:00', fecha: '18:00', textoCurto: '7h às 18h', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
    { dias: 'Sábado', curto: 'Sáb', abre: '07:00', fecha: '13:00', textoCurto: '7h às 13h', schema: ['Saturday'] },
  ],

  cidadesAtendidas: ['Surubim', 'Bom Jardim', 'Casinhas', 'Limoeiro'],

  instagram: {
    usuario: '@centermaissaudesurubim',
    url: 'https://www.instagram.com/centermaissaudesurubim',
  },
  facebook: null as string | null, // [PENDENTE: link do Facebook]

  /** [PENDENTE] prazo real de retorno da clínica. Ex.: "Respondemos em até 1 dia útil." Não invente. */
  promessaResposta: null as string | null,

  /** [PENDENTE] ID de medição GA4 (G-XXXXXXXXXX). Sem ele, nenhum script de medição é carregado. */
  ga4Id: null as string | null,

  /** [PENDENTE] link do perfil da clínica no Google (avaliações reais). Sem ele a seção é omitida. */
  avaliacoesUrl: null as string | null,

  /** [PENDENTE] latitude/longitude do pino do Google Maps. Sem elas o JSON-LD não leva `geo`. */
  geo: null as { lat: number; lng: number } | null,
};

export const enderecoLinha = `${site.endereco.rua} - ${site.endereco.bairro}, ${site.endereco.cidade} - ${site.endereco.uf}, ${site.endereco.cep}`;
