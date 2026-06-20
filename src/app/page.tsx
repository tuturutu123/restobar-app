import Image from 'next/image';

export default function HomePage() {
  const hoy = new Date().toLocaleDateString('es-AR', { weekday: 'long' });
  
  const promos = {
    'jueves': { plato: 'Tacos Libres', extra: 'Pizza Libre', precio: '$14.000', img: '/promos/jueves.jpg' },
    'viernes': { plato: 'Milanesa Libre', extra: 'Pizza Libre', precio: '$12.000', img: '/promos/viernes.jpg' },
    'sábado': { plato: 'Milanesa Libre', extra: 'Pizza Libre', precio: '$12.000', img: '/promos/sabado.jpg' },
    'domingo': { plato: 'Hamburguesa Libre', extra: 'Pizza Libre', precio: '$12.000', img: '/promos/domingo.jpg' },
    'lunes': { plato: 'Papas Libres + Sándwich', extra: 'Pizza Libre', precio: '$12.000', img: '/promos/lunes.jpg' },
  };

  const promoHoy = promos[hoy as keyof typeof promos];

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-black uppercase text-orange-500 tracking-tighter">Sisu Resto Bar</h1>
        <p className="text-zinc-500 italic">Tucumán 77, Villa Mercedes</p>
      </header>

      {promoHoy ? (
        <section className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl">
          <h2 className="text-orange-500 font-bold mb-4 uppercase text-center tracking-widest">Hoy {hoy}</h2>
          {/* Aquí se cargará la imagen de tu promo */}
          <div className="relative w-full h-64 mb-6">
             <Image src={promoHoy.img} alt={promoHoy.plato} fill className="object-cover rounded-2xl" />
          </div>
          <h3 className="text-3xl font-black text-center">{promoHoy.plato}</h3>
          <p className="text-center text-zinc-400 my-2">+ {promoHoy.extra}</p>
          <p className="text-center text-2xl font-bold text-orange-400 mt-4">{promoHoy.precio}</p>
          
          <a href="https://wa.me/5492657211497" className="mt-8 flex justify-center items-center bg-green-600 hover:bg-green-700 py-4 rounded-2xl font-bold transition">
            Reservar por WhatsApp
          </a>
        </section>
      ) : (
        <p className="text-center">Consultanos por el menú del día.</p>
      )}

      <footer className="max-w-md mx-auto mt-10 p-6 bg-zinc-900 rounded-2xl border border-zinc-800">
        <h4 className="text-orange-500 font-bold mb-3 uppercase text-sm">Modalidad Libre</h4>
        <ul className="text-xs text-zinc-400 space-y-2 list-disc pl-4">
          <li>Se sirve por tanda de variedad.</li>
          <li>No se puede llevar lo que sobra.</li>
          <li>Se requiere seña mínima de $5.000.</li>
        </ul>
      </footer>
    </main>
  );
}