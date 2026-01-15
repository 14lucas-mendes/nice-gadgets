# Nice Gadgets - Catálogo de Dispositivos Eletrônicos

Uma plataforma moderna de e-commerce para venda de smartphones, tablets e acessórios eletrônicos, desenvolvida com Next.js 15, React 19 e Tailwind CSS. A aplicação oferece uma experiência de usuário robusta com sistema de carrinho de compras, favoritos e tema claro/escuro.

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Configuração e Instalação](#configuração-e-instalação)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Componentes Principais](#componentes-principais)
- [Contextos (State Management)](#contextos-state-management)
- [API Routes](#api-routes)
- [Tipos e Interfaces](#tipos-e-interfaces)
- [Fluxo de Dados](#fluxo-de-dados)
- [Funcionalidades](#funcionalidades)
- [Padrões e Boas Práticas](#padrões-e-boas-práticas)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

**Nice Gadgets** é uma aplicação web full-stack que funciona como um catálogo completo de produtos eletrônicos. A plataforma permite aos usuários:

- Navegar por categorias de produtos (Phones, Tablets, Acessórios)
- Visualizar detalhes completos de cada produto
- Adicionar produtos ao carrinho com controle de quantidade
- Marcar produtos como favoritos
- Alternar entre tema claro e escuro
- Filtrar e ordenar produtos por preço e ano de lançamento
- Paginação de resultados

---

## 🛠️ Tecnologias Utilizadas

### Frontend

| Tecnologia         | Versão   | Propósito                                 |
| ------------------ | -------- | ----------------------------------------- |
| **Next.js**        | 15.4.5   | Framework React com SSR/SSG               |
| **React**          | 19.1.0   | Biblioteca de UI com componentes reativos |
| **TypeScript**     | 5.x      | Tipagem estática para JavaScript          |
| **Tailwind CSS**   | 4.x      | Framework de CSS utilitário               |
| **Framer Motion**  | 12.23.12 | Animações fluidas                         |
| **Lucide React**   | 0.555.0  | Ícones SVG                                |
| **Embla Carousel** | 8.6.0    | Carrossel de imagens responsivo           |

### UI Components

- **@radix-ui/react-select**: Selects acessíveis
- **@radix-ui/react-slot**: Composição de componentes
- **class-variance-authority**: Variações de estilos
- **clsx** / **tailwind-merge**: Merge de classes CSS

### Development

| Ferramenta   | Versão | Propósito            |
| ------------ | ------ | -------------------- |
| **ESLint**   | 9.32.0 | Linting de código    |
| **Prettier** | 3.6.2  | Formatação de código |
| **Husky**    | 9.1.7  | Git hooks            |

---

## 🏗️ Arquitetura do Projeto

O projeto segue a arquitetura **App Router** do Next.js 15 com estrutura de pastas organizada:

```
src/
├── app/              # Rotas da aplicação (App Router)
├── components/       # Componentes React reutilizáveis
├── context/          # Contextos de Estado (Cart, Favorites, Theme)
├── lib/              # Utilitários compartilhados
├── types/            # Definições de tipos TypeScript
├── utils/            # Funções utilitárias e chamadas à API
└── ...
```

### Padrão de Data Flow

```
UI Components → Context (State) → localStorage
      ↓
API Routes → JSON Data (public/api)
      ↓
Components (Rendering)
```

---

## 📂 Estrutura de Diretórios

```
nice_gadgets/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout raiz com providers
│   │   ├── page.tsx                # Homepage com carrossel
│   │   ├── globals.css             # Estilos globais
│   │   ├── loading.tsx             # Skeleton de carregamento
│   │   ├── not-found.tsx           # Página 404
│   │   ├── api/
│   │   │   └── products/
│   │   │       ├── route.ts        # GET /api/products (listagem com filtro)
│   │   │       └── [productId]/
│   │   │           └── route.ts    # GET /api/products/[id] (detalhes)
│   │   └── (main)/
│   │       ├── cart/               # Página do carrinho
│   │       ├── favorite/           # Página de favoritos
│   │       └── products/
│   │           ├── [category]/     # Listagem por categoria
│   │           └── [productId]/    # Detalhes do produto
│   ├── components/
│   │   ├── Header.tsx              # Cabeçalho com navegação
│   │   ├── Footer.tsx              # Rodapé
│   │   ├── ProductCard.tsx         # Card individual de produto
│   │   ├── ProductDetailPage.tsx   # Página de detalhes
│   │   ├── Carousel.tsx            # Carrossel de imagens
│   │   ├── CartBadge.tsx           # Badge do carrinho no header
│   │   ├── FavoriteBadge.tsx       # Badge de favoritos
│   │   ├── ThemeToggle.tsx         # Botão de alternar tema
│   │   ├── FilterBar.tsx           # Filtro e ordenação
│   │   ├── ProductPagination.tsx   # Paginação
│   │   └── ui/                     # Componentes de UI base
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       └── ...
│   ├── context/
│   │   ├── CartFavoriteContext.tsx # Context de carrinho e favoritos
│   │   ├── ThemeContext.tsx        # Context de tema (light/dark)
│   │   └── index.tsx               # Hooks customizados
│   ├── types/
│   │   ├── Product.ts              # Interface de Produto
│   │   ├── ProductDetails.ts       # Interface de Detalhes
│   │   └── Slider.ts               # Tipos do carrossel
│   ├── utils/
│   │   └── products.ts             # Funções de fetch de produtos
│   └── lib/
│       └── utils.ts                # Utilitários gerais
├── public/
│   ├── api/
│   │   ├── products.json           # Catálogo completo de produtos
│   │   ├── phones.json
│   │   ├── tablets.json
│   │   └── accessories.json
│   └── img/
│       ├── icons/                  # Ícones SVG
│       └── layout/                 # Imagens de layout
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.ts
└── README.md
```

---

## ⚙️ Configuração e Instalação

### Pré-requisitos

- Node.js >= 18.0.0
- npm ou yarn

### Instalação

1. **Clone o repositório**

```bash
git clone <repository-url>
cd nice_gadgets
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
```

3. **Configure variáveis de ambiente (opcional)**

```bash
# Crie um arquivo .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3000" > .env.local
```

4. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

5. **Acesse a aplicação**

```
Abra http://localhost:3000 no seu navegador
```

---

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento com hot-reload
npm run dev

# Build para produção
npm run build

# Inicia o servidor em modo produção
npm start

# Verifica problemas de lint
npm run lint
```

---

## 🧩 Componentes Principais

### 1. **Header.tsx**

Componente de navegação principal com:

- Logo da aplicação
- Menu de navegação (Phones, Tablets, Acessórios)
- Badge do carrinho (contador de itens)
- Badge de favoritos
- Toggle de tema (light/dark)
- Menu responsivo mobile (hamburger)

**Props**: Nenhum
**Estado**: `isMenuOpen` (menu mobile)

### 2. **ProductCard.tsx**

Card reutilizável para exibir produtos:

- Imagem do produto
- Nome e especificações (tela, capacidade, RAM)
- Preço com desconto destacado
- Botão "Adicionar ao Carrinho"
- Botão "Favoritar"

**Props**:

```typescript
{
  product: {
    image: string;
    name: string;
    price: number;
    fullPrice: number;
    screen: string;
    capacity: string;
    ram: string;
    itemId: string;
    category: string;
  };
  variant?: 'default' | 'grid';
}
```

### 3. **ProductDetailPage.tsx**

Página de detalhes completos do produto:

- Carrossel de imagens
- Seletor de cor
- Seletor de capacidade de armazenamento
- Preço e informações de desconto
- Especificações técnicas
- Descrição detalhada
- Avaliações e informações adicionais

### 4. **Carousel.tsx**

Carrossel responsivo de imagens/produtos com:

- Navegação automática
- Controles de seta
- Indicadores de página
- Autoplay desabilitável

### 5. **FilterBar.tsx**

Componente de filtro e ordenação:

- Filtro por categoria
- Ordenação por: preço ascendente/descendente, ano ascendente/descendente
- Responsivo

### 6. **CartBadge.tsx** e **FavoriteBadge.tsx**

Badges no header que exibem:

- Contador de itens
- Ícone representativo
- Link para carrinho/favoritos

### 7. **ThemeToggle.tsx**

Botão para alternar tema claro/escuro:

- Persiste preferência no localStorage
- Respeita preferência do sistema (prefers-color-scheme)

---

## 📦 Contextos (State Management)

### CartFavoriteContext.tsx

Gerencia o estado de carrinho e favoritos da aplicação.

**Estado:**

```typescript
interface CartFavoriteContextType {
  cartItems: Map<string, number>; // productId -> quantidade
  favoriteItems: Set<string>; // Set de IDs de favoritos
  addToCart: (productId: string) => void;
  decrementFromCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  toggleFavorite: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  isFavorite: (productId: string) => boolean;
  cartCount: number; // Total de itens
  favoriteCount: number;
}
```

**Persistência:**

- Salva em `localStorage` com as chaves:
  - `cartItems`: JSON serializado de Map
  - `favoriteItems`: JSON serializado de Set

**Hook customizado:**

```typescript
const { cartItems, favoriteItems, addToCart, ... } = useCartFavorite();
```

### ThemeContext.tsx

Gerencia preferência de tema da aplicação.

**Estado:**

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
```

**Funcionalidades:**

- Aplica classe `.dark` ao elemento `<html>`
- Detecta automaticamente preferência do sistema na primeira visita
- Persiste escolha no `localStorage` com chave `theme`
- Reativa (muda em tempo real)

**Hook customizado:**

```typescript
const { theme, toggleTheme } = useTheme();
```

---

## 🔌 API Routes

### GET `/api/products`

Retorna lista paginada de produtos com filtros e ordenação.

**Query Parameters:**
| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `limit` | number | 10 | Quantidade de produtos por página |
| `skip` | number | 0 | Número de produtos a pular (offset) |
| `category` | string | - | Filtro por categoria (phones, tablets, accessories) |
| `sortBy` | string | - | Ordenação: `priceAsc`, `priceDesc`, `yearAsc`, `yearDesc`, `all` |

**Response:**

```typescript
{
  products: Product[];
  total: number;
}
```

**Exemplos:**

```bash
# 10 produtos mais caros
GET /api/products?limit=10&sortBy=priceDesc

# Todos os telefones ordenados por ano (mais novo primeiro)
GET /api/products?category=phones&limit=120&sortBy=yearDesc

# Produtos de acessórios com paginação
GET /api/products?category=accessories&limit=20&skip=20
```

### GET `/api/products/[productId]`

Retorna detalhes completos de um produto específico.

**Response:**

```typescript
{
  product: ProductDetails;
  category: string;
}
```

**Estrutura de `ProductDetails`:**

```typescript
{
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];          // Ex: ['64GB', '128GB', '256GB']
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];            // Ex: ['Black', 'White', 'Blue']
  color: string;
  images: string[];                     // Array de URLs de imagens
  description: Array<{
    title: string;
    text: string[];
  }>;
  screen: string;                       // Ex: '6.1" OLED'
  resolution: string;                   // Ex: '2532 x 1170'
  processor: string;                    // Ex: 'A15 Bionic'
  ram: string;                          // Ex: '6GB'
  camera: string;                       // Ex: '12MP'
  zoom: string;                         // Ex: '5x'
  cell: string[];                       // Ex: ['5G', 'LTE']
}
```

---

## 📝 Tipos e Interfaces

### Product.ts

Representa um produto no catálogo:

```typescript
export interface Product {
  id: number;
  category: string; // 'phones' | 'tablets' | 'accessories'
  itemId: string; // ID único para rota
  name: string;
  fullPrice: number; // Preço original
  price: number; // Preço com desconto
  screen: string; // Especificação de tela
  capacity: string; // Capacidade de armazenamento
  color: string; // Cor padrão
  ram: string; // Memória RAM
  year: number; // Ano de lançamento
  image: string; // URL da imagem
}
```

### ProductDetails.ts

Extensão detalhada do produto com especificações completas:

```typescript
export type ProductDetails = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Array<{ title: string; text: string[] }>;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
};

export type ProductApiResponse = {
  product: ProductDetails;
  category: string;
};
```

---

## 🔄 Fluxo de Dados

### Fluxo de Listagem de Produtos

```
1. Usuário navega para /products/[category]
   ↓
2. Page.tsx faz fetch de produtos via utils/products.ts
   ↓
3. API route /api/products retorna dados filtrados
   ↓
4. Componentes ProductCard renderizam com dados
   ↓
5. Usuário interage → CartFavoriteContext atualiza → localStorage persiste
```

### Fluxo de Detalhes do Produto

```
1. Usuário clica em um ProductCard
   ↓
2. Router navega para /products/[category]/[productId]
   ↓
3. ProductDetailPage.tsx faz fetch via getProductById()
   ↓
4. API route /api/products/[productId] retorna detalhes
   ↓
5. Componente exibe especificações, imagens, seletores
   ↓
6. Usuário pode adicionar ao carrinho/favoritos
```

### Fluxo de Carrinho e Favoritos

```
ProductCard.tsx / ProductDetail.tsx
   ↓ (user action)
useCartFavorite() hook
   ↓
CartFavoriteContext.tsx (state update)
   ↓
useEffect → localStorage.setItem()
   ↓
Persistência de dados entre sessões
```

### Fluxo de Tema

```
ThemeContext.tsx
   ↓ (inicial: localStorage ou preferência do sistema)
useState(theme)
   ↓ (user toggles)
toggleTheme()
   ↓
document.documentElement.classList.add/remove('dark')
localStorage.setItem('theme', theme)
   ↓
Tailwind CSS (dark:) aplica estilos
```

---

## ✨ Funcionalidades

### 1. **Navegação por Categorias**

- Homepage com destaque (hot price, new badges)
- Submenu de categorias (Phones, Tablets, Acessórios)
- Links de navegação responsivos

### 2. **Listagem e Filtros**

- Visualização em grid de produtos
- Filtro por categoria
- Ordenação múltipla:
  - Por preço (ascendente/descendente)
  - Por ano de lançamento (crescente/decrescente)
- Paginação com controle de limite/offset

### 3. **Detalhes do Produto**

- Carrossel de múltiplas imagens
- Especificações técnicas completas
- Seletor de cor disponível
- Seletor de capacidade de armazenamento
- Descrição detalhada em seções
- Informações de conectividade

### 4. **Carrinho de Compras**

- Adicionar/remover produtos
- Controlar quantidade
- Visualizar total
- Limpar carrinho
- Persistência entre sessões

### 5. **Favoritos**

- Marcar/desmarcar favoritos
- Página dedicada de favoritos
- Badge de contagem no header
- Persistência entre sessões

### 6. **Tema Claro/Escuro**

- Toggle no header
- Aplicado globalmente
- Detecção automática de preferência do sistema
- Persistência de escolha

### 7. **Responsividade**

- Design mobile-first com Tailwind CSS
- Breakpoints: sm, md, lg, xl
- Menu mobile com hamburger
- Imagens otimizadas com Next.js Image

---

## 🎨 Padrões e Boas Práticas

### Organização de Código

1. **Componentes por Tipo**
   - Componentes de página em `app/(main)/`
   - Componentes reutilizáveis em `components/`
   - Componentes de UI base em `components/ui/`

2. **Separação de Responsabilidades**
   - Componentes só lidam com apresentação
   - Lógica de estado em Contexts
   - Chamadas à API em `utils/products.ts`

3. **Type Safety**
   - 100% TypeScript
   - Interfaces bem definidas
   - Uso de `enum` para enumerações (Sorting)

### Client vs Server Components

- **Server Components (padrão)**
  - Página raiz, layouts
  - Chamadas diretas à API

- **Client Components (`'use client'`)**
  - Componentes interativos
  - Que usam hooks (useState, useEffect)
  - Que acessam contextos

### CSS e Estilos

- **Tailwind CSS** para utilitários
- **CSS modules** (se necessário para escopo)
- **Variáveis CSS** para tema (--header-bg, --header-text, etc.)
- **Classe `.dark`** para modo escuro

### Performance

- Next.js Image para otimização de imagens
- Lazy loading com Embla Carousel
- Paginação para reduzir carga de dados
- localStorage em vez de múltiplas requisições

### Acessibilidade

- Componentes Radix UI (acessíveis por padrão)
- Atributos semânticos HTML
- Ícones com labels descritivos

---

## 🐛 Troubleshooting

### Problema: "Product not found" (404)

**Solução**: Verifique se o `itemId` do produto existe em `public/api/products.json`

### Problema: Carrinho/Favoritos não persiste

**Solução**: Verifique se:

1. localStorage está habilitado no navegador
2. Modo incógnito não está ativo
3. Quotas de armazenamento não foram excedidas

### Problema: Imagens não carregam

**Solução**:

1. Verifique se as URLs em `public/img/` estão corretas
2. Revise configurações CORS se estiverem em domínio externo
3. Use Next.js Image com `unoptimized={true}` se necessário

### Problema: Tema não alterna

**Solução**:

1. Verifique se `ThemeProvider` envolve a aplicação em `layout.tsx`
2. Confirme que Tailwind CSS está configurado com `darkMode: 'class'`
3. Limpe cache do navegador

### Problema: Paginação não funciona

**Solução**: Verifique se a quantidade de produtos no banco é maior que o `limit` solicitado

---

## 📚 Recursos Adicionais

### Documentação Oficial

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Variáveis de Ambiente

```bash
NEXT_PUBLIC_API_URL    # URL base da API (padrão: http://localhost:3000)
```

---

## 📄 Licença

Este projeto é de código aberto. Consulte o arquivo LICENSE para detalhes.

---

## 👨‍💻 Contribuição

Para contribuir:

1. Faça fork do repositório
2. Crie uma branch (`git checkout -b feature/sua-feature`)
3. Commit suas mudanças (`git commit -m 'Add feature'`)
4. Push para a branch (`git push origin feature/sua-feature`)
5. Abra um Pull Request

---

**Última atualização**: 15 de janeiro de 2026
**Versão**: 0.1.0
