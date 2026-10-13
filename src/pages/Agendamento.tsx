import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { seo } from '../content/seo';
import { especialidadesConfirmadas } from '../content/especialidades';
import { site } from '../content/site';
import { track } from '../lib/analytics';
import { whatsappHref } from '../lib/links';
import { useSeo } from '../lib/seo';
import { Passos } from '../components/Blocos';
import { PageHead, PromessaResposta, TelLink, WhatsAppLink } from '../components/Ui';

type Erros = Partial<Record<'nome' | 'telefone' | 'especialidade' | 'consentimento', string>>;

/**
 * O formulário não guarda dados em servidor: monta a mensagem e abre o WhatsApp da clínica.
 * Não há campo livre, para que ninguém digite dados de saúde sem necessidade (LGPD).
 */
export default function Agendamento() {
  useSeo({ ...seo.agendamento, path: '/agendamento' });
  const navigate = useNavigate();
  const [erros, setErros] = useState<Erros>({});

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const nome = String(d.get('nome') ?? '').trim();
    const telefone = String(d.get('telefone') ?? '').trim();
    const especialidade = String(d.get('especialidade') ?? '');
    const periodo = String(d.get('periodo') ?? '');
    const consentimento = d.get('consentimento') === 'on';

    const novos: Erros = {};
    if (nome.length < 2) novos.nome = 'Informe seu nome.';
    if (telefone.replace(/\D/g, '').length < 10) novos.telefone = 'Informe um telefone com DDD.';
    if (!especialidade) novos.especialidade = 'Escolha uma especialidade.';
    if (!consentimento) novos.consentimento = 'É preciso concordar para enviar.';
    setErros(novos);
    if (Object.keys(novos).length) {
      const primeiro = Object.keys(novos)[0];
      document.getElementById(`campo-${primeiro}`)?.focus();
      return;
    }

    const mensagem =
      `Olá! Meu nome é ${nome}. Gostaria de agendar uma consulta de ${especialidade}` +
      (periodo ? ` (prefiro ${periodo})` : '') +
      `. Meu telefone para contato: ${telefone}.`;
    track('form_submit', { form: 'agendamento', especialidade });
    window.open(whatsappHref(mensagem), '_blank', 'noopener,noreferrer');
    navigate('/obrigado', { state: { mensagem } });
  }

  return (
    <>
      <PageHead
        crumbs={[{ nome: 'Agendamento' }]}
        titulo="Agende sua consulta"
        lead="Preencha os dados e a conversa abre no WhatsApp da clínica, com a mensagem pronta."
      />
      <section className="section">
        <div className="container split">
          <form className="form" onSubmit={enviar} noValidate aria-describedby="form-aviso">
            <div className="field">
              <label htmlFor="campo-nome">Seu nome</label>
              <input id="campo-nome" name="nome" autoComplete="name" aria-invalid={!!erros.nome} aria-describedby={erros.nome ? 'erro-nome' : undefined} />
              {erros.nome && <span className="field__error" id="erro-nome">{erros.nome}</span>}
            </div>
            <div className="field">
              <label htmlFor="campo-telefone">Telefone com DDD</label>
              <input id="campo-telefone" name="telefone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(81) 90000-0000" aria-invalid={!!erros.telefone} aria-describedby={erros.telefone ? 'erro-telefone' : undefined} />
              {erros.telefone && <span className="field__error" id="erro-telefone">{erros.telefone}</span>}
            </div>
            <div className="field">
              <label htmlFor="campo-especialidade">Especialidade</label>
              <select id="campo-especialidade" name="especialidade" defaultValue="" aria-invalid={!!erros.especialidade} aria-describedby={erros.especialidade ? 'erro-especialidade' : undefined}>
                <option value="" disabled>Escolha uma opção</option>
                {especialidadesConfirmadas.map((e) => (
                  <option key={e.slug} value={e.nome}>{e.nome}</option>
                ))}
                <option value="especialidade a definir com a equipe">Ainda não sei, quero orientação</option>
              </select>
              {erros.especialidade && <span className="field__error" id="erro-especialidade">{erros.especialidade}</span>}
            </div>
            <div className="field">
              <label htmlFor="campo-periodo">Período preferido (opcional)</label>
              <select id="campo-periodo" name="periodo" defaultValue="">
                <option value="">Sem preferência</option>
                <option value="manhã">Manhã</option>
                <option value="tarde">Tarde</option>
              </select>
            </div>
            <div className="field">
              <label className="check">
                <input id="campo-consentimento" type="checkbox" name="consentimento" aria-invalid={!!erros.consentimento} aria-describedby={erros.consentimento ? 'erro-consentimento' : undefined} />
                <span>
                  Concordo em enviar meu nome e telefone à {site.nome} para agendamento, conforme a <Link to="/privacidade">política de privacidade</Link>.
                </span>
              </label>
              {erros.consentimento && <span className="field__error" id="erro-consentimento">{erros.consentimento}</span>}
            </div>
            <button type="submit" className="btn btn--primary">Continuar no WhatsApp</button>
            <p className="field__hint" id="form-aviso">
              Não escreva sintomas nem dados de saúde aqui. Isso é conversado com a equipe no atendimento.
            </p>
            <PromessaResposta />
          </form>

          <div style={{ display: 'grid', gap: 'var(--s-4)', alignContent: 'start' }}>
            <div>
              <h2 style={{ fontSize: 'var(--fs-2)' }}>Prefere falar direto?</h2>
              <div className="btn-row" style={{ marginTop: 'var(--s-3)' }}>
                <WhatsAppLink local="agendamento">Chamar no WhatsApp</WhatsAppLink>
                <TelLink className="btn btn--ghost" local="agendamento" />
              </div>
            </div>
            <Passos />
          </div>
        </div>
      </section>
    </>
  );
}
