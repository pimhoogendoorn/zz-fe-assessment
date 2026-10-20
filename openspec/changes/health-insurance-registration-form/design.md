## Context

Greenfield React + TypeScript project in `/zz-fe-assessment`. No existing codebase, no legacy constraints. The form captures personal data, selects a mandatory basic insurance plan, and optionally adds supplementary coverage packages, with a live-updating receipt panel.

## Goals / Non-Goals

**Goals:**
- Three-step registration flow with progressive disclosure
- Real-time validation with Zod schemas
- Sticky receipt panel (sidebar on desktop, top on mobile)
- `localStorage` persistence with debounced writes
- Skeleton loading and error states for API fetch failures
- Unit and integration tests with Vitest + Testing Library, written before implementation (TDD)

**Non-Goals:**
- Authentication or user accounts
- Payment processing
- Multi-language support (Dutch-only)
- SSR or static generation (Vite SPA only)

## Decisions

### Vite + React + TS + Tailwind (no component library)
Minimal dependency surface. Tailwind utility classes replace a component library. Users own every line of UI code, enabling full customization without theming workarounds.

### React Context (not Zustand)
Form spans only 3 steps + 1 receipt panel. Context avoids prop drilling without the extra bundle cost of Zustand. The `persist` pattern is trivial to implement manually.

### React Hook Form + `@hookform/resolvers/zod`
RHF handles field state, focus, blur, and submission lifecycle. Zod provides schema definitions. The `zodResolver` bridges them without duplicate validation logic.

### `public/api/insurance-plans.json` served by Vite (not MSW)
Static JSON served from `public/` maps 1:1 to production endpoints. One config change swaps to real endpoints. No Service Worker setup, no MSW overhead.

### `localStorage` + `setTimeout` debounce (500ms)
Debounced writes reduce localStorage churn on every keystroke. 500ms balances responsiveness with performance. Data clears on successful submit.

### Price rounding on display only
Raw `number` values stored in state. `Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' })` handles rounding at render time. No precision loss in state.

### Error hook with Sentry stub
Try/catch around fetch calls. On failure, log to console with a comment noting where to wire Sentry `captureException` or New Relic `noticeError`.

### Test Driven Development with Vitest
All tests are written before implementation code. Pure functions (schemas, calculations) are tested first, then hooks, then components. Vitest with jsdom replaces Jest as the test runner. @testing-library/react enables user-interaction-style tests. The test file lives alongside source: `src/schemas/personal.ts` → `src/schemas/__tests__/personal.test.ts`.

### Secure Coding Practices
All user input goes through Zod `.trim()` and `.max()` constraints. Zero `dangerouslySetInnerHTML` — React escapes text by default which prevents XSS. URL params only carry step number (`?step=N`), never PII. POST payload sent to `/api/registration` uses `application/json` Content-Type (not form-urlencoded) to prevent CSRF via simple HTML forms.

### URL Search Params for Step Navigation
Step is driven by `?step=N` in the URL. `history.pushState` updates on navigation, `popstate` listens for back/forward. On mount, the URL is read and validated: if the requested step's previous step has no saved data in localStorage, the user is redirected to the earliest incomplete step. This is implemented as a `useStepURL` hook that reads from URL, writes to URL, and validates via localStorage.

### Data-Driven Rendering
Plan cards and addon checkboxes are rendered by mapping over data arrays. No hardcoded components, no `if (id === 'basis')`, no per-item switch statements. Adding an item to `basicInsurance` or `additionalInsurance` in the JSON file requires zero code changes — the mapping renders it automatically. This applies to Step 2 plan cards, Step 3 checkbox list, and the receipt lines that list selected items.

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| localStorage quota exceeded | User loses form data | Catch `QuotaExceededError`, notify user, fallback to in-memory |
| PII in localStorage | Privacy concern | User-controlled, same-origin, cleared on submit. No URL params. |
| Context re-renders on every state change | Performance degradation | `useMemo` for derived receipt calculations, `useCallback` for setters |
| Debounce delay causes lost data on crash | Minor | Browser handles localStorage persistence; data survives tab crash |
| Mock API diverges from production | Deployment friction | Mock and production share the same data contract (TypeScript interfaces) |

## Migration Plan

Greenfield project — no migration needed. When production API exists:

1. Replace `api/fetchPlans` to call real endpoint
2. Replace `api/submitRegistration` to POST to real endpoint
3. Remove `public/api/insurance-plans.json`

## Open Questions

| Question | Impact | Decision |
|----------|--------|----------|
| React 18 vs 19 | Minor | Default to latest stable via Vite preset |
| Form reset after submit | UX | Clear localStorage + reset form context on POST success |
| Date format in form input | UX | Native `<input type="date" />` — locale-neutral, no custom picker |
