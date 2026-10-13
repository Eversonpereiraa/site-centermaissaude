import { site } from '../content/site';

const CHAVE = 'cms-consentimento';
export type Consentimento = 'aceito' | 'recusado' | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function lerConsentimento(): Consentimento {
  try {
    const v = localStorage.getItem(CHAVE);
    return v === 'aceito' || v === 'recusado' ? v : null;
  } catch {
    return null;
  }
}

export function salvarConsentimento(valor: Exclude<Consentimento, null>) {
  try {
    localStorage.setItem(CHAVE, valor);
  } catch {
    /* navegação privada: segue sem persistir */
  }
  if (valor === 'aceito') carregarGA();
}

let carregado = false;

/** Só carrega o GA4 se houver ID e consentimento. */
export function carregarGA() {
  const id = site.ga4Id;
  if (!id || carregado || lerConsentimento() !== 'aceito') return;
  carregado = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', id, { send_page_view: false });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
}

export function pageView(path: string, title: string) {
  window.gtag?.('event', 'page_view', { page_path: path, page_title: title });
}

/** Eventos: whatsapp_click, phone_click, form_submit, generate_lead (página /obrigado). */
export function track(evento: string, params: Record<string, unknown> = {}) {
  window.gtag?.('event', evento, params);
}
