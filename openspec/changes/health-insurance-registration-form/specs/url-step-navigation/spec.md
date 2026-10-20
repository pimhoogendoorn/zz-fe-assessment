## ADDED Requirements

### Requirement: Step navigation via semantic URL search params

The current step SHALL be reflected in the URL search params using semantic identifiers. The three valid values are `personal-details`, `product-selection`, and `addons`. The URL SHALL update when the user navigates between steps.

#### Scenario: URL reflects current step on load

- **WHEN** the app loads (either fresh or via history)
- **THEN** the step shown matches `?step=personal-details` in the URL by default

#### Scenario: URL updates on step navigation

- **WHEN** the user navigates from step 1 to step 2
- **THEN** the URL updates from `?step=personal-details` to `?step=product-selection`

#### Scenario: Previous step validation on direct URL access

- **WHEN** the user navigates directly to `/?step=product-selection`
- **THEN** the system checks if personal-details data exists in localStorage
  - **IF** personal-details data exists → show step 2
  - **IF** personal-details data does not exist → redirect to `/?step=personal-details`

#### Scenario: Previous step validation on deeper navigation

- **WHEN** the user navigates directly to `/?step=addons`
- **THEN** the system checks if product-selection selection exists in localStorage
  - **IF** both personal-details and product-selection exist → show step 3
  - **IF** personal-details does not exist → redirect to `/?step=personal-details`
  - **IF** personal-details exists but product-selection does not → redirect to `/?step=product-selection`

#### Scenario: Browser back and forward buttons

- **WHEN** the user clicks the browser back or forward button
- **THEN** the step changes to match the new URL and all redirects apply

#### Scenario: Invalid step value defaults to step 1

- **WHEN** the URL contains an invalid step value (e.g. `?step=0`, `?step=99`, `?step=abc`, `?step=unknown-step`)
- **THEN** the system defaults to step 1 and redirects to `/?step=personal-details`
