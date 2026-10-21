import { describe, it, expect } from 'vitest'
import { personalInfoSchema } from '../personal'

describe('personalSchema', () => {
  it('rejects empty firstname', () => {
    const result = personalInfoSchema.safeParse({
      firstname: '',
      lastname: 'Doe',
      dateOfBirth: '1990-01-01',
      email: 'test@example.com',
      address: 'Street 1',
    })
    expect(result.success).toBe(false)
  })

  it('rejects empty lastname', () => {
    const result = personalInfoSchema.safeParse({
      firstname: 'John',
      lastname: '',
      dateOfBirth: '1990-01-01',
      email: 'test@example.com',
      address: 'Street 1',
    })
    expect(result.success).toBe(false)
  })

  it('rejects empty dateOfBirth', () => {
    const result = personalInfoSchema.safeParse({
      firstname: 'John',
      lastname: 'Doe',
      dateOfBirth: '',
      email: 'test@example.com',
      address: 'Street 1',
    })
    expect(result.success).toBe(false)
  })

  it('rejects empty email', () => {
    const result = personalInfoSchema.safeParse({
      firstname: 'John',
      lastname: 'Doe',
      dateOfBirth: '1990-01-01',
      email: '',
      address: 'Street 1',
    })
    expect(result.success).toBe(false)
  })

  it('rejects empty address', () => {
    const result = personalInfoSchema.safeParse({
      firstname: 'John',
      lastname: 'Doe',
      dateOfBirth: '1990-01-01',
      email: 'test@example.com',
      address: '',
    })
    expect(result.success).toBe(false)
  })

  it('rejects invalid email format', () => {
    const result = personalInfoSchema.safeParse({
      firstname: 'John',
      lastname: 'Doe',
      dateOfBirth: '1990-01-01',
      email: 'not-an-email',
      address: 'Street 1',
    })
    expect(result.success).toBe(false)
  })

  it('rejects future dates for dateOfBirth', () => {
    const result = personalInfoSchema.safeParse({
      firstname: 'John',
      lastname: 'Doe',
      dateOfBirth: '2050-01-01',
      email: 'test@example.com',
      address: 'Street 1',
    })
    expect(result.success).toBe(false)
  })

  it('rejects date of birth less than 18 years ago', () => {
    const result = personalInfoSchema.safeParse({
      firstname: 'John',
      lastname: 'Doe',
      dateOfBirth: '2010-06-15',
      email: 'test@example.com',
      address: 'Street 1',
    })
    expect(result.success).toBe(false)
  })
})
