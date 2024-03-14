import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding seed.ts...');
  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    create: {
      email: 'admin@gmail.com',
      mobile_number: '9999999999',
      name: 'Admin',
      password: await bcrypt.hash('Pass@123', 10),
    },
    update: {
      email: 'admin@gmail.com',
      mobile_number: '9999999999',
      name: 'Admin',
      password: await bcrypt.hash('Pass@123', 10),
    },
  });
  console.log('Seed.ts seeded successfully.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
