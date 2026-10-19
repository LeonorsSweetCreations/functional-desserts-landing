# SECURITY.md

Revisão de segurança da landing page The Functional Desserts Program, feita a 12 de outubro de 2026 segundo as cinco regras em `docs/regras-de-seguranca.md`. Este documento é um registo do que foi verificado, do que foi corrigido e do que fica por confirmar antes de a página ir para produção. Não é uma certificação de segurança.

## Inventário do que existe

**Pontos de entrada**

| Entrada | Tipo | Autenticação | Notas |
|---|---|---|---|
| `GET /functionaldessertsprogram-main` | Página estática | Pública | Sem dados de utilizador no render, excepto testemunhos publicados |
| `GET /` | Redirect 308 | Pública | Definido em `next.config.ts` |
| `POST /api/leads` | Route Handler | Pública por desenho | Só cria um lead com o email que o visitante escreveu. Nunca lê, lista nem devolve dados |
| `GET /opengraph-image`, `/sitemap.xml`, `/robots.txt` | Estáticos | Pública | Conteúdo constante |

**Operações sobre dados**

| Operação | Tabela | Cliente | Quem |
|---|---|---|---|
| Inserir lead | `leads` | Service role, só no servidor | `src/lib/leads.ts` |
| Marcar lead como sincronizado | `leads` | Service role, só no servidor | id gerado no servidor, nunca vem do pedido |
| Ler testemunhos publicados | `testimonials` | Chave anon, só no servidor | `src/lib/testimonials.ts` |

**Integrações:** Supabase (base de dados), Systeme.io (contactos e tags), Google Tag Manager e Meta Pixel (só com consentimento), YouTube ou Vimeo (vídeo da hero, só depois de clique).

**Configuração:** variáveis em `.env.local` (local) e nas env vars da Vercel (produção). Exemplo com placeholders em `.env.local.example`.

## Regra 1. Dados isolados por utilizador e organização

Este projeto tem um único proprietário (a Leonor) e não tem utilizadores autenticados. O risco é o acesso público à tabela de leads.

Verificado e implementado:

- `leads` tem RLS activo e nenhuma política. Além disso, `revoke all` para os papéis `anon` e `authenticated`. Só o service role, usado no servidor, pode ler ou escrever.
- `testimonials` tem RLS activo com uma única política `select` que só devolve linhas com `is_published = true`. Grants limitados a `select`.
- Nenhum pedido do browser fala directamente com o Supabase. O browser só fala com `/api/leads`.
- Não há caches, exportações, relatórios ou tarefas que atravessem âmbitos.

Fica por verificar depois de a Leonor criar o projeto Supabase: correr a migração `supabase/migrations/0001_init.sql` e confirmar no painel que a RLS aparece activa nas duas tabelas e que uma consulta com a chave anon a `leads` devolve zero linhas.

## Regra 2. Permissões verificadas no servidor

- O único endpoint com escrita é público por desenho e só permite a operação "criar lead para o email submetido". Não existe UI de administração nesta aplicação; a gestão de leads e testemunhos faz-se no painel do Supabase, que tem a sua própria autenticação.
- O servidor fixa os campos que grava. O cliente não controla `consent` (forçado a `true` depois de validado), `synced_to_systeme`, `systeme_contact_id`, `id` nem `created_at`.
- O schema de validação é `strict()`: qualquer campo desconhecido no corpo (por exemplo `role`) rejeita o pedido com 400. Testado.
- Não há JWT nem sessões nesta aplicação.

## Regra 3. Acesso a objectos autorizado (IDOR)

- Nenhum handler recebe identificadores do cliente. O único id usado (`leads.id`) é gerado no servidor na inserção e usado logo a seguir para marcar a sincronização.
- A resposta da API é sempre `{"ok":true}` para pedidos aceites. Antes devolvia `duplicate` e `backend`, o que permitia enumerar emails registados e revelava infraestrutura. Corrigido.
- Erros de validação devolvem só "Invalid input", sem os detalhes do schema.

## Regra 4. Segredos protegidos em todo o ciclo de vida

Verificado:

