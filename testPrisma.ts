import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const contacts = await prisma.contact.findMany();
  console.log(contacts);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
