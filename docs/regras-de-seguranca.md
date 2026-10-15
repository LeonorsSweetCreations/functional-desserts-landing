# Cinco regras de segurança para projetos de software

Estas cinco regras aplicam-se a qualquer projeto, linguagem ou framework. Servem para orientar o desenvolvimento e a revisão de funcionalidades, rotas, ações, ferramentas MCP e migrações. Trata sempre os dados externos como não fiáveis.

## Como usar este ficheiro

1. Guarda este ficheiro no teu projeto, por exemplo em `docs/regras-de-seguranca.md`.
2. No ficheiro de instruções do teu assistente de programação (por exemplo, `AGENTS.md` ou `CLAUDE.md`), acrescenta: «Antes de implementar ou rever código, lê e aplica as regras de `docs/regras-de-seguranca.md`. Adapta os mecanismos à tecnologia do projeto e indica o que foi verificado e o que ficou por verificar.»
3. Em cada alteração, verifica as regras nas partes afetadas. Numa revisão completa, inventaria os pontos de entrada, operações sobre dados, integrações e configurações, e verifica todas as cinco categorias.
4. Regista problemas encontrados com a respetiva localização, evidência, impacto e proposta de correção. Usa dados fictícios e um ambiente de testes para confirmar os controlos de acesso.

As instruções orientam o trabalho do assistente; a proteção depende dos controlos implementados e verificados no código, na base de dados e na infraestrutura. Estas cinco categorias são um mínimo de revisão, não uma certificação de segurança.

## 1. Dados isolados por utilizador e organização

Identifica primeiro o mecanismo real: RLS, middleware de tenant, repositórios com âmbito obrigatório, filtros por proprietário ou equivalente. Confirma a pertença do utilizador à organização no servidor; um `tenant_id` vindo do pedido não constitui autorização.

Revê listagens, pesquisas, contagens, agregações, relatórios, exportações, caches, tarefas e armazenamento. Verifica leituras e escritas, incluindo alterações de proprietário/organização. As chaves de cache e as tarefas devem preservar o âmbito autorizado.

Em Supabase/Postgres: verifica RLS e políticas aplicáveis por operação (`USING`/`WITH CHECK`), grants, papéis efetivos e clientes que contornam RLS. Funções `SECURITY DEFINER` exigem autorização, `search_path` seguro e privilégios mínimos; views exigem análise dos privilégios efetivos, incluindo escrita através de views com direitos do proprietário. Prefere `security_invoker` quando adequado e suportado. Tabelas internas fechadas e acesso público intencional precisam de evidência do contrato; `USING (true)` ou ausência de RLS, isoladamente, não provam exploração. As restrições mais fortes do projeto mantêm-se.

## 2. Permissões verificadas no servidor

Cruza cada condição de UI (`isAdmin`, `canEdit`, `role`…) com a operação correspondente. Revê também operações sem UI. O servidor deve validar autenticação e privilégio em cada entrada sensível, diretamente ou por controlo central cuja cobertura esteja demonstrada; oculta-se a UI apenas por conveniência.

Identidade e permissões provêm de fontes verificadas pelo servidor. Atributos do pedido ou metadados editáveis pelo utilizador não elevam privilégios. Um JWT só é fonte de confiança após validação criptográfica e das condições aplicáveis (emissor, destinatário, validade e atualização/revogação das permissões); não confundas claims controlados pelo emissor com campos editáveis pelo cliente. Valida os campos que cada papel pode alterar para impedir atribuição indevida de `role`, `tier` ou proprietário.

## 3. Acesso a objetos autorizado, mesmo conhecendo o ID (IDOR)

Percorre todos os handlers do âmbito que recebem identificadores no caminho, query, corpo, listas ou referências aninhadas. Confirma autorização para consultar, alterar e eliminar o objeto e respetivas relações. UUIDs imprevisíveis não substituem autorização.

