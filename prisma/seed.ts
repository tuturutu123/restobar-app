import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Cambia la contraseña aquí si lo deseas
  const passwordHash = await bcrypt.hash('TuPasswordSegura123!', 12)

  await prisma.usuario.upsert({
    // Cambia el correo aquí
    where: { email: 'admin@turestobar.com' },
    update: {},
    create: {
      // Y vuelve a poner el mismo correo aquí
      email: 'admin@turestobar.com',
      password: passwordHash,
      nombre: 'Administrador',
      rol: 'ADMIN',
    },
  })
  console.log('✅ Usuario admin creado')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })