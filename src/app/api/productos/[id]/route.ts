import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  
  try {
    const producto = await prisma.producto.update({
      where: { id },
      data: body,
    })
    return NextResponse.json(producto)
  } catch {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 404 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  try {
    await prisma.producto.delete({ where: { id } })
    return NextResponse.json({ mensaje: 'Producto eliminado' })
  } catch {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
  }
}