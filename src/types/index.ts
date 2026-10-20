export { personalSchema } from '@/schemas/personal'
export { FormStateSchema, ProductSchema } from '@/schemas/form-state'
export type { PersonalInfo } from '@/schemas/personal'
export type { FormState } from '@/schemas/form-state'

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

export interface InsuranceApiResponse {
  basicInsurance: Plan[]
  additionalInsurance: Addon[]
}
