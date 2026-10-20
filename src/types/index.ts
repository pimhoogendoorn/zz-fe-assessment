export interface PersonalInfo {
  firstname: string
  lastname: string
  dateOfBirth: string
  email: string
  address: string
}

export interface Plan {
  id: string
  name: string
  price: number
  description: string
}

export interface Addon {
  id: string
  name: string
  price: number
  description: string
}

export interface FormState {
  personalInfo: PersonalInfo | null
  basicInsurance: Plan | null
  addons: Addon[]
}

export interface InsuranceApiResponse {
  basicInsurance: Plan[]
  additionalInsurance: Addon[]
}
