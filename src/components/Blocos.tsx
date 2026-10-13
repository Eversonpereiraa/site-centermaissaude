import { Link } from 'react-router-dom';
import { site } from '../content/site';
import { especialidadesConfirmadas, totalEspecialidades } from '../content/especialidades';
import { faqVisivel } from '../content/faq';
import { mensagemEspecialidade } from '../lib/links';
import { JsonLd } from '../lib/seo';
import { Motif, WhatsAppLink } from './Ui';

export function FactsBar() {
  const [semana, sabado] = site.horarios;
  const fatos = [
    { valor: semana.textoCurto, rotulo: semana.dias },
    { valor: sabado.textoCurto, rotulo: sabado.dias },
    { valor: `${totalEspecialidades} especialidades`, rotulo: 'No mesmo endereço' },
    { valor: 'Hora marcada', rotulo: `${site.cidadesAtendidas.length} cidades atendidas` },
  ];
  return (
    <div className="container facts">
      <ul className="facts__card" aria-label="Informações da clínica">
        {fatos.map((f) => (
          <li className="fact" key={f.rotulo}>
            <div className="fact__value">{f.valor}</div>
            <div className="fact__label">{f.rotulo}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CartaoEspecialidade({ nome, variante, foto, fotoAlt }: { nome: string; variante: number; foto?: string; fotoAlt?: string }) {
  return (
    <li className="spec-card">
      <div className="spec-card__art">{foto ? <img src={foto} alt={fotoAlt ?? ''} loading="lazy" /> : <Motif variante={variante} />}</div>
      <div className="spec-card__body">
        <h3 className="spec-card__name">{nome}</h3>
        <WhatsAppLink className="spec-card__link" mensagem={mensagemEspecialidade(nome)} local={`especialidade-${nome}`}>
          Agendar {nome}
        </WhatsAppLink>
      </div>
    </li>
  );
}

export function FaixaEspecialidades() {
  return (
    <ul className="spec-rail" aria-label="Especialidades" tabIndex={0}>
      {especialidadesConfirmadas.map((e, i) => (
        <CartaoEspecialidade key={e.slug} nome={e.nome} variante={i} foto={e.foto} fotoAlt={e.fotoAlt} />
      ))}
    </ul>
  );
}

export function ListaFaq() {
  return (
    <>
      <div className="faq">
        {faqVisivel.map((p) => (
          <details key={p.pergunta}>
            <summary>{p.pergunta}</summary>
            <p className="faq__a">{p.resposta}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqVisivel.map((p) => ({
            '@type': 'Question',
            name: p.pergunta,
            acceptedAnswer: { '@type': 'Answer', text: p.resposta },
          })),
        }}
      />
    </>
  );
}

export function Passos() {
  return (
    <ol className="steps">
      <li className="step">
        <span className="step__n" aria-hidden="true">1</span>
        <div>
          <h3>Escolha a especialidade</h3>
          <p>Veja a lista e decida com qual profissional você quer marcar. Se tiver dúvida, a equipe orienta.</p>
        </div>
      </li>
      <li className="step">
        <span className="step__n" aria-hidden="true">2</span>
        <div>
          <h3>Fale com a equipe</h3>
          <p>Chame no WhatsApp ou ligue para {site.telefone.exibicao}. A equipe combina o dia e o horário com você.</p>
        </div>
      </li>
      <li className="step">
        <span className="step__n" aria-hidden="true">3</span>
        <div>
          <h3>Venha no dia combinado</h3>
          <p>Estamos na {site.endereco.rua}, bairro {site.endereco.bairro}. O atendimento é sempre com hora marcada.</p>
        </div>
      </li>
    </ol>
  );
}

export function SeoLocalBusiness() {
  const dados: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: site.nomeCompleto,
    legalName: site.razaoSocial,
    url: site.url,
    image: `${site.url}/og.jpg`,
    logo: `${site.url}/assets/marca/logo.png`,
    telephone: site.telefone.e164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.endereco.rua,
      addressLocality: site.endereco.cidade,
      addressRegion: site.endereco.uf,
      postalCode: site.endereco.cep,
      addressCountry: 'BR',
    },
    openingHoursSpecification: site.horarios.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.schema,
      opens: h.abre,
      closes: h.fecha,
    })),
    areaServed: site.cidadesAtendidas.map((c) => ({ '@type': 'City', name: c })),
    sameAs: [site.instagram.url, ...(site.facebook ? [site.facebook] : [])],
  };
  if (site.geo) dados.geo = { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng };
  return <JsonLd data={dados} />;
}

export function LinkEspecialidades({ texto = 'Ver todas as especialidades' }: { texto?: string }) {
  return (
    <Link className="link-more" to="/especialidades">
      {texto}
    </Link>
  );
}
