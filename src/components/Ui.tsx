import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { MOSTRAR_PENDENCIAS, site } from '../content/site';
import { MENSAGEM_PADRAO, telHref, whatsappHref } from '../lib/links';
import { track } from '../lib/analytics';
import { JsonLd } from '../lib/seo';

/** Marcador visível de dado que falta. Some quando MOSTRAR_PENDENCIAS = false. */
export function Pendente({ children, className = '' }: { children: ReactNode; className?: string }) {
  if (!MOSTRAR_PENDENCIAS) return null;
  return <span className={`pendente ${className}`}>[PENDENTE: {children}]</span>;
}

export function WhatsAppLink({
  children = 'Agendar consulta',
  mensagem = MENSAGEM_PADRAO,
  className = 'btn btn--primary',
  local,
}: {
  children?: ReactNode;
  mensagem?: string;
  className?: string;
  local: string;
}) {
  return (
    <a
      className={className}
      href={whatsappHref(mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('whatsapp_click', { local })}
    >
      {children}
    </a>
  );
}

export function TelLink({ children, className = '', local }: { children?: ReactNode; className?: string; local: string }) {
  return (
    <a className={className} href={telHref} onClick={() => track('phone_click', { local })}>
      {children ?? site.telefone.exibicao}
    </a>
  );
}

/** Divisor com a curva das paredes pintadas da clínica. */
export function Wave({ from, to, flip = false }: { from: string; to: string; flip?: boolean }) {
  return (
    <svg className={`wave ${flip ? 'wave--flip' : ''}`} viewBox="0 0 1200 64" preserveAspectRatio="none" aria-hidden="true" style={{ background: from }}>
      <path d="M0 64 V34 C150 4 260 8 380 30 S620 62 760 40 S1020 2 1200 28 V64 Z" fill={to} />
    </svg>
  );
}

/** Cartão sem foto: composição gráfica da marca (arco, onda, ponto dourado e cruz). */
const MOTIVOS = [
  { bg: '#322680', arco: '#8fc1de', onda: '#016dab', cruz: '#ffffff' },
  { bg: '#8fc1de', arco: '#f3ece2', onda: '#016dab', cruz: '#322680' },
  { bg: '#f3ece2', arco: '#8fc1de', onda: '#322680', cruz: '#016dab' },
  { bg: '#016dab', arco: '#f3ece2', onda: '#322680', cruz: '#ffffff' },
];

export function Motif({ variante = 0 }: { variante?: number }) {
  const c = MOTIVOS[variante % MOTIVOS.length];
  return (
    <svg className="motif" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="300" fill={c.bg} />
      <path d="M30 300 V170 a86 86 0 0 1 172 0 V300 Z" fill={c.arco} />
      <path d="M0 236 C80 196 150 276 240 236 S360 196 400 220 V300 H0 Z" fill={c.onda} />
      <circle cx="318" cy="84" r="22" fill="#b8964a" />
      <path d="M338 160h14v14h14v14h-14v14h-14v-14h-14v-14h14z" fill={c.cruz} transform="translate(0 -10)" />
    </svg>
  );
}

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visto, setVisto] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisto(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisto(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${visto ? 'is-in' : ''} ${className}`}>
      {children}
    </div>
  );
}

export function Breadcrumbs({ itens }: { itens: { nome: string; para?: string }[] }) {
  const todos = [{ nome: 'Início', para: '/' }, ...itens];
  return (
    <>
      <nav className="crumbs" aria-label="Você está em">
        <ol>
          {todos.map((i, idx) => (
            <li key={i.nome}>
              {idx < todos.length - 1 && i.para ? <Link to={i.para}>{i.nome}</Link> : <span aria-current="page">{i.nome}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: todos.map((i, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: i.nome,
            item: site.url + (i.para ?? ''),
          })),
        }}
      />
    </>
  );
}

export function PageHead({ crumbs, titulo, lead }: { crumbs: { nome: string; para?: string }[]; titulo: string; lead?: string }) {
  return (
    <header className="page-head">
      <div className="container">
        <Breadcrumbs itens={crumbs} />
        <h1>{titulo}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </header>
  );
}

/** Faixa final de contato: chamada à esquerda, cartão com telefone à direita. */
export function CtaBand({ titulo = 'Vamos marcar a sua consulta?' }: { titulo?: string }) {
  return (
    <section className="section" aria-labelledby="cta-final">
      <div className="container">
        <div className="cta-band on-dark">
          <div style={{ display: 'grid', gap: 'var(--s-2)', justifyItems: 'start' }}>
            <h2 id="cta-final">{titulo}</h2>
            <p className="lead">O atendimento é com hora marcada. Fale com a equipe e informe a especialidade.</p>
            <p>Seg a sex, 7h às 18h · Sáb, 7h às 13h</p>
          </div>
          <div className="cta-band__card">
            <span className="eyebrow">WhatsApp e telefone</span>
            <TelLink className="cta-band__tel" local="faixa-final" />
            <WhatsAppLink local="faixa-final">Agendar consulta no WhatsApp</WhatsAppLink>
            <PromessaResposta />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Prazo de retorno informado pela clínica. Sem prazo, mostra o marcador de pendência. */
export function PromessaResposta() {
  if (site.promessaResposta) return <p className="field__hint">{site.promessaResposta}</p>;
  return (
    <p className="field__hint">
      <Pendente>prazo real de resposta da clínica</Pendente>
    </p>
  );
}
