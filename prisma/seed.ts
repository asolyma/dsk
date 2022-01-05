import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync();
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      firstname: "Alice",
      password: bcrypt.hashSync("123456", salt),
      phonenumber: "123123",
      lastname: "soliman",
      checkins: {
        create: {
          timestamp: new Date(Date.now()),
        },
      },
      checkouts: {
        create: {
          timestamp: new Date(Date.now() + 8 * 60 * 60 * 1000),
        },
      },
      role: "MEMBER",
    },
  });

  const lolo = await prisma.user.upsert({
    where: { email: "lolo@prisma.io" },
    update: {},
    create: {
      email: "lolo@prisma.io",
      firstname: "lolo",
      password: bcrypt.hashSync("123456", salt),
      phonenumber: "123123",
      lastname: "soliman",
      checkins: {
        create: {
          timestamp: new Date(Date.now()),
        },
      },
      checkouts: {
        create: {
          timestamp: new Date(Date.now() + 8 * 60 * 60 * 1000),
        },
      },
      role: "MEMBER",
    },
  });
  const amr = await prisma.user.upsert({
    where: { email: "asolym@hotmail.com" },
    update: {},
    create: {
      email: "asolyma@hotmail.com",
      firstname: "Amr",
      password: bcrypt.hashSync("password", salt),
      phonenumber: "123123",
      lastname: "soliman",
      checkins: {
        create: {
          timestamp: new Date(Date.now()),
        },
      },
      checkouts: {
        create: {
          timestamp: new Date(Date.now() + 8 * 60 * 60 * 1000),
        },
      },
      role: "ADMIN",
      avatar:
        "https://www.facebook.com/photo/?fbid=1774302079486156&set=a.1375319682717733",
    },
  });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
