import type { Plan, Addon } from '@/types'

export function calculateBasicTotal(plan: Plan | undefined): number {
  return plan?.price ?? 0
}

export function calculateAddonTotal(addons: Addon[]): number {
  return addons.reduce((sum, addon) => sum + addon.price, 0)
}

export function calculateTotal(plan: Plan | undefined, addons: Addon[]): number {
  const total = calculateBasicTotal(plan) + calculateAddonTotal(addons)
  return Math.round(total * 100) / 100
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('nl-NL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
