import { seo } from '../content/seo';
import { useSeo } from '../lib/seo';
import { ListaFaq } from '../components/Blocos';
import { CtaBand, PageHead } from '../components/Ui';

export default function Faq() {
  useSeo({ ...seo.faq, path: '/faq' });
  return (
    <>
      <PageHead crumbs={[{ nome: 'Perguntas frequentes' }]} titulo="Perguntas frequentes" lead="O que a maioria das pessoas quer saber antes de agendar." />
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <ListaFaq />
        </div>
      </section>
      <CtaBand titulo="Ficou com alguma dúvida?" />
    </>
  );
}
