import { Producto } from '@prisma/client'

export default function ProductoCard({ producto }: { producto: Producto }) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-amber-500/50 transition-colors">
      <h3 className="text-lg font-semibold text-white">{producto.nombre}</h3>
      <p className="text-gray-400 text-sm mt-1">{producto.descripcion}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-amber-400 font-bold text-lg">${producto.precio}</span>
      </div>
    </div>
  )
}