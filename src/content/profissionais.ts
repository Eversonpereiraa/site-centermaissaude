/**
 * [PENDENTE] Nome, especialidade, registro profissional (CRM, CRP, CREFITO, CRFa, CRN etc.) e foto de cada profissional.
 * Enquanto a lista estiver vazia, a seção Profissionais fica oculta no site. Não invente nomes, rostos ou registros.
 */
export type Profissional = {
  nome: string;
  especialidade: string;
  registro: string; // ex.: "CRM-PE 00000"
  foto?: string; // caminho em /public/assets/fotos
};

export const profissionais: Profissional[] = [];
