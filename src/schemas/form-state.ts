import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
})

export const FormStateSchema = z
  .object({
    basicInsurance: ProductSchema.nullable(),
  })
  .refine((schema) => schema.basicInsurance !== null, {
    message: 'Selecteer aub een verzekering',
  })

export type FormState = z.infer<typeof FormStateSchema>
