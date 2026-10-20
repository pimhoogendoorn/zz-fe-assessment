## ADDED Requirements

### Requirement: Mock API serves insurance plan data
A static JSON file at `public/api/insurance-plans.json` SHALL be served by Vite during development. The application SHALL fetch this file via `GET /api/insurance-plans`.

#### Scenario: JSON file contains basic and additional plans
- **WHEN** the file exists at `public/api/insurance-plans.json`
- **THEN** it contains the `basicInsurance` array (3 items with id, name, price, description) and `additionalInsurance` array (4 items with id, name, price, description)

#### Scenario: Application fetches mock data correctly
- **WHEN** the user navigates to step 2 or step 3
- **THEN** the application fetches `/api/insurance-plans` and uses the response data to render plan cards or checkboxes

### Requirement: Mock API matches production data contract
The TypeScript interfaces `Plan` and `Addon` SHALL mirror the structure of the production API response to prevent divergence.

#### Scenario: Interfaces match JSON structure
- **WHEN** the TypeScript interfaces are defined
- **THEN** `Plan` has `{ id: string; name: string; price: number; description: string }` and `Addon` has `{ id: string; name: string; price: number; description: string }`

#### Scenario: Mock JSON conforms to interfaces
- **WHEN** the JSON file is parsed into TypeScript types
- **THEN** all 3 basic plans and 4 additional plans have the required fields with correct types
