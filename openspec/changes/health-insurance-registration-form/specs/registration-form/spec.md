## ADDED Requirements

### Requirement: Form has three steps

The registration form SHALL present three sequential steps: personal information, basic insurance selection, and additional insurance selection. Users SHALL be able to navigate forward when the current step is valid, and backward at any time.

#### Scenario: Display steps with progress indicator

- **WHEN** the form loads
- **THEN** the user sees step 1 (personal info), a progress indicator (1/3, 2/3, 3/3), and a visible next button

#### Scenario: Forward navigation blocked on invalid step

- **WHEN** the user attempts to advance while required fields are empty or invalid
- **THEN** the next button remains disabled and inline error messages appear

#### Scenario: Backward navigation always allowed

- **WHEN** the user is on step 2 or step 3
- **THEN** a back button is always enabled and navigates to the previous step

#### Scenario: No back button on step 1

- **WHEN** the user is on step 1 (personal-details)
- **THEN** no back button is rendered

### Requirement: Personal information fields with Zod validation

Step 1 collects first name, last name, date of birth, email address, and address. All fields are required and SHALL be validated against Zod schemas.

#### Scenario: All fields mandatory

- **WHEN** the user touches a field and leaves it empty
- **THEN** an inline error "is verplicht" appears beneath the field

#### Scenario: Email format validation

- **WHEN** the user enters an email that does not match a valid email pattern
- **THEN** an inline error "is ongeldig" appears beneath the field

#### Scenario: Date of birth validation

- **WHEN** the user enters a future date or an invalid date
- **THEN** an inline error "is een ongeldige datum" appears beneath the field

#### Scenario: Minimum age 18 years

- **WHEN** the user enters a date of birth less than 18 years ago
- **THEN** an inline error "Kinderen zijn meeverzekerd met hun ouders tot 18 jaar" appears beneath the field

#### Scenario: Next button enabled on valid data

- **WHEN** all five fields contain valid values
- **THEN** the next button becomes enabled immediately

### Requirement: Basic insurance selection (single choice)

Step 2 fetches basic insurance plans from the API and displays them as selectable cards showing name, price, and description. Exactly one plan SHALL be selected before advancing.

#### Scenario: Fetch and display plans on step entry

- **WHEN** the user navigates to step 2
- **THEN** skeleton placeholders appear, followed by plan cards when data loads

#### Scenario: Select one plan

- **WHEN** the user clicks a plan card
- **THEN** the card shows a visual selection state and the next button becomes enabled

#### Scenario: Cannot advance without selection

- **WHEN** the user is on step 2 with no plan selected
- **THEN** the next button remains disabled

#### Scenario: Selected plan updates receipt

- **WHEN** the user selects a plan
- **THEN** the receipt immediately reflects the selected plan's price under "Basisverzekering"

### Requirement: Additional insurance selection (multi choice)

Step 3 fetches additional insurance packages from the API and displays them as checkboxes. Multiple packages SHALL be selectable. The receipt updates to show an "Aanvullende pakketten" subtotal.

#### Scenario: Fetch and display add-ons on step entry

- **WHEN** the user navigates to step 3
- **THEN** skeleton placeholders appear, followed by checkable add-on items when data loads

#### Scenario: Select multiple add-ons

- **WHEN** the user checks one or more add-on items
- **THEN** each selected item shows a checked state and the receipt subtotal updates

#### Scenario: Receipt total updates dynamically

- **WHEN** the user changes any selection in step 3
- **THEN** the "Totaal" line recalculates as the sum of the selected plan and all selected add-ons

### Requirement: Receipt panel updates in real time

A receipt panel SHALL display current totals and SHALL update on every state change. On desktop the receipt sticks to the right sidebar. On mobile it sticks to the top above the form.

#### Scenario: Receipt shows subtotals

- **WHEN** the user has selected a basic plan
- **THEN** the receipt shows "Basisverzekering: € X,XX"

#### Scenario: Receipt shows addon subtotal

- **WHEN** the user has selected one or more add-ons
- **THEN** the receipt shows "Aanvullende pakketten: € X,XX"

#### Scenario: Receipt shows total

- **WHEN** the user has made selections
- **THEN** the receipt shows "Totaal: € X,XX" with a separator line above it

#### Scenario: Receipt layout on desktop

- **WHEN** the viewport is wider than 768px
- **THEN** the receipt is positioned as a sticky panel to the right of the form

#### Scenario: Receipt layout on mobile

- **WHEN** the viewport is 768px or narrower
- **THEN** the receipt is positioned as a sticky panel at the top of the form

### Requirement: Form persistence in localStorage

All form data SHALL be persisted to `localStorage` on every change with a 500ms debounce. On page reload, persisted data SHALL restore the form to its previous state.

#### Scenario: Persist on value change

- **WHEN** the user types into any field
- **THEN** after 500ms the form state is written to `localStorage` under key `insurance-registration`

#### Scenario: Restore on page reload

