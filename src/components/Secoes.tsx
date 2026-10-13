import { Link } from 'react-router-dom';
import { enderecoLinha, site } from '../content/site';
import { listaEmTexto, mapsEmbedSrc, mapsRotaHref, wazeHref } from '../lib/links';
import { track } from '../lib/analytics';
import { Pendente, Reveal, TelLink, WhatsAppLink } from './Ui';

/** Fotos provisórias: frames do vídeo "onde fica". Troque pelos originais em /public/assets/fotos. */
export const FOTOS = {
  fachada: { src: '/assets/fotos/provisorio-fachada.webp', alt: 'Fachada da Center Mais Saúde, com o letreiro azul em 3D e a porta de vidro da recepção', legenda: 'Fachada' },
  consultorioAzul: { src: '/assets/fotos/provisorio-consultorio-azul.webp', alt: 'Consultório com parede pintada em ondas azuis e bege, cadeira branca e almofada azul', legenda: 'Consultório' },
  placa: { src: '/assets/fotos/provisorio-placa.webp', alt: 'Placa branca com a palavra Consultório ao lado de uma porta', legenda: 'Corredor dos consultórios' },
  salaArco: { src: '/assets/fotos/provisorio-sala-arco.webp', alt: 'Sala de atendimento com parede em arco e bancada branca', legenda: 'Sala de atendimento' },
  poltrona: { src: '/assets/fotos/provisorio-poltrona.webp', alt: 'Sala com poltrona bege e parede pintada em azul', legenda: 'Sala com poltrona' },
};

export function Sobre() {
  const f = FOTOS.consultorioAzul;
  return (
    <section className="section" aria-labelledby="sobre-titulo">
      <div className="container about">
        <figure className="about__media">
          <img src={f.src} alt={f.alt} width="720" height="1280" loading="lazy" style={{ objectPosition: '50% 60%' }} />
          <Pendente className="foto-pendente">foto original em alta resolução</Pendente>
        </figure>
        <Reveal>
          <div className="about__text">
            <span className="eyebrow">Quem somos</span>
            <h2 id="sobre-titulo">Vários cuidados, um único endereço.</h2>
            <p className="lead">
              A Center Mais Saúde é um centro de saúde integrado em Surubim. Reunimos várias especialidades no mesmo espaço,
              e isso ajuda a acompanhar a saúde da família sem ir de consultório em consultório.
            </p>
            <ul className="points">
              <li className="point">
                <span className="point__n">01</span>
                <div>
                  <h3>Um só endereço</h3>
                  <p>Especialidades médicas e terapêuticas no mesmo lugar.</p>
                </div>
              </li>
              <li className="point">
                <span className="point__n">02</span>
                <div>
                  <h3>Da Pediatria à Geriatria</h3>
                  <p>Atendimento para crianças, adultos e idosos.</p>
                </div>
              </li>
              <li className="point">
                <span className="point__n">03</span>
                <div>
                  <h3>Atendimento humanizado</h3>
                  <p>O agendamento é prévio, por WhatsApp ou telefone, e a equipe acolhe cada paciente.</p>
                </div>
              </li>
            </ul>
            <Link className="btn btn--ghost" to="/quem-somos">
              Conheça a clínica
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Estrutura() {
  const fotos = [FOTOS.placa, FOTOS.salaArco, FOTOS.poltrona];
  return (
    <section className="section section--dark on-dark" aria-labelledby="estrutura-titulo">
      <div className="container estrutura">
        <div style={{ display: 'grid', gap: 'var(--s-3)', justifyItems: 'start' }}>
          <span className="eyebrow" style={{ color: 'var(--sky)' }}>A clínica por dentro</span>
          <h2 id="estrutura-titulo">Espaços pensados para <span className="hl">receber bem</span>.</h2>
          <p className="lead">Salas claras, paredes pintadas à mão e um atendimento que começa na recepção.</p>
          <Pendente>fotos originais e autorização de imagem</Pendente>
        </div>
        <div className="estrutura__grid" style={{ ['--n' as string]: fotos.length }}>
          {fotos.map((f) => (
            <figure className="estrutura__item" key={f.src}>
              <img src={f.src} alt={f.alt} width="720" height="1280" loading="lazy" />
              <figcaption>{f.legenda}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Local({ comVideo = false }: { comVideo?: boolean }) {
  const [semana, sabado] = site.horarios;
  return (
    <section className="section section--sand" aria-labelledby="local-titulo">
      <div className="container">
        <div className="section__head">
          <h2 id="local-titulo">Como chegar</h2>
        </div>
        <div className="contact-grid">
          <div style={{ display: 'grid', gap: 'var(--s-4)', alignContent: 'start' }}>
            <dl className="info-list" style={{ margin: 0 }}>
              <div>
                <dt>Endereço</dt>
                <dd>{enderecoLinha}</dd>
              </div>
              <div>
                <dt>Horários</dt>
                <dd className="hours">
                  <span>
                    <strong>{semana.dias}:</strong> {semana.textoCurto}
                  </span>
                  <span>
                    <strong>{sabado.dias}:</strong> {sabado.textoCurto}
                  </span>
                  <span>Atendimento mediante agendamento prévio.</span>
                </dd>
              </div>
              <div>
                <dt>WhatsApp e telefone</dt>
                <dd>
                  <TelLink local="local" />
                </dd>
              </div>
              <div>
                <dt>Cidades atendidas</dt>
                <dd>{listaEmTexto(site.cidadesAtendidas)}</dd>
              </div>
            </dl>
            <div className="btn-row">
              <a className="btn btn--primary" href={mapsRotaHref} target="_blank" rel="noopener noreferrer" onClick={() => track('rota_click', { app: 'google-maps' })}>
                Como chegar (Google Maps)
              </a>
              <a className="btn btn--ghost" href={wazeHref} target="_blank" rel="noopener noreferrer" onClick={() => track('rota_click', { app: 'waze' })}>
                Abrir no Waze
              </a>
              <WhatsAppLink className="btn btn--ghost" local="local">
                Agendar consulta
              </WhatsAppLink>
            </div>
            <p className="notice">
              <strong>Urgência ou emergência?</strong> A clínica não é pronto-socorro. Ligue para o SAMU (192) ou procure um pronto-atendimento.
            </p>
            <p className="field__hint">
              <Pendente>pino do Google Maps da clínica e ponto de referência de acesso</Pendente>
            </p>
          </div>
          <div style={{ display: 'grid', gap: 'var(--s-4)' }}>
            <iframe
              className="map"
              title="Mapa com a localização da Center Mais Saúde, em Surubim"
              src={mapsEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            {comVideo && (
              <figure className="video">
                <video controls preload="none" playsInline poster="/assets/video/poster.webp" aria-describedby="video-legenda">
                  <source src="/assets/video/onde-fica.mp4" type="video/mp4" />
                  Seu navegador não reproduz este vídeo.
                </video>
                <figcaption id="video-legenda">
                  Vídeo: a entrada e as salas da clínica.{' '}
                  <Pendente>autorização de imagem das pessoas do vídeo e legendas</Pendente>
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Só aparece se houver o link real do perfil no Google. Nunca cria nota, estrelas ou depoimentos. */
export function Avaliacoes() {
  if (!site.avaliacoesUrl) return null;
  return (
    <section className="section" aria-labelledby="aval-titulo">
      <div className="container" style={{ display: 'grid', gap: 'var(--s-3)', justifyItems: 'start' }}>
        <h2 id="aval-titulo">O que pacientes dizem</h2>
        <p className="lead">Leia as avaliações reais da clínica no Google.</p>
        <a className="btn btn--ghost" href={site.avaliacoesUrl} target="_blank" rel="noopener noreferrer">
          Ver avaliações no Google
        </a>
      </div>
    </section>
  );
}
