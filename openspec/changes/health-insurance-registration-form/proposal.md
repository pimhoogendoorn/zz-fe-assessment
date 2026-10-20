## Why

A multi-step health insurance registration form is needed to allow users to register for a basic insurance plan with optional add-on packages. The form must guide users through personal information, plan selection, and optional add-ons with real-time receipt updates, validation, and form persistence.

## What Changes

- **New**: Multi-step registration form (3 steps) built with React + TypeScript + Vite + Tailwind, developed following Test Driven Development (TDD) with Vitest
- **New**: Personal info step with full Zod validation (first name, last name, date of birth, email, address)
- **New**: Basic insurance selection step with single-choice plan cards fetched from API
- **New**: Additional insurance step with multi-choice checkbox add-ons
- **New**: Sticky receipt panel that updates in real-time across all steps with subtotals
- **New**: Form persistence via `localStorage` with 500ms debounced writes, cleared on submit
- **New**: Skeleton loading states and error handling with retry + contact flow for API fetch failures
- **New**: Mock API data served from `public/api/insurance-plans.json` for GET, `POST` logs to console
- **New**: React Hook Form + Zod resolver for type-safe, performant form handling
- **New**: React Context for cross-step state management
- **New**: Monitoring error hook (commented out) for Sentry/New Relic integration
- **New**: Full test suite with Vitest + Testing Library — tests written before implementation (TDD), covering schemas, components, utilities, and context
- **New**: URL-based step navigation via search params (`?step=1`, `?step=2`, `?step=3`) with previous-step validation → redirects to prior step if not completed
- **New**: Secure input handling — Zod `.trim()` on all string fields, `.max()` length constraints, no `dangerouslySetInnerHTML` anywhere

## Capabilities

### New Capabilities

- `registration-form`: Multi-step insurance registration flow with 3 steps, Zod validation, localStorage persistence, and real-time receipt
- `url-step-navigation`: URL search params (`?step=N`) drive step navigation with validation of completed previous steps and auto-redirect
- `insurance-plans-mock-api`: Mock API for fetching basic and additional insurance plans, simulated via static JSON

### Modified Capabilities

<!-- None — this is a greenfield project -->

## Impact

- **Dependencies**: `react`, `react-dom`, `react-hook-form`, `@hookform/resolvers`, `zod`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
- **APIs**: `GET /api/insurance-plans` (mocked), `POST /api/registration` (console.log stub)
- **Persistence**: `localStorage` key: `insurance-registration`
- **Files**: `src/app.tsx`, `src/context/RegistrationContext.tsx`, `src/hooks/useLocalStorage.ts`, `src/lib/api.ts`, `src/lib/schemas.ts`, `src/components/`, `public/api/insurance-plans.json`
