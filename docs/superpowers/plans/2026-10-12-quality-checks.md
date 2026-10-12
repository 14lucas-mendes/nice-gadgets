# Quality Checks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Atualizar a automação para a stack Next.js 16 e adicionar verificações reproduzíveis de lint, TypeScript e build.

**Architecture:** O workflow continuará sendo GitHub Actions, executado em pull requests e pushes para `develop`. A aplicação permanece sem mudança de runtime nesta PR; o pipeline apenas instala o lockfile e roda os comandos já suportados pelo projeto, usando Node 20.9+.

**Tech Stack:** GitHub Actions, Node.js 20, npm ci, ESLint 9, TypeScript, Next.js 16.

**Spec:** `docs/refactoring-proposal.md`

## Global Constraints

- Branch base: `develop`.
- Node.js mínimo: `20.9`.
- Instalação deve usar `npm ci` e o lockfile existente.
- A PR não deve alterar o comportamento da aplicação.
- Cada verificação deve falhar o workflow quando encontrar erro.

## Review Focus

- O workflow antigo aponta para Node 12 e usa actions de checkout/setup-node obsoletas.
- O workflow antigo publica `build`, embora o projeto use Next.js App Router e não configure export estático.
- O script `lint` já é `eslint .`; não reintroduzir `next lint`.
- O projeto não possui script de teste; não inventar um runner nesta PR.
- O workflow precisa validar PRs contra `develop`, não apenas deploys em uma branch que não é usada.

### Task 1: Atualizar workflow de qualidade

**Files:**
- Modify: `.github/workflows/deploy.yml`
- Modify: `package.json` somente se a verificação de tipos exigir um script explícito

**Interfaces:**
- Produces: workflow `quality` com etapas determinísticas `npm ci`, `npm run lint`, `npx tsc --noEmit` e `npm run build`.

- [ ] **Step 1: Write the failing workflow contract check**

Inspecionar o YAML atual e registrar como contrato que ele não deve conter Node 12, `build_dir: build` ou gatilho somente em `main`. A verificação será feita por leitura do arquivo após a alteração, pois o repositório não possui runner de testes de workflow.

- [ ] **Step 2: Verify the current workflow violates the contract**

Run: `git show develop:.github/workflows/deploy.yml`  
Expected: saída contendo `node-version: "12.x"`, `branches: [main]` e `build_dir: build`.

- [ ] **Step 3: Implement the workflow**

Atualizar actions para versões estáveis atuais, configurar Node 20 com cache npm, executar `npm ci`, `npm run lint`, `npx tsc --noEmit` e `npm run build`. Acionar em pull requests e pushes para `develop`. Remover o passo de publicação GitHub Pages incompatível com o deployment Vercel descrito no README.

- [ ] **Step 4: Run repository validation**

Run: `npm ci && npm run lint && npx tsc --noEmit && npm run build`  
Expected: os quatro comandos terminam com código 0. Se o ambiente não permitir instalar dependências ou acessar o registry, registrar o bloqueio e não afirmar que a PR está validada.

- [ ] **Step 5: Verify the workflow contract**

Run: `git show HEAD:.github/workflows/deploy.yml`  
Expected: Node 20, gatilhos `develop` para push/PR e as quatro etapas de qualidade; nenhum Node 12 ou `build_dir: build`.

- [ ] **Step 6: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: valida lint, tipos e build no Next.js"
```

## Self-review

- Spec coverage: esta PR cobre somente a etapa de qualidade/CI; persistência, dados, catálogo, componentes e acessibilidade permanecem nas PRs seguintes.
- Step scan: cada passo tem um resultado observável e não prescreve implementação além dos contratos do workflow.
- Type consistency: os comandos usam scripts e dependências presentes em `package.json`.
- Review focus: cada risco listado tem uma verificação explícita.
- Proportion: o plano é limitado ao primeiro subsistema e não mistura mudanças de produto.
