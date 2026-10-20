## 1. Foundation A — Setup (8 tasks)

- [ ] 1.1 Initialize Vite project with React + TypeScript template
- [ ] 1.2 Install dependencies: react-hook-form, @hookform/resolvers/zod
- [ ] 1.3 Install dev dependencies: vitest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, jsdom
- [ ] 1.4 Configure Vitest (jsdom environment, jest-dom matchers, setup file)
- [ ] 1.5 Install and configure Tailwind CSS v3
- [ ] 1.6 Configure TypeScript path aliases (`@/` → `src/`)
- [ ] 1.7 Create directory structure: `src/lib/`, `src/components/`, `src/context/`, `src/hooks/`, `src/types/`, `src/schemas/`
- [ ] 1.8 Copy `data/insurance-plans.json` to `public/api/insurance-plans.json`

## 2. Foundation B — Types, Schemas & Secure Input (18 tasks)

- [ ] 2.9 Define TypeScript interfaces: `PersonalInfo`, `Plan`, `Addon`, `FormState`, `InsuranceApiResponse`
- [ ] 2.10 Write test: `personalSchema` rejects empty firstname
- [ ] 2.11 Write test: `personalSchema` rejects empty lastname
- [ ] 2.12 Write test: `personalSchema` rejects empty dateOfBirth
- [ ] 2.13 Write test: `personalSchema` rejects empty email
- [ ] 2.14 Write test: `personalSchema` rejects empty address
- [ ] 2.15 Write test: `personalSchema` rejects invalid email format
- [ ] 2.16 Write test: `personalSchema` rejects future dates for dateOfBirth
- [ ] 2.17 Write test: `personalSchema` rejects invalid date strings
- [ ] 2.18 Write test: `personalSchema` accepts valid data for all fields
- [ ] 2.19 Implement `personalSchema` — make all schema tests pass
- [ ] 2.20 Write test: `personalSchema.parse()` returns typed `PersonalInfo`
- [ ] 2.21 Write test: `personalSchema` trims whitespace before validation (e.g., `"  John  "` → `"John"`)
- [ ] 2.22 Write test: `personalSchema` rejects firstname over 50 chars (`.max(50)`)
- [ ] 2.23 Write test: `personalSchema` rejects lastname over 50 chars (`.max(50)`)
- [ ] 2.24 Write test: `personalSchema` rejects address over 200 chars (`.max(200)`)
- [ ] 2.25 Write test: `personalSchema` rejects email over 254 chars (`.max(254)`)
- [ ] 2.26 Write test: `FormStateSchema` accepts valid FormState with selections
- [ ] 2.27 Write test: `FormStateSchema` rejects FormState without basic insurance selection
- [ ] 2.28 Implement `FormStateSchema` — make all schema tests pass

## 3. Receipt Calculations (12 tasks)

- [ ] 3.1 Write test: `calculateBasicTotal(undefined)` returns 0
- [ ] 3.2 Write test: `calculateBasicTotal(plan)` returns plan.price
- [ ] 3.3 Write test: `calculateAddonTotal([])` returns 0
- [ ] 3.4 Write test: `calculateAddonTotal([addon1])` returns addon1.price
- [ ] 3.5 Write test: `calculateAddonTotal([addon1, addon2])` returns sum of prices
- [ ] 3.6 Write test: `calculateTotal(plan, addons)` returns plan + addons sum
- [ ] 3.7 Write test: `calculateTotal` handles floating-point precision (no 0.0000001 errors)
- [ ] 3.8 Implement `calculateBasicTotal`, `calculateAddonTotal`, `calculateTotal` — make all tests pass
- [ ] 3.9 Write test: `formatPrice` returns "€ 145,45" for 145.45 using nl-NL locale
- [ ] 3.10 Write test: `formatPrice` returns "€ 1.000,00" for 1000
- [ ] 3.11 Write test: `formatPrice` returns "€ 0,50" for 0.5
- [ ] 3.12 Implement `formatPrice` — make all tests pass

## 4. API Layer (8 tasks)