A regra é acesso autorizado por posse, pertença, partilha ou privilégio documentado; não é obrigatoriamente «só o dono». Confirma o controlo efetivo no servidor/BD e os caminhos que o contornam. Quando o projeto exigir defesa em profundidade, combina uma verificação explícita na rota/ação com proteção na base de dados. Uma RLS efetiva pode implementar a autorização; não classifiques como IDOR a mera ausência de uma comparação local duplicada, sem verificar os controlos efetivos. Evita que a verificação e a escrita possam atuar sobre âmbitos diferentes; verifica a condição também na operação ou transação adequada. Responde sem revelar dados não autorizados (403 ou 404 segundo o contrato).

## 4. Segredos protegidos em todo o ciclo de vida

Procura chaves de API, tokens, palavras-passe, segredos JWT/webhook, chaves privadas e credenciais predefinidas no código, configuração, Docker/Compose, Helm, Terraform, CI, scripts, documentação e artefactos. Inclui valores alternativos como `${VAR:-segredo-publico}` e confirma que o arranque recusa segredos ausentes ou predefinidos inseguros nos ambientes relevantes.

Inspeciona o histórico Git disponível (declara refs e limites, incluindo clones parciais), bundles do frontend, source maps e logs acessíveis no âmbito. Um segredo removido do ficheiro atual pode continuar no histórico; recomendar revogação/rotação e revisão de utilização, não apenas apagar a linha.

Segredos ficam no servidor/cofre com privilégios mínimos. `NEXT_PUBLIC_*`, `VITE_*` ou equivalente significa exposição, não segurança. Distingue identificadores e chaves concebidas para serem públicas de credenciais privilegiadas; uma chave pública Supabase não é, por si, uma fuga. Confirma as restrições que a acompanham. Usa a proteção de módulos do framework (`server-only` quando aplicável). Ficheiros locais com segredos ficam fora do Git, com permissões restritas; exemplos contêm apenas placeholders inequívocos.

## 5. Dados validados e saídas protegidas no contexto certo

Valida no servidor tipos, tamanhos, formatos e campos permitidos; mantém constraints/invariantes na BD quando aplicáveis. Validação no cliente melhora a experiência, mas não protege o servidor. Parametriza queries; identificadores/operadores dinâmicos exigem listas de valores permitidos. Usa igualdade para identidade e autorização. `LIKE`/`ILIKE` podem servir pesquisas deliberadas, com parâmetros e tratamento explícito de wildcards; não servem comparações exatas de identidade.

Para XSS, segue dados controláveis até `innerHTML`, `dangerouslySetInnerHTML`, `v-html`, `[innerHTML]`, mecanismos que desativam escape, Markdown/HTML, `href`/`src`, `eval` e `new Function`. Confirma se o framework faz escape, que protocolos URL são permitidos e se a biblioteca de sanitização está efetivamente aplicada com configuração adequada; a mera instalação não protege. No servidor, verifica HTML em emails, templates e respostas. Não confundas um uso com conteúdo constante com uma vulnerabilidade explorável.

Texto simples usa escape automático/saídas textuais; HTML permitido usa sanitização adequada antes da inserção. Proteções dependem do contexto (HTML, atributo, URL, JavaScript, CSV), não de uma função universal «sanitizar». CSP é defesa adicional. CSV exige análise de fórmulas, mesmo com campos entre aspas; conteúdo de mensagens não deve transformar-se em instruções ou ações.

Uploads: destino definido no servidor, autorização, limites de tamanho e validação do conteúdo/tipo real; não confiar apenas no MIME enviado. IA: contexto isolado por utilizador, ferramentas autorizadas no servidor, limites de pedidos/custo e resistência a instruções contidas em dados. Quando presentes, revê também injeção SQL/comandos, SSRF, travessia de caminhos, CSRF, sessões, assinaturas/repetição de webhooks e dependências/configuração de publicação; reporta achados dessas classes separadamente de XSS.

## Referências de apoio

- [OWASP — autorização](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [OWASP — prevenção de XSS](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

Consulta a documentação oficial da versão detetada quando o comportamento de um mecanismo não estiver demonstrado no código.
