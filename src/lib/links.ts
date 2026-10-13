import { enderecoLinha, site } from '../content/site';

export const MENSAGEM_PADRAO = 'Olá! Gostaria de agendar uma consulta na Center Mais Saúde.';

export const whatsappHref = (mensagem: string = MENSAGEM_PADRAO) =>
  `https://wa.me/${site.telefone.whatsapp}?text=${encodeURIComponent(mensagem)}`;

export const mensagemEspecialidade = (nome: string) =>
  `Olá! Gostaria de agendar uma consulta de ${nome} na Center Mais Saúde.`;

export const telHref = `tel:${site.telefone.e164}`;
export const mailHref = (email: string) => `mailto:${email}`;

const destino = encodeURIComponent(enderecoLinha);
export const mapsRotaHref = `https://www.google.com/maps/dir/?api=1&destination=${destino}`;
export const wazeHref = `https://waze.com/ul?q=${destino}&navigate=yes`;
export const mapsEmbedSrc = `https://www.google.com/maps?q=${destino}&output=embed`;

export const listaEmTexto = (itens: string[]) =>
  itens.length < 2 ? itens.join('') : `${itens.slice(0, -1).join(', ')} e ${itens[itens.length - 1]}`;
