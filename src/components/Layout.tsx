import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { site, enderecoLinha } from '../content/site';
import { especialidadesConfirmadas } from '../content/especialidades';
import { profissionais } from '../content/profissionais';
import { carregarGA, lerConsentimento, salvarConsentimento, track, type Consentimento } from '../lib/analytics';
import { telHref, whatsappHref } from '../lib/links';
import { Pendente, TelLink, WhatsAppLink } from './Ui';

const menu = [
  { para: '/', nome: 'Início', end: true },
  { para: '/quem-somos', nome: 'Quem somos' },
  { para: '/especialidades', nome: 'Especialidades' },
  ...(profissionais.length > 0 ? [{ para: '/profissionais', nome: 'Profissionais' }] : []),
  { para: '/contato', nome: 'Como chegar' },
  { para: '/faq', nome: 'Dúvidas' },
];

function Header() {
  const [aberto, setAberto] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setAberto(false), [pathname]);
  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false);
    window.addEventListener('keydown', fechar);
    return () => window.removeEventListener('keydown', fechar);
  }, [aberto]);

  return (
    <header className="header">
      <div className="container header__bar">
        <Link to="/" className="header__logo" aria-label="Center Mais Saúde, página inicial">
          <img src="/assets/marca/logo.png" alt="Center Mais Saúde" width="88" height="44" />
        </Link>
        <nav className="nav" aria-label="Principal">
          {menu.map((i) => (
            <NavLink key={i.para} to={i.para} end={i.end}>
              {i.nome}
            </NavLink>
          ))}
        </nav>
        <WhatsAppLink className="btn btn--primary header__cta" local="cabecalho">
          Agendar consulta
        </WhatsAppLink>
        <button type="button" className="menu-btn" aria-expanded={aberto} aria-controls="menu-mobile" onClick={() => setAberto(!aberto)}>
          <span className="sr-only">{aberto ? 'Fechar menu' : 'Abrir menu'}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            {aberto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {aberto && (
        <nav id="menu-mobile" className="mobile-nav" aria-label="Principal">
          {menu.map((i) => (
            <NavLink key={i.para} to={i.para} end={i.end}>
              {i.nome}
            </NavLink>
          ))}
          <WhatsAppLink local="menu-mobile">Agendar consulta</WhatsAppLink>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer on-dark">
      <div className="container">
        <div className="footer__grid">
          <div style={{ display: 'grid', gap: 'var(--s-3)', alignContent: 'start' }}>
            <span className="footer__logo">
              <img src="/assets/marca/logo.png" alt="Center Mais Saúde" width="96" height="48" loading="lazy" />
            </span>
            <p>Centro de saúde integrado em Surubim-PE. Atendimento com hora marcada.</p>
          </div>
          <div>
            <h3>Navegue</h3>
            <ul>
              {menu.map((i) => (
                <li key={i.para}>
                  <Link to={i.para}>{i.nome}</Link>
                </li>
              ))}
              <li>
                <Link to="/agendamento">Agendamento</Link>
              </li>
              <li>
                <Link to="/privacidade">Política de privacidade</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Especialidades</h3>
            <ul>
              {especialidadesConfirmadas.map((e) => (
                <li key={e.slug}>
                  <Link to="/especialidades">{e.nome}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Contato</h3>
            <ul>
              <li>{enderecoLinha}</li>
              <li>
                <TelLink local="rodape" /> (WhatsApp)
              </li>
              <li>Seg a sex, 7h às 18h · Sáb, 7h às 13h</li>
              {site.email ? (
                <li>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
              ) : (
                <li>
                  <Pendente>e-mail</Pendente>
                </li>
              )}
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                  Instagram {site.instagram.usuario}
                </a>
              </li>
              {site.facebook ? (
                <li>
                  <a href={site.facebook} target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </li>
              ) : (
                <li>
                  <Pendente>link do Facebook</Pendente>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>Em urgência ou emergência, ligue para o SAMU (192) ou procure um pronto-atendimento. A Center Mais Saúde não é pronto-socorro.</p>
          <p>
            © {new Date().getFullYear()} {site.razaoSocial}.{' '}
            {site.cnpj ? `CNPJ ${site.cnpj}.` : <Pendente>CNPJ</Pendente>}{' '}
            {site.responsavelTecnico ? `Responsável técnico: ${site.responsavelTecnico}.` : <Pendente>responsável técnico</Pendente>}
          </p>
        </div>
      </div>
    </footer>
  );
}

/** Barra fixa no mobile: WhatsApp e ligar. Respeita a área segura do aparelho. */
function MobileBar() {
  return (
    <div className="mobilebar" role="region" aria-label="Contato rápido">
      <a
        className="btn btn--primary"
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('whatsapp_click', { local: 'barra-mobile' })}
      >
        Agendar no WhatsApp
      </a>
      <a className="btn btn--ghost" href={telHref} onClick={() => track('phone_click', { local: 'barra-mobile' })}>
        Ligar
      </a>
    </div>
  );
}

/** Só aparece se houver ID do GA4. Sem ID, o site não usa cookies de medição. */
function Cookies() {
  const [estado, setEstado] = useState<Consentimento>(lerConsentimento());
  useEffect(() => carregarGA(), []);
  if (!site.ga4Id || estado) return null;
  const escolher = (v: 'aceito' | 'recusado') => {
    salvarConsentimento(v);
    setEstado(v);
  };
  return (
    <div className="cookie on-dark" role="dialog" aria-label="Aviso de cookies">
      <p>
        Usamos cookies de medição para entender como o site é usado. Só ativamos se você aceitar. Veja a{' '}
        <Link to="/privacidade">política de privacidade</Link>.
      </p>
      <div className="btn-row">
        <button type="button" className="btn btn--light btn--sm" onClick={() => escolher('aceito')}>
          Aceitar
        </button>
        <button type="button" className="btn btn--ghost btn--sm" style={{ color: '#fff', borderColor: '#fff' }} onClick={() => escolher('recusado')}>
          Recusar
        </button>
      </div>
    </div>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  const main = useRef<HTMLElement>(null);
  const primeira = useRef(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (primeira.current) {
      primeira.current = false;
      return;
    }
    main.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <>
      <a className="skip" href="#conteudo">
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo" ref={main} tabIndex={-1} style={{ outline: 'none' }}>
        <Outlet />
      </main>
      <Footer />
      <MobileBar />
      <Cookies />
    </>
  );
}
