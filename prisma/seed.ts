import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()




async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      firstname: 'Alice',
      password:'123456',
      phonenumber:'123123',
      lastname:'soliman',
      Checkins: {
        create: {
          timestamp: new Date(Date.now())
        },
      },
      Checkouts:{
          create:{
              timestamp:new Date(Date.now()+8*60*60*1000)
          }
      }
    },
  })

  const amr = await prisma.user.upsert({
    where: { email: 'amr@prisma.io' },
    update: {},
    create: {
      email: 'amr@prisma.io',
      firstname: 'amr',
      password:'123456',
      phonenumber:'123123',
      lastname:'soliman',
      Checkins: {
        create: {
          timestamp: new Date(Date.now())
        },
      },
      Checkouts:{
          create:{
              timestamp:new Date(Date.now()+8*60*60*1000)
          }
      }
    },
  })
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })