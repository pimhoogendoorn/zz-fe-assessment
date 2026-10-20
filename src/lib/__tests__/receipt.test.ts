import { describe, it, expect } from 'vitest'
import { calculateBasicTotal, calculateAddonTotal, calculateTotal, formatPrice } from '../receipt'

describe('calculateBasicTotal', () => {
  it('returns 0 when plan is undefined', () => {
    expect(calculateBasicTotal(undefined)).toBe(0)
  })

  it('returns plan.price when a plan is provided', () => {
    const plan = { id: 'basis', name: 'Basis', price: 145.45, description: 'Test' }
    expect(calculateBasicTotal(plan)).toBe(145.45)
  })
})

describe('calculateAddonTotal', () => {
  it('returns 0 for empty array', () => {
    expect(calculateAddonTotal([])).toBe(0)
  })

  it('returns addon1.price for single addon', () => {
    const addon1 = { id: 'a1', name: 'Test', price: 12.5, description: '' }
    expect(calculateAddonTotal([addon1])).toBe(12.5)
  })

  it('returns sum of prices for multiple addons', () => {
    const addon1 = { id: 'a1', name: 'A', price: 10, description: '' }
    const addon2 = { id: 'a2', name: 'B', price: 20.3, description: '' }
    expect(calculateAddonTotal([addon1, addon2])).toBe(30.3)
  })
})

describe('calculateTotal', () => {
  it('returns plan + addons sum', () => {
    const plan = { id: 'basis', name: 'Basis', price: 145.45, description: '' }
    const addon1 = { id: 'a1', name: 'A', price: 10.5, description: '' }
    const addon2 = { id: 'a2', name: 'B', price: 20, description: '' }
    expect(calculateTotal(plan, [addon1, addon2])).toBe(175.95)
  })

  it('handles floating-point precision (no 0.0000001 errors)', () => {
    const plan = { id: 'basis', name: 'Basis', price: 0.1, description: '' }
    const addon = { id: 'a1', name: 'A', price: 0.2, description: '' }
    expect(calculateTotal(plan, [addon])).toBe(0.3)
  })

  it('correctly rounds multiple decimal places', () => {
    const plan = { id: 'basis', name: 'Basis', price: 145.455, description: '' }
    const addon = { id: 'a1', name: 'A', price: 23.333, description: '' }
    expect(calculateTotal(plan, [addon])).toBe(168.79)
  })
})

describe('formatPrice', () => {
  it('formats 145.45 using nl-NL locale', () => {
    expect(formatPrice(145.45)).toBe('145,45')
  })

  it('formats 1000 using nl-NL locale', () => {
    expect(formatPrice(1000)).toBe('1.000,00')
  })

  it('formats 0.5 using nl-NL locale', () => {
    expect(formatPrice(0.5)).toBe('0,50')
  })
})
