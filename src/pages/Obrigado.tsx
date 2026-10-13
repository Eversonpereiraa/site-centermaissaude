import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { seo } from '../content/seo';
import { track } from '../lib/analytics';
import { whatsappHref } from '../lib/links';
import { useSeo } from '../lib/seo';
import { PageHead, PromessaResposta } from '../components/Ui';

export default function Obrigado() {
  useSeo({ ...seo.obrigado, path: '/obrigado', noindex: true });
  const { state } = useLocation() as { state: { mensagem?: string } | null };
  useEffect(() => track('generate_lead', { form: 'agendamento' }), []);
  return (
    <>
      <PageHead crumbs={[{ nome: 'Agendamento', para: '/agendamento' }, { nome: 'Obrigado' }]} titulo="Pronto, falta só enviar a mensagem" />
      <section className="section">
        <div className="container prose">
          <p className="lead">Abrimos o WhatsApp da clínica com a sua mensagem. Basta tocar em enviar.</p>
          <h2>Próximos passos</h2>
          <ul>
            <li>Envie a mensagem no WhatsApp. A equipe confirma o dia e o horário com você.</li>
            <li>Atendemos de segunda a sexta, das 7h às 18h, e aos sábados, das 7h às 13h.</li>
            <li>O atendimento é com hora marcada. Venha somente depois de combinar o horário.</li>
          </ul>
          <PromessaResposta />
          <div className="btn-row">
            {state?.mensagem && (
              <a className="btn btn--primary" href={whatsappHref(state.mensagem)} target="_blank" rel="noopener noreferrer">
                O WhatsApp não abriu? Toque aqui
              </a>
            )}
            <Link className="btn btn--ghost" to="/">
              Voltar ao início
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