- [ ] 4.1 Write test: `fetchPlans()` resolves with mock data from `/api/insurance-plans.json`
- [ ] 4.2 Write test: `fetchPlans()` returns correct types for basicInsurance and additionalInsurance
- [ ] 4.3 Write test: `fetchPlans()` rejects with Error on network failure
- [ ] 4.4 Write test: `fetchPlans()` rejects on non-200 status
- [ ] 4.5 Implement `fetchPlans()` — make all fetch tests pass
- [ ] 4.6 Write test: `submitRegistration(payload)` resolves without error
- [ ] 4.7 Write test: `submitRegistration(payload)` logs the payload to console
- [ ] 4.8 Implement `submitRegistration()` — make all submit tests pass

## 5. Persistence Hook (7 tasks)

- [ ] 5.1 Write test: `useLocalStorage` returns initial value on first render
- [ ] 5.2 Write test: `useLocalStorage` writes to localStorage on value change
- [ ] 5.3 Write test: `useLocalStorage` reads from localStorage on mount (data survives re-render)
- [ ] 5.4 Write test: `useLocalStorage` does NOT write on every render (debounce)
- [ ] 5.5 Write test: `useLocalStorage` uses setTimeout with 500ms delay
- [ ] 5.6 Write test: `useLocalStorage` restores data between page reloads
- [ ] 5.7 Implement `useLocalStorage` — make all tests pass

## 6. URL Navigation (12 tasks)

- [ ] 6.1 Write test: `readStepFromURL()` returns `1` when no `?step` param
- [ ] 6.2 Write test: `readStepFromURL()` returns `2` for `?step=2`
- [ ] 6.3 Write test: `readStepFromURL()` returns `3` for `?step=3`
- [ ] 6.4 Write test: `readStepFromURL()` clamps invalid values to `1` (`?step=0` → `1`, `?step=99` → `1`, `?step=abc` → `1`)
- [ ] 6.5 Write test: `writeStepToURL(2)` calls `history.pushState` with `?step=2`
- [ ] 6.6 Write test: `writeStepToURL()` does nothing for unchanged step
- [ ] 6.7 Write test: `validateStep(2)` returns `true` when step 1 data is in localStorage
- [ ] 6.8 Write test: `validateStep(2)` returns `false` when step 1 data is NOT in localStorage
- [ ] 6.9 Write test: `validateStep(3)` returns `true` when step 2 selection is in localStorage
- [ ] 6.10 Write test: `validateStep(3)` returns `false` when step 2 selection is NOT in localStorage
- [ ] 6.11 Write test: `validateStep(1)` always returns `true` (always valid base step)
- [ ] 6.12 Implement `useStepURL` hook and `validateStep` — make all tests pass

## 7. Context (9 tasks)

- [ ] 7.1 Write test: `RegistrationProvider` provides initial form state
- [ ] 7.2 Write test: `useRegistration` returns current step (starts at 1)
- [ ] 7.3 Write test: `nextStep` increments step when called
- [ ] 7.4 Write test: `nextStep` does not go beyond step 3
- [ ] 7.5 Write test: `prevStep` decrements step
- [ ] 7.6 Write test: `prevStep` does not go below step 1
- [ ] 7.7 Write test: `updateFormState` merges new state into context
- [ ] 7.8 Write test: `resetForm` resets step to 1 and clears state
- [ ] 7.9 Implement `RegistrationContext` + `RegistrationProvider` — make all tests pass

## 8. Receipt UI (8 tasks)

- [ ] 8.1 Write test: `Receipt` renders "Basisverzekering" label when plan selected
- [ ] 8.2 Write test: `Receipt` renders formatted plan price
- [ ] 8.3 Write test: `Receipt` renders "Aanvullende pakketten" subtotal when addons selected
- [ ] 8.4 Write test: `Receipt` renders "Totaal" line with correct sum
- [ ] 8.5 Write test: `Receipt` renders separator line before "Totaal"
- [ ] 8.6 Write test: `Receipt` shows €0 when no plans selected
- [ ] 8.7 Implement `Receipt` component — make all tests pass
- [ ] 8.8 Test visual layout manually (sticky sidebar desktop, sticky top mobile)