- Nenhum segredo no código, na configuração, na documentação ou nos scripts. Pesquisa feita por padrões de chaves (Stripe, JWT, AWS, chaves privadas) sem resultados.
- `.env*` está no `.gitignore`; `.env.local.example` é a única excepção e só tem placeholders vazios ou nomes de tags.
- Ainda não existe repositório Git, logo não há histórico a limpar. Quando se criar, o primeiro commit já terá o `.gitignore` em vigor.
- `SUPABASE_SERVICE_ROLE_KEY` e `SYSTEME_API_KEY` não têm prefixo `NEXT_PUBLIC_` e só são lidos em módulos marcados com `import "server-only"`, que falham o build se forem importados por um componente de cliente. Módulos: `src/lib/supabase.ts`, `systeme.ts`, `leads.ts`, `leads-mock.ts`, `testimonials.ts`.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` é pública por desenho e está protegida pela RLS e pelos grants descritos na regra 1. Mesmo assim, o browser não a usa: só o servidor.
- Os ids de GTM e Meta Pixel são interpolados em scripts inline, por isso são validados contra um formato estrito (`GTM-XXXXXX`, só dígitos). Um valor malformado é ignorado em vez de injectado.
- Em ambiente Vercel sem Supabase configurado, a API devolve 503 em vez de gravar num ficheiro local efémero e perder leads em silêncio.
- Logs de erro no servidor registam só a mensagem, nunca o corpo do pedido.

Fica por fazer na fase 3: guardar as chaves nas env vars da Vercel (nunca no repositório), e, se alguma chave for colada por engano num chat, ficheiro ou commit, revogar e rodar no Supabase e no Systeme.io.

## Regra 5. Dados validados e saídas protegidas

Validação de entrada em `/api/leads`:

- `zod` no servidor: email normalizado e validado, nome até 80 caracteres, `source` limitado a dois valores, `consent` tem de ser `true`, UTMs até 120 caracteres, campo honeypot. Schema `strict`.
- Limite de corpo de 8 KB (413 acima disso). Testado.
- Rate limit de 5 pedidos por IP em 10 minutos (429). Testado. Limitação conhecida: é em memória, por instância de servidor. Na Vercel, com várias instâncias, o limite efectivo é mais alto. Se houver abuso, activar o rate limiting da Vercel ou um store partilhado.
- Honeypot: se preenchido, responde sucesso e não grava nada.
- Na base de dados: `check` em `source`, `unique (email, source)`, `not null` nos campos essenciais.

Saídas:

- O React faz escape de todo o texto. O único `dangerouslySetInnerHTML` é o JSON-LD em `src/components/JsonLd.tsx`, com conteúdo constante do código e `<` escapado como `<`.
- Testemunhos vindos da base de dados: texto limpo e truncado no servidor; `photo_url` só é aceite se for um caminho local em `/images/` ou um URL `https` num dos dois hosts permitidos pelo `next/image`. Tudo o resto é descartado.
- Links externos usam `rel="noopener"`. Não há `target="_blank"`.
- Cabeçalhos em todas as respostas: Content-Security-Policy, X-Content-Type-Options, Referrer-Policy, X-Frame-Options, Permissions-Policy, Strict-Transport-Security. A API devolve `Cache-Control: no-store`.
- CSP: `default-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, iframes só do YouTube (nocookie), Vimeo e GTM. Limitação conhecida: `script-src` inclui `'unsafe-inline'` porque a página é pré-renderizada estaticamente (sem nonce por pedido) e o runtime do Next.js, o GTM e o Pixel dependem de scripts inline. Como a página não renderiza HTML vindo de utilizadores, o risco residual é baixo.
- Sem uploads, sem CSV, sem IA, sem webhooks, sem SSRF (o único URL externo chamado pelo servidor é fixo: `api.systeme.io`), sem travessia de caminhos (o ficheiro local de leads tem caminho fixo).
- Chamada ao Systeme.io: email codificado com `encodeURIComponent`, resposta tratada como JSON não fiável.
- Dependências: `pnpm audit --prod` sem vulnerabilidades conhecidas a 12 de outubro de 2026.

## Checklist antes de publicar (fase 3)

Nota de 15 e 16 de outubro de 2026: a página tem três formulários, lista de espera na hero e no cartão de preços e guia grátis, todos com o mesmo componente, validação e honeypot. Enviam o contacto para o Systeme.io através de `/api/leads` (`LEAD_CAPTURE=native`, predefinição). O Supabase é opcional; sem ele a rota não guarda nada localmente em produção e fala só com a API do Systeme.io, com a chave `SYSTEME_API_KEY` apenas nas variáveis de ambiente da Vercel. Sem Supabase nem chave do Systeme.io, a rota responde 503. Com `NEXT_PUBLIC_LEAD_CAPTURE=systeme` a página não tem formulários e os botões levam às páginas do Systeme.io.

