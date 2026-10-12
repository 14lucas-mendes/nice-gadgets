# Proposta de refatoração do Nice Gadgets

Status: proposta para revisão; implementação ainda não iniciada.

## Objetivo e limites

Melhorar legibilidade, modularização, separação de responsabilidades, desempenho e experiência de uso. Cada mudança significativa terá branch e PR próprias, direcionadas a `develop`.

A proposta mantém Next.js, React, TypeScript e Tailwind e a natureza de demonstração com dados locais. Não inclui pagamentos, autenticação ou banco de dados. Comentários devem explicar decisões, invariantes e limitações; evitar narrar operações óbvias.

## Base da análise

Leitura da branch `develop`, commit `6ac3f82e41b0dc42914f0e8289459e95c173885c`, em 12/10/2026. Nenhuma PR aberta foi encontrada no momento da consulta. A árvore consultada não contém AGENTS.md.

O projeto já possui componentes separados para catálogo, carrinho e detalhes. A prioridade é corrigir fronteiras e duplicações existentes antes de criar novas abstrações.

Esta é uma revisão estática do código. O clone falhou por indisponibilidade de conexão ao proxy do ambiente. Não foram executados lint, TypeScript, build, testes nem auditoria visual no navegador. Os riscos de UI/UX abaixo vêm do código; contraste, sobreposição, responsividade e comportamento real ainda precisam de capturas e testes.

## Evidências encontradas

| Evidência | Consequência | Prioridade |
| --- | --- | --- |
| `.github/workflows/deploy.yml` usa Node 12, actions antigas e publica a pasta `build`, sem configuração correspondente no Next.js | Workflow incompatível com a stack atual; falta validação em PRs | Alta |
| `CartFavoriteContext.tsx` lê e escreve armazenamento em efeitos separados, escreve estado inicial antes de concluir a restauração e não valida estrutura nem quantidades | Risco de sobrescrita durante inicialização, especialmente sob Strict Mode; dados inválidos podem quebrar contagens | Alta |
| Leituras de localStorage e gravações não têm tratamento completo de falhas; `ThemeContext.tsx` também grava o tema inicial antes da restauração | Armazenamento indisponível pode quebrar a interação; preferência salva pode ser sobrescrita | Alta |
| `constants/products.ts` duplica o carregamento e as consultas de `lib/product-data.ts` | Constantes contêm responsabilidades de acesso a dados | Média |
| `useProductsFromIds.ts` importa consultas que carregam os JSON de detalhes | Dados e descrições completos podem entrar no grafo do cliente de carrinho e favoritos | Alta |
| `product-mapper.ts` converte slugs em id 0 e usa ano 2023 como fallback; `data/products.json` já possui ids e anos reais | Identidade numérica e ordenação por novidade podem ser incorretas | Alta |
| `getProductsByCategory` limita categorias a 120 antes da paginação da interface | Possibilidade de ocultar produtos e apresentar contagens incompletas | Alta |
| `useCatalogFilters.ts` faz casts sem validar parâmetros; `catalog-utils.ts` usa parseInt sem normalização | URLs inválidas podem produzir página vazia e total de páginas inválido | Alta |
| `ProductPagination` fabrica um evento React vazio para chamar o consumidor | Contrato de componente desnecessário e frágil | Média |
| Botões em ProductCard e ProductDetail duplicam ações, estilos e timers; botão “Added” remove o produto ao clicar | Manutenção duplicada e ação potencialmente inesperada | Alta |
| `CheckoutModal` não gerencia foco, Escape ou semântica de diálogo; confirmar apaga o carrinho | Fluxo difícil pelo teclado; efeito da confirmação merece comunicação explícita | Alta |
| Menu móvel bloqueia scroll no Header, mas não tem controle de foco ou Escape | Risco de navegação por teclado sair do menu aberto | Alta |
| `context/index.tsx` contém outra implementação de item do carrinho | UI fora da camada correta; remoção depende de confirmar consumidores | Média |
| Textos misturam português e inglês, enquanto o documento usa lang=en | Inconsistência de linguagem e acessibilidade | Média |

## Abordagem

Recomendada: refatoração incremental, com alterações verificáveis e contratos pequenos. Cada PR documenta comportamento, evidências, validações e limitações.

Alternativas consideradas: reescrever a organização inteira de uma vez aumentaria conflitos e dificultaria revisão; limitar-se a formatação deixaria os problemas de dados, persistência e acessibilidade sem tratamento.

## Fronteiras propostas

- Rotas de servidor compõem páginas e acessam o catálogo.
- Camada de dados concentra carregamento, consultas e índices por identidade.
- Funções puras normalizam parâmetros e calculam ordenação, paginação e transições de carrinho.
- Providers cuidam do estado e usam um adaptador seguro de persistência.
- Hooks conectam estado e navegação sem duplicar algoritmos.
- Componentes de domínio compõem controles reutilizáveis; componentes básicos não conhecem Context ou dados do catálogo.
- A camada de cliente recebe resumos necessários; detalhes completos permanecem no servidor.
- Preservar itemId como identidade persistida e as chaves atuais de armazenamento, validando seu conteúdo.

## Divisão proposta em branches e PRs

