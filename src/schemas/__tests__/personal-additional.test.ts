import { describe, it, expect } from 'vitest'
import { personalSchema } from '../personal'

describe('personalSchema additional constraints', () => {
  const baseDate = '1990-05-15'

  function validData(overrides?: Partial<{ lastname: string; email: string; address: string }>) {
    return {
      firstname: '  John  ',
      lastname: overrides?.lastname ?? 'Doe',
      dateOfBirth: baseDate,
      email: overrides?.email ?? 'test@example.com',
      address: overrides?.address ?? 'Street 1',
    }
  }

  it('accepts valid data for all fields', () => {
    const result = personalSchema.safeParse(validData())
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.firstname).toBe('John')
    }
  })

  it('parse() returns typed PersonalInfo', () => {
    const result = personalSchema.parse(validData())
    expect(typeof result.firstname).toBe('string')
    expect(typeof result.lastname).toBe('string')
    expect(typeof result.dateOfBirth).toBe('string')
    expect(typeof result.email).toBe('string')
    expect(typeof result.address).toBe('string')
  })

  it('trims whitespace before validation', () => {
    const result = personalSchema.parse(validData())
    expect(result.firstname).toBe('John')
  })

  it('rejects firstname over 50 chars', () => {
    const result = personalSchema.safeParse({
      ...validData(),
      firstname: 'a'.repeat(51),
    })
    expect(result.success).toBe(false)
  })

  it('rejects lastname over 50 chars', () => {
    const result = personalSchema.safeParse({
      ...validData(),
      lastname: 'a'.repeat(51),
    })
    expect(result.success).toBe(false)
  })

  it('rejects address over 200 chars', () => {
    const result = personalSchema.safeParse({
      ...validData(),
      address: 'a'.repeat(201),
    })
    expect(result.success).toBe(false)
  })

  it('rejects email over 254 chars', () => {
    const result = personalSchema.safeParse({
      ...validData(),
      email: 'a'.repeat(250) + '@a.co',
    })
    expect(result.success).toBe(false)
  })

  it('rejects invalid date strings', () => {
    const result = personalSchema.safeParse({
      ...validData(),
      dateOfBirth: 'not-a-date',
    })
    expect(result.success).toBe(false)
  })
})
