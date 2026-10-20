import { z } from 'zod'

export const FormStateSchema = z
  .object({
    basicInsurance: z
      .object({
        id: z.string(),
        name: z.string(),
        price: z.number(),
        description: z.string(),
      })
      .nullable(),
  })
  .refine((schema) => schema.basicInsurance !== null, {
    message: 'Selecteer aub een verzekering',
  })