## 9. Step 1 — Personal Info (9 tasks)

- [ ] 9.1 Write test: `Step1` renders all 5 input fields
- [ ] 9.2 Write test: `Step1` shows error when submitting with empty firstname
- [ ] 9.3 Write test: `Step1` shows error when submitting with empty email
- [ ] 9.4 Write test: `Step1` shows error when submitting with invalid email format
- [ ] 9.5 Write test: `Step1` next button is disabled when form is invalid
- [ ] 9.6 Write test: `Step1` next button is enabled when all fields are valid
- [ ] 9.7 Write test: `Step1` calls `updateFormState` when next button clicked with valid data
- [ ] 9.8 Implement `Step1` component — make all tests pass
- [ ] 9.9 Test inline error UX manually (blur behavior, banner summary)

## 10. Step 2 — Basic Insurance (10 tasks)

- [ ] 10.1 Write test: `Step2` renders skeleton placeholders while loading
- [ ] 10.2 Write test: `Step2` renders 3 plan cards after load
- [ ] 10.3 Write test: `Step2` plan cards display correct name and price
- [ ] 10.4 Write test: `Step2` enables next button when a plan is selected
- [ ] 10.5 Write test: `Step2` next button is disabled when no plan selected
- [ ] 10.6 Write test: `Step2` shows error state when fetch fails
- [ ] 10.7 Write test: `Step2` shows retry button on error
- [ ] 10.8 Write test: `Step2` shows contact link on error
- [ ] 10.9 Implement `Step2` component — make all tests pass
- [ ] 10.10 Test loading/error UX manually

## 11. Step 3 — Additional Insurance (8 tasks)

- [ ] 11.1 Write test: `Step3` renders skeleton placeholders while loading
- [ ] 11.2 Write test: `Step3` renders 4 add-on checkboxes after load
- [ ] 11.3 Write test: `Step3` checkboxes display correct name and price
- [ ] 11.4 Write test: `Step3` allows selecting multiple add-ons
- [ ] 11.5 Write test: `Step3` updates form state when add-on is checked
- [ ] 11.6 Write test: `Step3` updates form state when add-on is unchecked
- [ ] 11.7 Implement `Step3` component — make all tests pass
- [ ] 11.8 Test error UX manually (same pattern as Step 2)

## 12. Integration & Polish (17 tasks)

- [ ] 12.1 Wire up `App` component: `RegistrationProvider` wraps all children
- [ ] 12.2 Wire `useStepURL` into App to sync step with URL
- [ ] 12.3 Implement step validation on mount → redirect to prior step if incomplete
- [ ] 12.4 Implement next/prev buttons that sync with both Context and URL
- [ ] 12.5 Implement desktop layout: form left, receipt sticky right sidebar
- [ ] 12.6 Implement mobile layout: receipt sticky top, form below
- [ ] 12.7 Wire submit button: call `submitRegistration`, log payload, reset form + localStorage + URL
- [ ] 12.8 Test navigation manually across breakpoints
- [ ] 12.9 Test URL validation: bookmark `/?step=2` without step 1 data → redirects to step 1
- [ ] 12.10 Ensure receipt is always visible on mobile (not hidden behind sticky header)
- [ ] 12.11 Test price formatting: €145.45 → "€ 145,45", €1000 → "€ 1.000,00"
- [ ] 12.12 Test localStorage persistence: survive tab reload and browser restart
- [ ] 12.13 Test error recovery: fetch fails → click retry → succeeds
- [ ] 12.14 Test form reset after successful submit clears everything
- [ ] 12.15 Add hover states, transitions, and focus rings for accessibility
- [ ] 12.16 Verify no `dangerouslySetInnerHTML` exists in codebase (ESLint rule: `no-danger`)
- [ ] 12.17 Run full test suite: `pnpm test`
- [ ] 12.18 Run linter and formatter: `pnpm format`, `pnpm lint`, `pnpm typecheck`
