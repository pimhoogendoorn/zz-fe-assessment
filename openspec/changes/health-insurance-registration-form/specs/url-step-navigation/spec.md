## ADDED Requirements

### Requirement: Step navigation via URL search params

The current step SHALL be reflected in the URL search params as `?step=1`, `?step=2`, or `?step=3`. The URL SHALL update when the user navigates between steps.

#### Scenario: URL reflects current step on load

- **WHEN** the app loads (either fresh or via history)
- **THEN** the step shown matches `?step=N` in the URL, defaulting to `?step=1`

#### Scenario: URL updates on step navigation

- **WHEN** the user navigates to step 2
- **THEN** the URL updates to `?step=2`

#### Scenario: Previous step validation on direct URL access

- **WHEN** the user navigates directly to `/?step=2`
- **THEN** the system checks if step 1 data exists in localStorage
  - **IF** step 1 data exists → show step 2
  - **IF** step 1 data does not exist → redirect to `/?step=1`

#### Scenario: Previous step validation on deeper navigation

- **WHEN** the user navigates directly to `/?step=3`
- **THEN** the system checks if step 1 and 2 selections exists in localStorage
  - **IF** step 1 selection exists and step 2 selection exists → show step 3
  - **IF** step 1 selection does not exist → redirect to `/?step=1`
  - **IF** step 1 selection exists but step 2 selection does not exist → redirect to `/?step=2`

#### Scenario: Browser back and forward buttons

- **WHEN** the user clicks the browser back or forward button
- **THEN** the step changes to match the new URL and all redirects apply

#### Scenario: Invalid step value defaults to step 1

- **WHEN** the URL contains an invalid step value (e.g. `?step=0`, `?step=4`, `?step=abc`)
- **THEN** the system defaults to step 1 and redirects to `/?step=1`
