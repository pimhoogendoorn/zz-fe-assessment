## 1. Foundation A — Setup & Run (8 tasks)

- [x] 1.1 Initialize Vite project with `pnpm create vite@latest . -- --template react-ts`
- [x] 1.2 Install runtime dependencies: `pnpm add react-hook-form @hookform/resolvers/zod`
- [x] 1.3 Install dev dependencies: `pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`
- [x] 1.4 Configure Vitest (jsdom environment, jest-dom matchers, setup file)
- [x] 1.5 Install and configure Tailwind CSS v4
- [x] 1.6 Configure TypeScript path aliases (`@/` → `src/`)
- [x] 1.7 Create directory structure: `src/lib/`, `src/components/`, `src/context/`, `src/hooks/`, `src/types/`, `src/schemas/`
- [x] 1.8 Copy `data/insurance-plans.json` to `public/api/insurance-plans.json`
      → **Testable in browser**: `pnpm dev` loads empty Vite app, console passes, Vitest runs green on empty suite.

## 2. Foundation B — Types, Schemas & Secure Input (20 tasks)

- [x] 2.9 Define TypeScript interfaces: `PersonalInfo`, `Plan`, `Addon`, `FormState`, `InsuranceApiResponse`
- [x] 2.10 Write test: `personalSchema` rejects empty firstname
- [x] 2.11 Write test: `personalSchema` rejects empty lastname
- [x] 2.12 Write test: `personalSchema` rejects empty dateOfBirth
- [x] 2.13 Write test: `personalSchema` rejects empty email
- [x] 2.14 Write test: `personalSchema` rejects empty address
- [x] 2.15 Write test: `personalSchema` rejects invalid email format
- [x] 2.16 Write test: `personalSchema` rejects future dates for dateOfBirth
- [x] 2.17 Write test: `personalSchema` rejects date of birth less than 18 years ago
- [x] 2.17 Write test: `personalSchema` rejects invalid date strings
- [x] 2.18 Write test: `personalSchema` accepts valid data for all fields
- [x] 2.19 Implement `personalSchema` — make all schema tests pass
- [x] 2.20 Write test: `personalSchema.parse()` returns typed `PersonalInfo`
- [x] 2.21 Write test: `personalSchema` trims whitespace before validation (e.g., `"  John  "` → `"John"`)
- [x] 2.22 Write test: `personalSchema` rejects firstname over 50 chars (`.max(50)`)
- [x] 2.23 Write test: `personalSchema` rejects lastname over 50 chars (`.max(50)`)
- [x] 2.24 Write test: `personalSchema` rejects address over 200 chars (`.max(200)`)
- [x] 2.25 Write test: `personalSchema` rejects email over 254 chars (`.max(254)`)
- [x] 2.26 Write test: `FormStateSchema` accepts valid FormState with selections
- [x] 2.27 Write test: `FormStateSchema` rejects FormState without basic insurance selection
- [x] 2.28 Implement `FormStateSchema` — make all schema tests pass
      → **Testable in browser**: `pnpm dev` loads app with Zod schemas importable, no build errors, all unit tests green (run `pnpm test`).

## 3. Receipt Calculator Stub (12 tasks)

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
  → **Testable in browser**: Hardcode a receipt rendering `€ 145,45 / € 0,00 / € 145,45`. Load page, verify receipt shows mocked values.

## 4. Step 1 — Personal Info Stub (9 tasks)

- [ ] 4.1 Render Step 1 skeleton: 5 input fields, labels, placeholder next button
- [ ] 4.2 Wire each input to `useForm` with `register`
- [ ] 4.3 Add inline error display under each field (show on `touched` + `error`)
- [ ] 4.4 Add Zod resolver (`zodResolver(personalSchema)`) to form
- [ ] 4.5 Disable next button while form invalid
- [ ] 4.6 Enable next button when all fields valid
- [ ] 4.7 Add summary error banner at top (shows when errors > 0)
- [ ] 4.8 Write tests: renders fields, errors on empty, errors on invalid email, button state, no back button on step 1
- [ ] 4.9 Implement Step 1 — make all tests pass
  → **Testable in browser**: Hardcode `currentStep = 1`. Load page, type in fields, observe validation, test next button state.

