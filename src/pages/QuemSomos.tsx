import { seo } from '../content/seo';
import { site } from '../content/site';
import { listaEmTexto } from '../lib/links';
import { useSeo } from '../lib/seo';
import { Estrutura, Sobre } from '../components/Secoes';
import { CtaBand, PageHead } from '../components/Ui';

export default function QuemSomos() {
  useSeo({ ...seo.quemSomos, path: '/quem-somos' });
  return (
    <>
      <PageHead
        crumbs={[{ nome: 'Quem somos' }]}
        titulo="Um centro de saúde integrado, no coração de Surubim."
        lead="Atendimento médico completo e humanizado para toda a família, com várias especialidades em um único espaço."
      />
      <Sobre />
      <section className="section section--sand" aria-labelledby="regiao">
        <div className="container split">
          <h2 id="regiao">Atendemos Surubim e região.</h2>
          <div style={{ display: 'grid', gap: 'var(--s-3)' }}>
            <p className="lead">
              Recebemos pacientes de {listaEmTexto(site.cidadesAtendidas)}. Ter tudo no mesmo endereço facilita o acompanhamento contínuo da saúde, sem deslocamentos múltiplos.
            </p>
          </div>
        </div>
      </section>
      <Estrutura />
      <CtaBand />
    </>
  );
}
