import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Obtener todos los productos
export async function GET() {
  const productos = await prisma.producto.findMany();
  return NextResponse.json(productos);
}

// Crear un nuevo producto (para tu Admin)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const producto = await prisma.producto.create({
      data: {
        nombre: body.nombre,
        precio: Number(body.precio),
        imagenUrl: body.imagenUrl,
        categoria: body.categoria, // Ejemplo: "jueves", "viernes", etc.
      },
    });
    return NextResponse.json(producto, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear producto' }, { status: 500 });
  }
}