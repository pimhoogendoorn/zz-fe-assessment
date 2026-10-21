# AGENTS.md

## Commands

```
pnpm build      # tsc -b && vite build
pnpm dev        # vite
pnpm test        # vitest (watch mode)
pnpm test:run    # vitest run (CI mode)
pnpm test:run -- src/path/      # single test file
pnpm lint         # eslint .
pnpm typecheck    # tsc --noEmit
pnpm format       # prettier --write .
```

Order: `lint → typecheck → test:run` before declaring work complete.

## Stack

React 19 · TypeScript 5.9 (strict) · Vite 8 · Vitest · Zod · React-hook-form · Tailwind CSS v4 (PostCSS) · ESLint flat config · Prettier

## Architecture

- `src/App.tsx` — root component (entry point via `src/main.tsx`)
- `src/components/` — React components (one folder per component)
- `src/schemas/` — Zod validation schemas + inferred types; mirrors component surface
- `src/lib/` — pure utility functions (e.g. price calculation, formatting)
- `src/types/` — shared TypeScript interfaces (`Plan`, `Addon`, `InsuranceApiResponse`)
- `data/insurance-plans.json` — mock API data served by Vite dev server
- Tests live in `src/**/__tests__/` alongside their source — not in a separate `tests/` directory

Path alias `@/*` → `./src/*` (tsconfig + vite config).

## Testing

- Vitest config: `vitest.config.ts` — jsdom environment, setup file at `src/test-setup.ts`, globals enabled
- Tests match: `src/**/*.{test,spec}.{ts,tsx}`
- Setup file imports `@testing-library/jest-dom/vitest`

## Code Style

- Named exports only. No default exports. (`src/App.tsx` uses `export default` — exception for root component only.)
- No `any` — use `unknown` and narrow.
- Infer types where possible.
- No enums.
- `const` by default; `let` only when reassignment is needed.
- Async: `async/await` only. No `.then()` chains.
- Error messages: lowercase, no trailing period.
- Constants: `UPPER_SNAKE_CASE`. Functions: `camelCase`.
- Interfaces: `PascalCase`, prefix with `I`.
- Types: `PascalCase`. Files: `kebab-case`.
- No Typescript import aliasing. Change type or variable names.

## Prettier

`semi: false` · `singleQuote: true` · `trailingComma: "all"` · `printWidth: 100` · `tabWidth: 2` · `endOfLine: "lf"`

## Rules

- Keep changes focused per task. The repo follows OpenSpec task-based workflow (`openspec/changes/`).
- No `.env` files committed. No `.env.example` exists — this repo doesn't use env vars.
- No headless UI component libraries. Bare HTML inputs are the pattern.
- No router. State is React `useState` + potential context; URL search params for step navigation (no hash routing).
