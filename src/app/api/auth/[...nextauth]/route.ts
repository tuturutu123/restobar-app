import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Le decimos a TypeScript: "Tranquilo, esto es un texto seguro"
        const email = credentials?.email as string
        const password = credentials?.password as string

        if (!email || !password) {
          return null
        }

        // Busca al usuario en la base de datos de Neon
        const user = await prisma.usuario.findUnique({
          where: { email: email }
        })

        if (!user) {
          return null
        }

        // Compara la contraseña encriptada
        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
          return null
        }

        return { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  }
})

export { handler as GET, handler as POST }