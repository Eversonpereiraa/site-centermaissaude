import { Link } from 'react-router-dom';
import { seo } from '../content/seo';
import { profissionais } from '../content/profissionais';
import { useSeo } from '../lib/seo';
import { FactsBar, FaixaEspecialidades, LinkEspecialidades, ListaFaq, Passos, SeoLocalBusiness } from '../components/Blocos';
import { Avaliacoes, Estrutura, FOTOS, Local, Sobre } from '../components/Secoes';
import { CtaBand, Pendente, PromessaResposta, Reveal, WhatsAppLink } from '../components/Ui';

export default function Home() {
  useSeo({ ...seo.inicio, path: '/' });
  const foto = FOTOS.fachada;
  return (
    <>
      <SeoLocalBusiness />
      <section className="hero" aria-labelledby="hero-titulo">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow">Surubim-PE · Atendimento com hora marcada</span>
            <h1 id="hero-titulo">
              Várias especialidades, <span className="hl">um só lugar</span> para cuidar da sua família.
            </h1>
            <p className="lead">
              A Center Mais Saúde reúne especialidades médicas e terapêuticas em Surubim. O atendimento é humanizado e feito com hora marcada.
            </p>
            <div className="hero__cta">
              <WhatsAppLink local="hero">Agendar consulta</WhatsAppLink>
              <Link className="btn btn--ghost" to="/especialidades">
                Ver especialidades
              </Link>
            </div>
            <PromessaResposta />
          </div>
          <figure className="hero__media">
            <img src={foto.src} alt={foto.alt} width="720" height="1280" fetchPriority="high" />
            <span className="hero__dot" aria-hidden="true" />
            <Pendente className="foto-pendente">foto original em alta resolução</Pendente>
          </figure>
        </div>
        <FactsBar />
      </section>

      <Sobre />

      <section className="section section--sand" aria-labelledby="esp-titulo">
        <div className="container">
          <div className="section__head">
            <h2 id="esp-titulo">Especialidades</h2>
            <LinkEspecialidades />
          </div>
          <FaixaEspecialidades />
        </div>
      </section>

      {profissionais.length > 0 && (
        <section className="section" aria-labelledby="prof-titulo">
          <div className="container">
            <div className="section__head">
              <h2 id="prof-titulo">Profissionais</h2>
              <Link className="link-more" to="/profissionais">
                Ver todos os profissionais
              </Link>
            </div>
          </div>
        </section>
      )}

      <Estrutura />

      <section className="section" aria-labelledby="agendar-titulo">
        <div className="container split">
          <Reveal>
            <div style={{ display: 'grid', gap: 'var(--s-3)', justifyItems: 'start' }}>
              <span className="eyebrow">Como agendar</span>
              <h2 id="agendar-titulo">Três passos, sem fila de espera na porta.</h2>
              <p className="lead">A clínica atende somente com agendamento prévio. É rápido e você resolve pelo celular.</p>
              <WhatsAppLink local="como-agendar">Agendar consulta</WhatsAppLink>
            </div>
          </Reveal>
          <Passos />
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="faq-titulo">
        <div className="container split split--rev">
          <div>
            <ListaFaq />
          </div>
          <div style={{ display: 'grid', gap: 'var(--s-3)', justifyItems: 'start', alignContent: 'start' }}>
            <span className="eyebrow">Perguntas frequentes</span>
            <h2 id="faq-titulo">Dúvidas comuns antes de agendar.</h2>
            <Link className="link-more" to="/faq">
              Ver página de perguntas
            </Link>
          </div>
        </div>
      </section>

      <Local />
      <Avaliacoes />
      <CtaBand />
    </>
  );
}
