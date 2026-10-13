import { seo } from '../content/seo';
import { useSeo } from '../lib/seo';
import { Local } from '../components/Secoes';
import { CtaBand, PageHead } from '../components/Ui';

export default function Contato() {
  useSeo({ ...seo.contato, path: '/contato' });
  return (
    <>
      <PageHead
        crumbs={[{ nome: 'Localização e contato' }]}
        titulo="Como chegar e falar com a gente"
        lead="Estamos na Av. Oscar Loureiro, no bairro Cabaceira, em Surubim. O atendimento é com hora marcada."
      />
      <Local comVideo />
      <CtaBand />
    </>
  );
}
