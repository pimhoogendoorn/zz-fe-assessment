import { z } from 'zod'

const today = new Date()
const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())

const eighteenYearsAgoISO = eighteenYearsAgo.toISOString().split('T')[0]
const todayISO = today.toISOString().split('T')[0]

export const personalInfoSchema = z.object({
  firstname: z
    .string()
    .trim()
    .min(1, 'Voornaam is verplicht')
    .max(50, 'Voornaam is te lang (max 50 tekens)'),
  lastname: z
    .string()
    .trim()
    .min(1, 'Achternaam is verplicht')
    .max(50, 'Achternaam is te lang (max 50 tekens)')
    .optional(),
  dateOfBirth: z
    .string()
    .min(1, 'Geboortedatum is verplicht')
    .refine((val) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(val)) return false
      const parsed = new Date(val)
      return !isNaN(parsed.getTime())
    }, 'Ingevoerde geboortedatum is een ongeldige datum')
    .refine((val) => val < todayISO, 'Geboortedatum is een toekomstige datum')
    .refine(
      (val) => val <= eighteenYearsAgoISO,
      'Kinderen zijn meerverzekerd met hun ouders tot 18 jaar',
    )
    .optional(),
  email: z
    .string()
    .trim()
    .min(1, 'E-mailadres is verplicht')
    .email('Ongeldig e-mailadres')
    .max(254, 'E-mailadres is te lang (max 254 tekens)')
    .optional(),
  address: z
    .string()
    .trim()
    .min(1, 'Adres is verplicht')
    .max(200, 'Adres is te lang (max 200 tekens)')
    .optional(),
})

export type PersonalInfoData = z.infer<typeof personalInfoSchema>
