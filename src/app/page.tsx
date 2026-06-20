export default function HomePage() {
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const hoy = dias[new Date().getDay()];

  const promos = {
    'Jueves': { plato: 'Tacos Libres', extra: 'Pizza Libre' },
    'Viernes': { plato: 'Milanesa Libre', extra: 'Pizza Libre' },
    'Sábado': { plato: 'Milanesa Libre', extra: 'Pizza Libre' },
    'Domingo': { plato: 'Hamburguesa Libre', extra: 'Pizza Libre' },
    'Lunes': { plato: 'Papas Libres + Sándwich', extra: 'Pizza Libre' },
  };

  const promoHoy = promos[hoy as keyof typeof promos];

  return (
    <main className="p-8 text-center bg-zinc-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Sisu Resto Bar</h1>
      {promoHoy ? (
        <div className="border-2 border-orange-500 p-6 rounded-xl">
          <h2 className="text-2xl text-orange-500">Hoy {hoy}</h2>
          <p className="text-3xl font-bold">{promoHoy.plato}</p>
          <p className="text-xl">+ {promoHoy.extra}</p>
        </div>
      ) : (
        <p>Hoy no tenemos promo libre, ¡consultanos por el menú!</p>
      )}
      <a 
        href="https://wa.me/5492657211497" 
        className="mt-8 block bg-green-600 p-4 rounded-lg font-bold"
      >
        Reservar por WhatsApp
      </a>
    </main>
  );
}