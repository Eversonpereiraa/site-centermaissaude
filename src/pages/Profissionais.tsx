import { seo } from '../content/seo';
import { profissionais } from '../content/profissionais';
import { useSeo } from '../lib/seo';
import { CtaBand, PageHead, Pendente } from '../components/Ui';

export default function Profissionais() {
  useSeo({ ...seo.profissionais, path: '/profissionais', noindex: profissionais.length === 0 });
  return (
    <>
      <PageHead crumbs={[{ nome: 'Profissionais' }]} titulo="Quem cuida de você na Center Mais Saúde" />
      <section className="section">
        <div className="container">
          {profissionais.length === 0 ? (
            <p>
              <Pendente>nome, especialidade, registro profissional e foto de cada profissional</Pendente>
            </p>
          ) : (
            <ul className="spec-rail" style={{ gridAutoColumns: 'min(78%, 260px)' }}>
              {profissionais.map((p) => (
                <li className="spec-card" key={p.nome}>
                  <div className="spec-card__art">{p.foto && <img src={p.foto} alt={`${p.nome}, ${p.especialidade}`} loading="lazy" />}</div>
                  <div className="spec-card__body">
                    <h2 className="spec-card__name">{p.nome}</h2>
                    <p>
                      {p.especialidade}
                      <br />
                      <span className="field__hint">{p.registro}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
