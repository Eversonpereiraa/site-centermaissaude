import { seo } from '../content/seo';
import { site } from '../content/site';
import { useSeo } from '../lib/seo';
import { PageHead, Pendente } from '../components/Ui';

export default function Privacidade() {
  useSeo({ ...seo.privacidade, path: '/privacidade' });
  return (
    <>
      <PageHead crumbs={[{ nome: 'Política de privacidade' }]} titulo="Política de privacidade" lead="Como tratamos os dados de quem visita este site, conforme a Lei Geral de Proteção de Dados (LGPD, Lei 13.709/2018)." />
      <section className="section">
        <div className="container prose">
          <h2>Quem é o responsável</h2>
          <p>
            {site.razaoSocial} (nome fantasia {site.nome}), {site.endereco.rua}, {site.endereco.bairro}, {site.endereco.cidade}-{site.endereco.uf}.{' '}
            {site.cnpj ? `CNPJ ${site.cnpj}.` : <Pendente>CNPJ</Pendente>}
          </p>
          <p>
            Contato sobre privacidade:{' '}
            {site.emailPrivacidade ? <a href={`mailto:${site.emailPrivacidade}`}>{site.emailPrivacidade}</a> : <Pendente>e-mail do responsável pela privacidade</Pendente>}
          </p>

          <h2>Quais dados coletamos</h2>
          <ul>
            <li>
              <strong>Formulário de agendamento:</strong> nome, telefone, especialidade escolhida e período preferido. Esses dados são usados para montar a mensagem de WhatsApp enviada à clínica. O site não os guarda em servidor próprio.
            </li>
            <li>
              <strong>WhatsApp e telefone:</strong> ao conversar com a equipe, valem também as regras do WhatsApp (Meta) e da operadora.
            </li>
            <li>
              <strong>Medição de acesso:</strong> se você aceitar o aviso de cookies, usamos o Google Analytics para entender quais páginas são mais visitadas. Se recusar, nada é medido.
            </li>
            <li>
              <strong>Mapa e vídeo:</strong> o mapa é do Google Maps e carrega quando a página de localização é aberta.
            </li>
          </ul>

          <h2>Para que usamos</h2>
          <p>Para responder ao seu pedido de agendamento e para melhorar o site. Não vendemos nem compartilhamos seus dados para publicidade.</p>

          <h2>Dados de saúde</h2>
          <p>O site não pede sintomas nem informações de saúde. Esse tipo de conversa acontece no atendimento, com a equipe da clínica.</p>

          <h2>Seus direitos</h2>
          <p>
            Você pode pedir confirmação de que tratamos seus dados, acesso, correção, anonimização, eliminação, portabilidade e informações sobre compartilhamento, além de revogar o consentimento a qualquer momento (art. 18 da LGPD). Para isso, fale com o contato de privacidade acima.
          </p>

          <h2>Cookies</h2>
          <p>Cookies de medição só são ativados com o seu aceite. Você pode apagar os cookies pelo navegador quando quiser.</p>

          <h2>Atualizações</h2>
          <p>Esta política pode mudar. A data da última revisão é outubro de 2026.</p>
        </div>
      </section>
    </>
  );
}
