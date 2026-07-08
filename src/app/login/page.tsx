'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Al usar redirect: false, NextAuth nos devuelve el resultado para que lo evaluemos
    const result: any = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      alert('Credenciales incorrectas')
    } else {
      // Si la contraseña es correcta, te enviamos manualmente al panel
      window.location.href = '/admin'
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-zinc-950 text-white">
      <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-xl shadow-xl w-96">
        <h1 className="text-2xl font-bold mb-6 text-orange-500 text-center">Acceso Sisu</h1>
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          className="p-3 w-full bg-zinc-800 rounded mb-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" 
          onChange={e => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          className="p-3 w-full bg-zinc-800 rounded mb-6 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" 
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 transition p-3 rounded font-bold">
          Entrar
        </button>
      </form>
    </div>
  )
}