# Nice Gadgets

Vitrine de eletrônicos (smartphones, tablets e acessórios) com catálogo, carrinho, favoritos e tema claro/escuro.

🔗 **[Ver demo](https://nice-gadgets-eta.vercel.app)**

> **É um projeto só de front-end.** Não há banco de dados, backend nem API externa: os produtos são dados mockados em arquivos JSON dentro do repositório, e não existe checkout nem pagamento.

## Contexto

Projeto individual desenvolvido durante a formação na Mate Academy. Foi criado originalmente com **Next.js e Tailwind CSS**; como a formação exigia **React com CSS Modules**, o projeto foi refatorado para esse formato. Este repositório é a versão em Next.js + Tailwind.

## Funcionalidades

- Catálogo por categoria (phones, tablets e accessories), com ordenação, itens por página e paginação
- Página de detalhes de cada produto
- Carrinho e favoritos com persistência entre sessões
- Tema claro/escuro, que lembra a escolha do usuário
- Carrossel na página inicial

## Decisões técnicas

**Persistência em `localStorage`.** Como não existe backend, carrinho, favoritos e tema são salvos no navegador. Isso mantém o projeto simples, mas os dados ficam presos àquele navegador e não sincronizam entre dispositivos.

**Estado global com Context API.** O carrinho e os favoritos vivem em um contexto (`CartFavoriteContext`) e o tema em outro (`ThemeContext`). Para o tamanho do projeto, isso evita adicionar uma biblioteca de estado.

**Filtros guardados na URL.** Ordenação, itens por página e página atual ficam nos parâmetros da URL (`useCatalogFilters`). Assim, é possível compartilhar ou recarregar uma listagem sem perder o estado.

**Dados lidos no servidor, interação no cliente.** As páginas de categoria são Server Components e leem os JSON mockados por meio de funções em `lib/product-queries.ts`. Os trechos interativos (carrinho, filtros, carrossel, tema) são Client Components.

## O que o projeto ainda não tem

- Backend, banco de dados e autenticação
- Checkout e pagamento
- Testes automatizados
- A rota `GET /api/products` (com paginação, filtro e ordenação) existe, mas hoje a interface não a consome

## Tecnologias

| Área | Tecnologias |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS 4 |
| Componentes | Radix UI, Embla Carousel, Lucide React |
| Qualidade | ESLint, Prettier |
| Deploy | Vercel |

## Como rodar

Requisito: Node.js 20.9 ou superior (exigência do Next.js 16).

```bash
git clone https://github.com/14lucas-mendes/nice-gadgets.git
cd nice-gadgets
npm install
npm run dev
```

Depois abra http://localhost:3000.

Outros comandos:

```bash
npm run build   # build de produção
npm run lint    # verificação com ESLint
```

## Estrutura

```text
src/
├── app/          # rotas (App Router) e rota /api/products
├── components/   # componentes da interface
├── constants/    # valores fixos (categorias, filtros, navegação)
├── context/      # carrinho/favoritos e tema
├── data/         # produtos mockados em JSON
├── hooks/        # hooks customizados
├── lib/          # consultas, ordenação e utilitários
└── types/        # tipos TypeScript
```
