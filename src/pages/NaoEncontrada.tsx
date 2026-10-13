import { Link } from 'react-router-dom';
import { seo } from '../content/seo';
import { useSeo } from '../lib/seo';
import { WhatsAppLink, Wave } from '../components/Ui';

export default function NaoEncontrada() {
  useSeo({ ...seo.naoEncontrada, path: '/404', noindex: true });
  return (
    <>
      <section className="container nf">
        <span className="nf__code" aria-hidden="true">404</span>
        <h1>Não encontramos esta página.</h1>
        <p className="lead">O endereço pode ter mudado ou ter sido digitado errado. Veja por onde seguir:</p>
        <div className="nf__links">
          <Link className="btn btn--primary" to="/">Voltar ao início</Link>
          <Link className="btn btn--ghost" to="/especialidades">Especialidades</Link>
          <Link className="btn btn--ghost" to="/contato">Como chegar</Link>
          <WhatsAppLink className="btn btn--ghost" local="404">Falar no WhatsApp</WhatsAppLink>
        </div>
      </section>
      <Wave from="var(--bg)" to="var(--sand)" />
      <div style={{ background: 'var(--sand)', height: 'var(--s-5)' }} />
    </>
  );
}
