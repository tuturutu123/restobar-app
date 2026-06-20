import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Cambiá 'TuPasswordSegura123!' por la contraseña que quieras usar
  const passwordHash = await bcrypt.hash('TuPasswordSegura123!', 12)

  await prisma.usuario.upsert({
    where: { email: 'admin@turestobar.com' },
    update: {},
    create: {
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