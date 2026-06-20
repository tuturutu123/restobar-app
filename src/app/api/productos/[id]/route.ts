import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ProductoSchema } from '@/lib/validations'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  // Esperamos a que los params se resuelvan
  const { id } = await params 

  try {
    const body = await req.json()
    const parsed = ProductoSchema.partial().safeParse(body)
    
    if (!parsed.success) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
    }

    const producto = await prisma.producto.update({
      where: { id }, 
      data: parsed.data,
    })
    return NextResponse.json(producto)
  } catch {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 404 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  // Esperamos a que los params se resuelvan
  const { id } = await params

  try {
    await prisma.producto.delete({ where: { id } })
    return NextResponse.json({ mensaje: 'Producto eliminado' })
  } catch {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
  }
}
