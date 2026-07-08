'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('❌ Correo o contraseña incorrectos')
        setLoading(false)
      } else if (result?.ok) {
        // Redirección nativa de Next.js
        router.push('/admin')
        router.refresh()
      }
    } catch (err) {
      setError('❌ Error al conectar con el servidor')
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-zinc-950 text-white">
      <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-xl shadow-xl w-96">
        <h1 className="text-2xl font-bold mb-6 text-orange-500 text-center">Acceso Sisu</h1>
        
        {/* Caja de error visual */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-500 p-3 rounded mb-4 text-center text-sm font-bold">
            {error}
          </div>
        )}

        <input 
          type="email" 
          placeholder="Correo electrónico" 
          className="p-3 w-full bg-zinc-800 text-white rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500" 
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          className="p-3 w-full bg-zinc-800 text-white rounded mb-6 focus:outline-none focus:ring-2 focus:ring-orange-500" 
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 transition p-3 rounded font-bold disabled:opacity-50"
        >
          {loading ? 'Ingresando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}