- **WHEN** the user reloads the browser
- **THEN** the form restores all previously entered values and the step indicator reflects the last active step

#### Scenario: Clear on successful submit

- **WHEN** the form POST succeeds
- **THEN** the `insurance-registration` key is removed from `localStorage` and the form resets to step 1

### Requirement: Error handling for API fetch

When fetching insurance plan data fails, the step SHALL display an error message with a retry button and a "Bij blijvende problemen kun u hier contact opnemen met ons" link.

#### Scenario: Display error on fetch failure

- **WHEN** the fetch for insurance plans returns an error
- **THEN** the user sees "Technische problemen — Kan verzekeringen niet laden" with a retry button and a link to support@verzekering.nl

#### Scenario: Retry succeeds

- **WHEN** the user clicks retry and the fetch succeeds
- **THEN** the plan cards render as normal

#### Scenario: Retry continues to fail

- **WHEN** the user clicks retry and the fetch still fails
- **THEN** the error message remains displayed

### Requirement: Monitoring integration placeholder

Error captures SHALL include commented-out integration points for a monitoring platform such as Sentry or New Relic.

#### Scenario: Error logged with monitor placeholder

- **WHEN** an API fetch fails
- **THEN** the error is logged to console with a comment `// captureException(err)` noting where to wire monitoring

#### Scenario: Submit error logged with monitor placeholder

- **WHEN** the registration POST fails
- **THEN** the error is logged to console with a comment noting where to wire monitoring

### Requirement: Secure input handling

All user-entered strings SHALL be trimmed and constrained with `min()`/`max()` lengths via Zod before validation. No `dangerouslySetInnerHTML` SHALL be used anywhere in the codebase. The URL SHALL never contain PII (no email, name, or date of birth in search params).

#### Scenario: Input trimmed before validation

- **WHEN** the user enters whitespace-padded text (e.g., `"  John  "`)
- **THEN** Zod `.trim()` strips leading/trailing whitespace before validation

#### Scenario: Input length constrained

- **WHEN** the user enters a first name exceeding 50 characters
- **THEN** Zod `.max(50)` rejects the input with an error

#### Scenario: No dangerous HTML rendering

- **WHEN** the codebase is audited
- **THEN** `dangerouslySetInnerHTML` is not present

#### Scenario: URL contains no PII

- **WHEN** the user navigates to any step
- **THEN** the URL only contains `?step=personal-details`, `?step=product-selection`, or `?step=addons` — no email, name, or date of birth in params

### Requirement: Data-driven rendering for insurance items

Plan cards in Step 2 and addon checkboxes in Step 3 SHALL be rendered by mapping over data arrays from the API response. No hardcoded card or checkbox components, no per-item `if` or `switch` statements based on `id`. Adding an item to `basicInsurance` or `additionalInsurance` in the JSON file automatically updates the UI without code changes.

#### Scenario: Cards rendered by mapping over data

- **WHEN** step 2 loads plan data
- **THEN** plan cards are rendered via `.map()` on `basicInsurance` array, no hardcoded card count

#### Scenario: New basic plan auto-renders without code changes

- **WHEN** a new item is added to `basicInsurance` in the JSON file
- **THEN** the new plan renders as a selectable card automatically

#### Scenario: Checkbox rendered by mapping over data

- **WHEN** step 3 loads addon data
- **THEN** checkbox items are rendered via `.map()` on `additionalInsurance` array, no hardcoded checkbox count

#### Scenario: New addon auto-renders without code changes

- **WHEN** a new item is added to `additionalInsurance` in the JSON file
- **THEN** the new addon renders as a checkbox automatically

### Requirement: Accessibility (WCAG 2.1 AA)

The application SHALL meet WCAG 2.1 Level AA success criteria. This includes minimum color contrast ratio of 4.5:1 for normal text and 3:1 for large text, semantic HTML structure (headings, landmark regions, form labels), keyboard navigation for all interactive elements, visible focus indicators, and ARIA attributes where native HTML is insufficient.

#### Scenario: Contrast ratio meets WCAG AA

- **WHEN** the UI is checked against WCAG 2.1 AA contrast requirements
- **THEN** all text meets minimum 4.5:1 contrast ratio (normal text) or 3:1 (large text)

#### Scenario: Semantic HTML structure

- **WHEN** the HTML is inspected
- **THEN** the page uses proper landmarks (`<main>`, `<nav>`, `<header>`), heading hierarchy (`<h1>` → `<h2>` → `<h3>`), and `<label>` elements for all form inputs

#### Scenario: Keyboard navigation

- **WHEN** a user navigates with the keyboard (Tab, Enter, Space, Arrow keys)
- **THEN** all interactive elements are reachable and operable without a mouse

#### Scenario: Visible focus indicators

- **WHEN** a user tabs through the form
- **THEN** every focused element has a clearly visible focus outline (not removed via CSS)

#### Scenario: Screen reader compatibility

- **WHEN** a screen reader processes the form
- **THEN** all form fields have accessible labels, errors are announced, and step progress is announced
