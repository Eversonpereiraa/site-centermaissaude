/**
 * Lista de especialidades.
 * Só as que têm `confirmada: true` aparecem no site.
 * As demais ficam aqui, fora da tela, até a clínica confirmar.
 */
export type Especialidade = {
  slug: string;
  nome: string;
  confirmada: boolean;
  /** Origem da informação, para conferência com a clínica. */
  fonte: 'google+instagram' | 'instagram' | 'google';
  /** Foto real e autorizada (caminho em /public). Sem foto, o cartão usa a composição gráfica da marca. */
  foto?: string;
  fotoAlt?: string;
};

export const especialidades: Especialidade[] = [
  // Aparecem nas duas fontes: base confirmada
  { slug: 'pediatria', nome: 'Pediatria', confirmada: true, fonte: 'google+instagram' },
  { slug: 'cardiologia', nome: 'Cardiologia', confirmada: true, fonte: 'google+instagram' },
  { slug: 'endocrinologia', nome: 'Endocrinologia', confirmada: true, fonte: 'google+instagram' },
  { slug: 'neurologia', nome: 'Neurologia', confirmada: true, fonte: 'google+instagram' },
  { slug: 'geriatria', nome: 'Geriatria', confirmada: true, fonte: 'google+instagram' },
  { slug: 'dermatologia', nome: 'Dermatologia', confirmada: true, fonte: 'google+instagram' },
  { slug: 'psicologia', nome: 'Psicologia', confirmada: true, fonte: 'google+instagram' },
  { slug: 'fisioterapia', nome: 'Fisioterapia', confirmada: true, fonte: 'google+instagram' },
  { slug: 'fonoaudiologia', nome: 'Fonoaudiologia', confirmada: true, fonte: 'google+instagram' },
  { slug: 'nutricao', nome: 'Nutrição', confirmada: true, fonte: 'google+instagram' },

  // Só no Instagram (story antigo, ~3 anos)
  { slug: 'psiquiatria', nome: 'Psiquiatria', confirmada: false, fonte: 'instagram' },
  { slug: 'ortopedia', nome: 'Ortopedia', confirmada: false, fonte: 'instagram' },
  { slug: 'ginecologia-obstetricia', nome: 'Ginecologia e Obstetrícia', confirmada: false, fonte: 'instagram' },
  { slug: 'psicopedagogia', nome: 'Psicopedagogia', confirmada: false, fonte: 'instagram' },

  // Só no Google (resumo gerado por IA)
  { slug: 'clinico-geral', nome: 'Clínico Geral', confirmada: false, fonte: 'google' },
  { slug: 'gastroenterologia', nome: 'Gastroenterologia', confirmada: false, fonte: 'google' },
  { slug: 'angiologia', nome: 'Angiologia', confirmada: false, fonte: 'google' },
  { slug: 'cirurgia-vascular', nome: 'Cirurgia Vascular', confirmada: false, fonte: 'google' },
  { slug: 'terapia-ocupacional', nome: 'Terapia Ocupacional', confirmada: false, fonte: 'google' },
  { slug: 'psicanalise', nome: 'Psicanálise', confirmada: false, fonte: 'google' },
  { slug: 'neuropsicopedagogia', nome: 'Neuropsicopedagogia', confirmada: false, fonte: 'google' },
  { slug: 'estetica', nome: 'Estética', confirmada: false, fonte: 'google' },
];

export const especialidadesConfirmadas = especialidades.filter((e) => e.confirmada);
export const totalEspecialidades = especialidadesConfirmadas.length;
