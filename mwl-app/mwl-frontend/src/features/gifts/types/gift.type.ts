export interface Gift {
  id: string
  title: string
  description: string | null
  price: number | null
  userId: string
  createdAt: string
  updatedAt: string
}