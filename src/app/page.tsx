import { prisma } from '@/lib/prisma'
import MenuCategoria from '@/components/MenuCategoria'
import WhatsAppButton from '@/components/WhatsAppButton'

export default async function HomePage() {
  const productos = await prisma.producto.findMany({
    orderBy: { nombre: 'asc' },
  })

  // Obtenemos las categorías únicas que existen en tu base de datos
  // Esto evita que tengamos que escribir las categorías a mano
  const categoriasUnicas = Array.from(new Set(productos.map(p => p.categoria)))

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-amber-500/30 sticky top-0 z-40 p-4">
        <h1 className="text-2xl font-bold text-amber-400 text-center">🍻 El Restobar</h1>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {categoriasUnicas.map((categoria) => (
          <MenuCategoria
            key={categoria}
            categoria={categoria}
            productos={productos.filter((p) => p.categoria === categoria)}
          />
        ))}
      </div>

      <WhatsAppButton />
    </main>
  )
}