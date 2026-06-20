import { z } from 'zod'

export const ProductoSchema = z.object({
  nombre: z
    .string()
    .min(2, 'Mínimo 2 caracteres')
    .max(100, 'Máximo 100 caracteres')
    .trim(),
  descripcion: z.string().max(300).trim().optional(),
  precio: z
    .number()
    .positive('El precio debe ser positivo')
    .multipleOf(0.01, 'Máximo 2 decimales'),
  categoria: z.enum(['COMIDAS', 'PROMOS', 'BEBIDAS', 'POSTRES']),
  imagen: z.string().url('URL inválida').optional(),
  disponible: z.boolean().default(true),
})

export const LoginSchema = z.object({
  email: z.string().email('Email inválido').toLowerCase().trim(),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
})

export type ProductoInput = z.infer<typeof ProductoSchema>