| Ordem | Branch | Mudança significativa | Critério de aceitação |
| --- | --- | --- | --- |
| 0 | `docs/refactoring-proposal` | Registrar esta análise e proposta | Limitações e evidências descritas; nenhuma mudança de produto |
| 1 | `chore/quality-checks` | Preparar lint, checagem de tipos, testes relevantes e CI com Node suportado; corrigir workflow legado | Instalação pelo lockfile, lint, tipos, testes e build executados e registrados; alinhar configuração ESLint ao Next.js após verificar compatibilidade |
| 2 | `fix/persisted-shopping-state` | Separar operações de carrinho e favoritos da persistência; restaurar antes de gravar; proteger tema e armazenamento | Quantidades inteiras positivas, restauração sob Strict Mode, JSON corrompido e storage bloqueado cobertos; manter carrinho utilizável em memória quando storage falhar |
| 3 | `refactor/product-data-boundaries` | Remover carregamento de constantes; usar resumos confiáveis; corrigir ids/anos e fronteira servidor/cliente; eliminar truncamento implícito | Ordenação usa anos reais, consultas retornam produtos corretos, totais incluem a categoria completa e bundle cliente não inclui JSON de detalhes |
| 4 | `fix/catalog-url-pagination` | Normalizar parâmetros da URL e API com funções puras; limitar página aos resultados; simplificar contrato de paginação | URL inválida tem fallback consistente; voltar/avançar restaura filtros; filtros reiniciam página; API aceita somente paginação inteira finita e responde de forma documentada |
| 5 | `refactor/shared-product-actions` | Compartilhar controles de carrinho/favoritos e quantidade; remover delays simulados; corrigir o significado de “Added” | Card e detalhes têm comportamento consistente; adicionar não remove silenciosamente; remover é explícito; estados acessíveis; componentes sem timers artificiais |
| 6 | `fix/accessible-checkout-dialog` | Criar diálogo reutilizável com foco, Escape e retorno ao acionador; explicar simulação e limpeza do carrinho | Tab permanece no diálogo, Escape fecha, foco retorna, cancelar preserva carrinho; confirmação comunica seu efeito e fornece feedback |
| 7 | `fix/mobile-navigation-accessibility` | Corrigir foco, fechamento e semântica do menu móvel; validar mudança de viewport | Menu abre e fecha pelo teclado, devolve foco, fecha ao navegar e não mantém scroll preso no desktop |
| 8 | `docs/architecture-and-contributing` | Documentar arquitetura final, comandos, contratos, componentes e limites; registrar auditoria visual e recomendações restantes | Documentação corresponde ao código entregue e distingue testes realizados de pendências |

Os nomes são propostos; cada branch de implementação só deve ser criada quando seu escopo estiver pronto. A PR 0 contém somente este documento.

## Dependências e estratégia de branches

Todas as PRs têm um único propósito. Partir de `develop` para mudanças independentes. A PR 3 e a PR 4 podem evoluir independentemente da PR 2, respeitando os arquivos compartilhados.

Se uma PR depender de outra ainda não integrada, usar uma branch baseada na dependência e apontar sua PR para aquela branch, identificando a dependência na descrição. Depois da integração, ajustar a base para `develop` e verificar o diff novamente. Não copiar mudanças de outra PR nem fazer merge automático.

## Validação

Antes de alterar produto, obter uma cópia completa e executável, instalar pelo lockfile e registrar o estado inicial. Não atribuir à refatoração falhas preexistentes.

- Funções de domínio: testes de quantidades, validação, ordenação, paginação e identidade.
- Persistência: restauração, falhas de leitura/escrita, conteúdo inválido e montagem sob Strict Mode.
- Integração: catálogo → detalhes → adicionar → carrinho → recarregar → remover; favoritos → recarregar.
- Navegador: desktop e celular, temas claro/escuro, navegação por teclado e capturas antes/depois.
- Diálogo: abertura, Tab/Shift+Tab, Escape, cancelamento, confirmação e retorno do foco.
- Qualidade: lint, TypeScript, testes relevantes e build por PR. Não introduzir testes que apenas repitam o código.

## UI/UX: decisões propostas e pendências

Adotar ações explícitas: adicionar ao carrinho não funciona como remoção oculta; favoritos são um toggle com estado pressionado; quantidade usa controle próprio. A simulação precisa explicar que confirmar limpa o carrinho e não processa pagamento.

A UI atualmente predominante é em inglês. Preservar esse idioma nesta primeira etapa e uniformizar os textos de controles alterados. Uma localização completa em português exige uma PR própria se escolhida, com mudança do lang e revisão de todos os textos.

O próximo ciclo visual deve capturar início, categoria, detalhes, carrinho vazio/com itens, favoritos, modal e menu móvel. Só depois das capturas propor alterações de espaçamento, contraste, tamanhos de alvo e responsividade com evidência visual. Esta proposta não afirma que essa auditoria já ocorreu.

## Revisão da proposta

Revisão interna: escopo dividido, prioridades ligadas a arquivos reais, ausência de metas inventadas de desempenho e explicitação das verificações ainda não executadas.

Aprovação desta proposta define o escopo arquitetural. O plano de implementação detalhado e a execução serão preparados após essa revisão; cada mudança continuará em branch e PR separadas.
