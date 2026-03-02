import { z } from 'zod'

export const orderSchema = z.object({
  customer_name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  customer_phone: z.string().min(10, 'Введите корректный номер телефона'),
  customer_address: z.string().min(5, 'Введите адрес доставки'),
  customer_comment: z.string().optional().or(z.literal(''))
})

export type OrderFormData = z.infer<typeof orderSchema>
