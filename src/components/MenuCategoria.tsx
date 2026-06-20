import { Producto } from '@prisma/client'
import ProductoCard from './ProductoCard'

// Diccionario para ponerle emojis y formato a los títulos
const LABELS: Record<string, string> = {
  COMIDAS: '🍔 Comidas',
  PROMOS: '🔥 Promociones',
  BEBIDAS: '🍺 Bebidas',
  POSTRES: '🍰 Postres',
}

interface Props {
  categoria: string
  productos: Producto[]
}

export default function MenuCategoria({ categoria, productos }: Props) {
  // Si no hay productos en esta categoría, no mostramos nada
  if (productos.length === 0) return null

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-amber-400 mb-6 border-b border-amber-500/30 pb-2">
        {LABELS[categoria] || categoria}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {productos.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </div>
    </section>
  )
}