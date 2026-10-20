import { describe, it, expect } from 'vitest'
import { FormStateSchema } from '../form-state'

const validPlan = {
  id: 'basis',
  name: 'Basis',
  price: 145.45,
  description: 'Test plan',
}

describe('FormStateSchema', () => {
  it('accepts valid FormState with selections', () => {
    const result = FormStateSchema.safeParse({
      basicInsurance: validPlan,
    })
    expect(result.success).toBe(true)
  })

  it('rejects FormState without basic insurance selection', () => {
    const result = FormStateSchema.safeParse({
      basicInsurance: null,
    })
    expect(result.success).toBe(false)
  })
})
