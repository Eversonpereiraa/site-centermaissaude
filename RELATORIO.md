# Relatório de entrega: site Center Mais Saúde (Surubim-PE)

## O que foi construído
React + TypeScript + Vite. Páginas: Início, Quem somos, Especialidades, Profissionais (oculta enquanto não houver dados), Localização e contato (`/contato`), Agendamento, FAQ, Política de privacidade, Obrigado e 404.

Início, na ordem: cabeçalho, hero, faixa de fatos reais, Quem somos, Especialidades, (Profissionais, se houver dados), Estrutura, Como agendar, FAQ, Como chegar, (Avaliações, se houver link) e faixa final de contato.

## Decisões de direção de arte
- Paleta do logo (`#322680`, `#016DAB`) e do ambiente (azul-céu, bege, dourado pontual). Sem rosa e sem verde.
- Outfit (títulos) + Figtree (texto), hospedadas no próprio site (`@fontsource-variable`), sem chamada ao Google Fonts.
- Forma assinatura: o arco e a onda das paredes pintadas da clínica. Aparece no recorte das fotos e nos cartões de especialidade sem foto.
- Estrutura do Anaverse sem nada de hospital: sem 24h, UTI, leitos, notas, números inventados ou notícias.
- Estrutura antes de Profissionais, como combinado.

## Checklist de 20 itens
| # | Item | Situação |
|---|---|---|
| 1 | 404 personalizada | Feito |
| 2 | CTAs com verbo e texto específico | Feito |
| 3 | URLs limpas e links de contato | Feito. Sem página individual por especialidade: não há texto real |
| 4 | Seção de cases | Não aplicável (saúde, sem casos reais) |
| 5 | Página `/obrigado` | Feito |
| 6 | Breadcrumbs + BreadcrumbList | Feito (páginas internas) |
| 7 | FAQ com 5 perguntas + FAQPage | Feito |
| 8 | Promessa de resposta | **Pendente do cliente** (marcador visível) |
| 9 | CTA fixo no mobile | Feito, com área segura |
| 10 | robots.txt e sitemap.xml | Feito. Sitemap é estático: atualizar se criar páginas |
| 11 | Títulos únicos (até 60) | Feito (34 a 56) |
| 12 | Metadescriptions únicas (até 155) | Feito (65 a 133) |
| 13 | Imagem OG 1200x630 | Feito, **provisória** (usa frame do vídeo) |
| 14 | Mapa e rotas | Feito. **Pendente:** pino do Maps e ponto de referência |
| 15 | Avaliações reais | Omitida. **Pendente:** link do perfil no Google |
| 16 | Textos alternativos | Feito |
| 17 | JSON-LD `MedicalClinic` | Feito, **sem `geo`** (pendente: coordenadas) |
| 18 | Privacidade e cookies | Feito. Texto é rascunho: **revisar com responsável jurídico** |
| 19 | GA4 pós-consentimento | Implementado. **Pendente:** ID. Eventos: `whatsapp_click`, `phone_click`, `form_submit`, `generate_lead` |
| 20 | Foto real da equipe e do local | **Pendente.** Hoje há frames do vídeo (720 px), marcados na tela |

## Pendências do cliente
**Bloqueiam o lançamento:** logo vetorial/PNG transparente; fotos originais em alta resolução; autorização de imagem das pessoas e crianças do vídeo; lista confirmada de especialidades (12 estão fora da tela, em `especialidades.ts`); profissionais com nome, registro e foto; prazo real de resposta; CNPJ, responsável técnico e e-mail de privacidade; situação do domínio (quem controla, DNS, hospedagem).

**Melhoram o site:** respostas sobre convênios, valores e exames (já há 3 perguntas ocultas em `faq.ts`); e-mail e Facebook; pino do Maps; perfil do Google; ID do GA4; o que é o "Center Card" (aparece nas camisas do vídeo) e se pode aparecer; legendas do vídeo.

## Como rodar, editar e publicar
```
npm install
npm run dev        # desenvolvimento
npm run build      # gera /dist
```
- **Textos e dados:** tudo em `src/content/` (`site.ts`, `especialidades.ts`, `faq.ts`, `profissionais.ts`, `seo.ts`).
- **Cores, fontes e espaçamentos:** `src/styles/tokens.css`.
- **Fotos e logo:** substitua em `public/assets/fotos` e `public/assets/marca`. Para foto de especialidade, preencha `foto` e `fotoAlt` em `especialidades.ts`.
- **Marcadores `[PENDENTE]`:** somem com `MOSTRAR_PENDENCIAS = false` em `site.ts`. Só faça isso depois de resolver as pendências.
- **Publicar:** Netlify ou Vercel (já há `_redirects` e `vercel.json` para as rotas). Build `npm run build`, pasta `dist`.
- **Domínio:** na hospedagem, adicione `clinicacentermaissurubim.com.br`; no Registro.br (ou onde estiver), aponte o DNS como a hospedagem indicar (registro A/CNAME). Aguarde a propagação e confirme o HTTPS.
- **Depois de publicar:** colocar o link do site no perfil da clínica no Google e na bio do Instagram.

## Verificação feita
Build sem erros; todas as rotas abrem sem erro de console; sem rolagem horizontal em 375 px; formulário valida, abre o WhatsApp e leva a `/obrigado`; nenhuma especialidade não confirmada aparece na tela.
**Não verificado:** Lighthouse, 320 px, dispositivos reais, navegação por leitor de tela. Rode antes do lançamento.

## Sugestões para a segunda fase
Pré-renderização das páginas (melhora o SEO local, pois hoje o conteúdo é montado no navegador); página individual por especialidade com texto revisado pelos profissionais; blog de dicas de saúde; legendas no vídeo; troca dos frames por fotos originais.