## 5. API Layer & Mock Data (8 tasks)

- [ ] 5.1 Write test: `fetchPlans()` resolves with mock data from `/api/insurance-plans.json`
- [ ] 5.2 Write test: `fetchPlans()` returns correct types for basicInsurance and additionalInsurance
- [ ] 5.3 Write test: `fetchPlans()` rejects with Error on network failure
- [ ] 5.4 Write test: `fetchPlans()` rejects on non-200 status
- [ ] 5.5 Implement `fetchPlans()` — make all fetch tests pass
- [ ] 5.6 Write test: `submitRegistration(payload)` resolves without error
- [ ] 5.7 Write test: `submitRegistration(payload)` logs the payload to console
- [ ] 5.8 Implement `submitRegistration()` — make all submit tests pass
  → **Testable in browser**: Run `pnpm dev`, verify `fetch('/api/insurance-plans.json')` returns real data in browser console. All API tests green (`pnpm test`).

## 6. Step 2 — Basic Insurance (10 tasks)

- [ ] 6.1 Render skeleton placeholders while loading
- [ ] 6.2 Fetch data on mount, render 3 plan cards after load
- [ ] 6.3 Each card: name, price (formatted), description, single-select border styling
- [ ] 6.4 Wire click → set selected plan in context
- [ ] 6.5 Disable next button when no plan selected
- [ ] 6.6 Handle fetch error: show "Technische problemen" + retry button
- [ ] 6.7 Add "Contact opnemen" link to error state
- [ ] 6.8 Write tests: skeleton loading, plan rendering, selection state, error state, retry
- [ ] 6.9 Implement Step 2 — make all tests pass
- [ ] 6.10 Test loading/error UX manually
  → **Testable in browser**: Hardcode `currentStep = 2`. Verify plan cards load, click selects plan, test error state (disconnect network), test retry.

## 7. Step 3 — Additional Insurance (8 tasks)

- [ ] 7.1 Render skeleton placeholders while loading
- [ ] 7.2 Fetch data on mount, render 4 add-on checkboxes after load
- [ ] 7.3 Each item: name, price, description, checkbox with multi-select
- [ ] 7.4 Wire checkbox → toggle addon in context
- [ ] 7.5 Handle fetch error with same pattern as Step 2
- [ ] 7.6 Write tests: skeleton, checkbox rendering, multi-select, error state
- [ ] 7.7 Implement Step 3 — make all tests pass
- [ ] 7.8 Test error UX manually
  → **Testable in browser**: Hardcode `currentStep = 3`. Verify checkboxes, test multi-select, test offline mode.

## 8. Context & Receipt (17 tasks)

- [ ] 8.1 Write test: `RegistrationProvider` provides initial form state
- [ ] 8.2 Write test: `useRegistration` returns current step (starts at 1)
- [ ] 8.3 Write test: `nextStep` increments step when called
- [ ] 8.4 Write test: `nextStep` does not go beyond step 3
- [ ] 8.5 Write test: `prevStep` decrements step
- [ ] 8.6 Write test: `prevStep` does not go below step 1
- [ ] 8.7 Write test: `updateFormState` merges new state into context
- [ ] 8.8 Write test: `resetForm` resets step to 1 and clears state
- [ ] 8.9 Implement `RegistrationContext` + `RegistrationProvider` — make all tests pass
- [ ] 8.10 Write test: `Receipt` renders "Basisverzekering" label when plan selected
- [ ] 8.11 Write test: `Receipt` renders formatted plan price from context
- [ ] 8.12 Write test: `Receipt` renders "Aanvullende pakketten" subtotal when addons selected
- [ ] 8.13 Write test: `Receipt` renders "Totaal" line with correct sum
- [ ] 8.14 Write test: `Receipt` shows €0 when no plans selected
- [ ] 8.15 Implement `Receipt` component — make all tests pass
- [ ] 8.16 Wire receipt into App layout (sidebar desktop, top mobile)
- [ ] 8.17 Test receipt updates live when changing selection in Steps 2/3
  → **Testable in browser**: Context active. Select plan in Step 2 → receipt updates to show plan price. Select addons in Step 3 → receipt recalculates total. No URL yet.

## 9. Persistence & Secure Input (7 tasks)

