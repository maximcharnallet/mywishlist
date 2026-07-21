import z from "zod"


export const giftInputSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  price: z.number().positive().optional(),
})

export type GiftInput = z.infer<typeof giftInputSchema>