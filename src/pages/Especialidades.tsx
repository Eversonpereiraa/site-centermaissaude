import { seo } from '../content/seo';
import { especialidadesConfirmadas, totalEspecialidades } from '../content/especialidades';
import { mensagemEspecialidade } from '../lib/links';
import { useSeo } from '../lib/seo';
import { CtaBand, PageHead, WhatsAppLink } from '../components/Ui';

export default function Especialidades() {
  useSeo({ ...seo.especialidades, path: '/especialidades' });
  return (
    <>
      <PageHead
        crumbs={[{ nome: 'Especialidades' }]}
        titulo="Especialidades da Center Mais Saúde"
        lead={`${totalEspecialidades} especialidades no mesmo endereço, em Surubim. Escolha uma e agende pelo WhatsApp.`}
      />
      <section className="section">
        <div className="container">
          <ol className="spec-list">
            {especialidadesConfirmadas.map((e, i) => (
              <li className="spec-row" key={e.slug}>
                <span className="spec-row__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="spec-row__name">{e.nome}</h2>
                <WhatsAppLink className="btn btn--ghost btn--sm" mensagem={mensagemEspecialidade(e.nome)} local={`lista-${e.nome}`}>
                  Agendar {e.nome}
                </WhatsAppLink>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