- [ ] Projecto Supabase criado, migração aplicada, RLS confirmada no painel
- [ ] Teste com a chave anon: `select * from leads` devolve 0 linhas
- [x] Env vars na Vercel, nunca no repositório (2026-10-16; `SYSTEME_API_KEY` marcada como sensível)
- [x] Repositório privado no GitHub (2026-10-15)
- [x] Verificado: `git log --all -- .env.local` vazio (2026-10-15)
- [x] Cabeçalhos confirmados no deploy de produção de 2026-10-16: CSP, HSTS, nosniff, X-Frame-Options SAMEORIGIN, Referrer-Policy
- [x] Testar o formulário da lista de espera em produção e confirmar que chega ao Systeme.io (2026-10-16)
- [ ] Testar o formulário do guia grátis em produção com um email real
- [x] Ids reais de GTM e Meta Pixel em produção (2026-10-19). São identificadores públicos por desenho, passam na validação de formato, e os scripts só carregam depois de consentimento (verificado no browser: com consentimento recusado nenhum domínio de terceiros é contactado; com consentimento aceite carregam googletagmanager.com, connect.facebook.net e google-analytics.com, todos cobertos pela CSP, sem bloqueios observados)
- [ ] Rever este ficheiro sempre que se adicionar uma rota, tabela, integração ou variável

## O que não foi verificado

- Se no futuro o GTM carregar tags de terceiros não listadas na CSP, será preciso alargar `script-src` e `connect-src` em `next.config.ts`. A 19 de outubro de 2026 o contentor carregava apenas GTM, GA4 e Meta Pixel, todos já permitidos.
- Configuração da conta Vercel e do Supabase (2FA, membros, backups). Está fora do código e cabe à Leonor.

## Adenda de 12 de outubro de 2026 (rascunho visual)

- `src/app/layout.tsx` passou a ter um script inline de uma linha, com conteúdo constante (`document.documentElement.classList.add('js')`), sem dados de utilizador. Está coberto pelo `'unsafe-inline'` já existente na CSP. Verificado: não há interpolação de variáveis nesse script.
- `next.config.ts`: a CSP inclui `'unsafe-eval'` apenas quando `NODE_ENV` é `development`, porque o React em modo dev precisa dele. Verificado por leitura do código que em produção a directiva fica igual à anterior. Fica por confirmar em `pnpm build && pnpm start` que o cabeçalho enviado não contém `'unsafe-eval'`.
- Novas imagens em `public/images/` são ficheiros estáticos locais servidos por `next/image`; nenhuma vem de input do utilizador. Sem novos pontos de entrada, tabelas ou integrações.

## Adenda de 18 de outubro de 2026 (preço de lançamento)

- Nova variável pública `NEXT_PUBLIC_LAUNCH_PRICE`, lida em `src/config/site.ts`. É um valor de configuração do operador, não input de utilizador, mas mesmo assim é validada: só aceita dígitos com até duas casas decimais, tem de ser maior que zero e menor que o preço normal; qualquer outro valor é ignorado e a página mostra €299. O número validado entra no texto (escapado pelo React) e no JSON-LD como número, não como string vinda do ambiente.
- Sem novos pontos de entrada, tabelas, integrações ou segredos. O valor é público por desenho (aparece na página).
- Verificado: `pnpm lint`, `pnpm build` com e sem a variável, grep de travessões nos ficheiros alterados.

## Adenda de 18 de outubro de 2026 (abertura automática)

- Novas variáveis públicas: `NEXT_PUBLIC_LAUNCH_PRICE_UNTIL` (data ISO, ignorada se inválida) e `NEXT_PUBLIC_CHECKOUT_LAUNCH_URL` (só aceita `https` nos hosts `healthy.leonors.com` ou `leonors.com`; qualquer outro valor cai no carrinho normal, verificado com um build de teste com um host estranho). `NEXT_PUBLIC_LAUNCH_MODE` ganha o valor `auto`.
- `src/lib/launch.ts` lê o relógio dentro de uma função `use cache` com `cacheLife` de 5 minutos, a única leitura de hora no servidor. O resultado (três valores booleanos/URL) passa aos componentes por props. Sem novos pontos de entrada, tabelas, integrações ou segredos. O `router.refresh()` no fim da contagem decrescente só pede o estado ao servidor, sem dados do utilizador.
- Verificado: `pnpm lint`, `tsc`, quatro builds de produção com estados diferentes, grep de travessões.
