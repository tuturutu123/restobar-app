import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isAuthenticated = !!req.auth

  // Rutas que requieren autenticación
  const protectedRoutes = ['/admin']
  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r))

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
})

export const config = {
  // Aplica middleware a estas rutas (excluye assets estáticos)
  matcher: ['/admin/:path*', '/api/productos/:path*'],
}