- [ ] 9.1 Write test: `useLocalStorage` returns initial value on first render
- [ ] 9.2 Write test: `useLocalStorage` writes to localStorage on value change
- [ ] 9.3 Write test: `useLocalStorage` restores data on mount
- [ ] 9.4 Write test: `useLocalStorage` debounce (500ms)
- [ ] 9.5 Implement `useLocalStorage` — make all tests pass
- [ ] 9.6 Wire `useLocalStorage` into Context to persist form state
- [ ] 9.7 Clear localStorage on successful submit
  → **Testable in browser**: Fill out Step 1 → reload page → data persists. Submit form → localStorage cleared.

## 10. URL Navigation (15 tasks)

- [ ] 10.1 Write test: `readStepFromURL()` returns `1` for `?step=personal-details`
- [ ] 10.2 Write test: `readStepFromURL()` returns `2` for `?step=product-selection`
- [ ] 10.3 Write test: `readStepFromURL()` returns `3` for `?step=addons`
- [ ] 10.4 Write test: `readStepFromURL()` returns `1` when no `?step` param
- [ ] 10.5 Write test: `readStepFromURL()` clamps invalid values to `1` (`?step=abc` → `1`)
- [ ] 10.6 Write test: `writeStepToURL(2)` calls `history.pushState` with `?step=product-selection`
- [ ] 10.7 Write test: `validateStep(2)` returns true when personal-details data is in localStorage
- [ ] 10.8 Write test: `validateStep(2)` returns false when personal-details data is NOT in localStorage
- [ ] 10.9 Write test: `validateStep(3)` returns true when product-selection selection is in localStorage
- [ ] 10.10 Write test: `validateStep(3)` returns false when product-selection selection is NOT in localStorage
- [ ] 10.11 Write test: `validateStep(1)` always returns true (always valid base step)
- [ ] 10.12 Implement `useStepURL` hook and `validateStep` — make all tests pass
- [ ] 10.13 Wire URL sync into App (next/prev update semantic step name)
- [ ] 10.14 Implement redirect on mount (incomplete steps → redirect to prior semantic step)
- [ ] 10.15 Test URL validation: open `/?step=product-selection` without step 1 data → redirects to personal-details
  → **Testable in browser**: Full semantic URL navigation. Type `/?step=personal-details`, `/?step=product-selection`, `/?step=addons`. Test back/forward buttons. Test redirected pages.

## 11. Integration, Layout & Polish (17 tasks)

- [ ] 11.1 Implement desktop layout: form left, receipt sticky right sidebar
- [ ] 11.2 Implement mobile layout: receipt sticky top, form below
- [ ] 11.3 Wire submit button: call `submitRegistration`, log payload, reset form
- [ ] 11.4 Add progress indicator (1/3, 2/3, 3/3)
- [ ] 11.5 Add hover states, transitions, and focus rings for accessibility
- [ ] 11.6 Test price formatting: €145.45 → "€ 145,45", €1000 → "€ 1.000,00"
- [ ] 11.7 Test error recovery: fetch fails → click retry → succeeds
- [ ] 11.8 Test form reset after successful submit clears everything
- [ ] 11.9 Ensure receipt is always visible on mobile (not hidden behind sticky header)
- [ ] 11.10 Verify no `dangerouslySetInnerHTML` exists in codebase
- [ ] 11.11 Run accessibility audit with axe-core against WCAG 2.1 AA: verify contrast ratios, semantic HTML, keyboard navigation, focus indicators, screen reader labels
- [ ] 11.12 Test entire flow end-to-end: Step 1 → Step 2 → Step 3 → Submit
- [ ] 11.13 Test localStorage persistence: survive tab reload and browser restart
- [ ] 11.14 Test URL validation: bookmark `/?step=product-selection` without personal-details data → redirects to personal-details
- [ ] 11.15 Test back/forward with URL sync
- [ ] 11.16 Run full test suite: `pnpm test` — all pass
- [ ] 11.17 Run linter and formatter: `pnpm format`, `pnpm lint`, `pnpm typecheck`
  → **Testable in browser**: Full production flow. Complete all 3 steps, submit, verify console.log + localStorage cleared, verify URL resets to `/?step=personal-details`.