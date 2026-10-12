# Contribuindo

## Antes de alterar

1. Leia [a arquitetura](docs/architecture.md) e a proposta de refatoração.
2. Escolha um único problema com comportamento observável.
3. Crie uma branch a partir de `develop` ou da branch da dependência declarada:
   - `docs/<escopo>` para documentação;
   - `fix/<escopo>` para correções;
   - `refactor/<escopo>` para reorganização sem mudança de produto;
   - `chore/<escopo>` para automação e ferramentas.
4. Registre no PR a motivação, os arquivos principais, os riscos e a validação.

## Escopo de PR

Cada PR deve ter um propósito único e uma descrição que explique o comportamento antes e depois. Não misture formatação ampla, atualização de dependências ou mudanças visuais sem relação com o problema.

Quando uma PR depender de outra ainda não integrada, use a branch da dependência como base e indique isso na descrição. Depois da integração, retargete para `develop` e confira o diff.

## Qualidade obrigatória

Execute, quando o ambiente permitir:

```bash
npm ci
npm run validate:data
npm run lint
npx tsc --noEmit
npm run build
```

As suítes de contrato são introduzidas nas PRs que implementam cada regra:

| Regra | Comando | PR |
| --- | --- | --- |
| Persistência e restauração | `npm run test:persistence` | [#4](https://github.com/14lucas-mendes/nice-gadgets/pull/4) |
| Filtros e paginação | `npm run test:catalog` | [#5](https://github.com/14lucas-mendes/nice-gadgets/pull/5) |

Execute cada comando quando a PR correspondente estiver na base local. Após a integração, ambos passam a fazer parte da validação normal do projeto. Não adicione testes que apenas repetem a implementação.

Para mudanças de UI, verifique teclado, foco, estados vazios, loading/error, tema claro/escuro e pelo menos um viewport móvel. Registre limitações quando a verificação visual não puder ser executada.

## Dados locais

- Preserve `itemId` como identidade persistida.
- Não introduza fallback silencioso para IDs, anos ou quantidades inválidas.
- Valide dados externos antes de convertê-los para `Map`, `Set` ou estado global.
- Mantenha detalhes completos no servidor sempre que o cliente precisar apenas do resumo.

## Commits e revisão

Use mensagens curtas no imperativo, por exemplo `fix: valida página da URL`. Antes de pedir revisão, confira o diff completo, a base da PR e os checks do CI. Responda aos comentários com a alteração realizada ou com a justificativa técnica para manter o comportamento.
