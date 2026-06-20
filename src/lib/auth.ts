import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import { LoginSchema } from '@/lib/validations'
import bcrypt from 'bcryptjs'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        // 1. Validar con Zod primero
        const parsed = LoginSchema.safeParse(credentials)
        if (!parsed.success) return null

        // 2. Buscar usuario en DB
        const usuario = await prisma.usuario.findUnique({
          where: { email: parsed.data.email },
        })
        if (!usuario) return null

        // 3. Comparar hash (nunca texto plano)
        const passwordOk = await bcrypt.compare(
          parsed.data.password,
          usuario.password
        )
        if (!passwordOk) return null

        return {
          id: String(usuario.id),
          email: usuario.email,
          name: usuario.nombre,
          role: usuario.rol,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) (token as any).role = (user as any).role
      return token
    },
    async session({ session, token }) {
      if (token) (session.user as any).role = (token as any).role as string
      return session
    },
  },
  pages: {
    signIn: '/login', // Página de login personalizada
    error: '/login',
  },
  session: { strategy: 'jwt' },
})