import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ProductoSchema } from '@/lib/validations'

// GET público - Lee el menú
export async function GET() {
  try {
    const productos = await prisma.producto.findMany({
      where: { disponible: true },
      orderBy: { categoria: 'asc' },
    })
    return NextResponse.json(productos)
  } catch {
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 })
  }
}

// POST protegido - Crea producto (solo admin)
export async function POST(req: NextRequest) {
  // 1. Verificar sesión
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const body = await req.json()
    // 2. Validar con Zod (protege contra inyección y datos maliciosos)
    const parsed = ProductoSchema.safeParse(body)
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', detalles: parsed.error.flatten() },
        { status: 400 }
      )
    }

    // 3. Operación segura via Prisma (queries parametrizadas)
    const producto = await prisma.producto.create({
      data: parsed.data,
    })
    
    return NextResponse.json(producto, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Error al crear producto' }, { status: 500 })
  }
}