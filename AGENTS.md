# Repository Guidelines

## Project Structure & Module Organization
`src/` contains the library source. Core toast behavior lives in `src/core/`, reusable UI in `src/components/`, state in `src/store/`, composables in `src/composables/`, and shared helpers in `src/utils/`. Styles are authored in `src/styles/`. Tests live in `__tests__/`, usually grouped by feature (for example `__tests__/toast/`). The local demo app is in `playground/`, and VitePress documentation is in `docs/`.

## Build, Test, and Development Commands
- `pnpm dev` - run the playground against source files.
- `pnpm dev:use-bundle` - watch the packaged build and open the playground with the bundle.
- `pnpm build` - build the library with Vite and generate CSS output.
- `pnpm build:tsup` - build TypeScript bundles with `tsup` plus CSS assets.
- `pnpm test` or `pnpm test:ui` - run Vitest in CLI or UI mode.
- `pnpm lint` - run ESLint on `ts`, `tsx`, and `vue` files.
- `pnpm stylelint` - validate `css`, `scss`, and `vue` styles.
- `pnpm typecheck` - run `tsc` and `vue-tsc`.
- `pnpm docs` / `pnpm build:docs` - develop or build the docs site.

Use Node `>=20` and the workspace package manager in `package.json` (`pnpm@10`).

## Coding Style & Naming Conventions
Follow `.editorconfig`: UTF-8, LF line endings, final newline, and 2-space indentation. ESLint enforces single quotes, semicolons, trailing commas in multiline objects and arrays, and consistent spacing. Keep TypeScript and TSX components aligned with existing patterns such as `ToastItem.tsx`, `ProgressBar.tsx`, and `useCssTransition.ts`. Use `PascalCase` for components, `camelCase` for functions and variables, and keep feature files grouped by domain.

## Skills

A skill is a set of local instructions to follow, stored in a `SKILL.md` file.

### Available skills

- git-push: Pull, commit, and push current changes with commitlint-compatible message format. (file: .agents/skills/git-push/SKILL.md)
- skill-creator: Create and iteratively improve skills with eval workflow support. (file: .agents/skills/skill-creator/SKILL.md)

### Trigger rules

- If the user explicitly names a skill, use it.
- If the task clearly matches a skill description above, proactively use that skill.
- Multiple matches can be combined, but keep to the minimal set needed.

## Claude Feature Mapping In Codex

- Claude hooks are mapped to procedural rules:
  - Before finalizing code changes, run `npm run check`.
  - If analysis fails, report the failure and include key errors.
- Claude plugins are not auto-loaded in Codex. Equivalent behavior should be implemented through project skills and MCP servers.

## Testing Guidelines
Vitest runs in `jsdom` with Testing Library helpers from `setupTests.ts`. Add tests in `__tests__/` using `*.test.ts`, `*.test.tsx`, or existing `*.spec.ts` patterns. Place focused feature tests near related suites, for example toast option behavior under `__tests__/toast/`. Cover new public behavior and regression fixes before opening a PR.

## Commit & Pull Request Guidelines
Commits follow Conventional Commit style enforced by Husky and Commitlint, e.g. `feat: add controlled progress example` or `fix: avoid duplicate container ids`. Allowed types include `feat`, `fix`, `docs`, `refactor`, `test`, and `chore`. Before pushing, run `pnpm lint`, `pnpm stylelint`, and `pnpm typecheck`; the pre-commit hook does the same. PRs should include a short summary, linked issue when applicable, and screenshots or GIFs for playground or docs UI changes.
