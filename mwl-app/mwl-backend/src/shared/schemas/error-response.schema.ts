import { z } from 'zod'

const errorSchema = z.object({
  message: z.string(),
})

export function responses<T extends number>(...codes: T[]) {
  return Object.fromEntries(codes.map((code) => [code, errorSchema])) as Record<T, typeof errorSchema>
}