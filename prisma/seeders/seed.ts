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

  await prisma.supplier.upsert({
    where: { supplier_email: 'supplier@gmail.com' },
    create: {
      supplier_email: 'supplier@gmail.com',
      mobile_number: '0000000000',
      supplier_name: 'Supplier Name',
    },
    update: {
      supplier_email: 'supplier@gmail.com',
      mobile_number: '0000000000',
      supplier_name: 'Supplier Name',
    },
  });

  await prisma.purchaseItem.upsert({
    where: { item_name: 'Tur' },
    create: {
      item_name: 'Tur',
    },
    update: {
      item_name: 'Tur',
    },
  });

  await prisma.purchaseItem.upsert({
    where: { item_name: 'Chana' },
    create: {
      item_name: 'Chana',
    },
    update: {
      item_name: 'Chana',
    },
  });
  
  await prisma.purchaseItem.upsert({
    where: { item_name: 'Soyabean' },
    create: {
      item_name: 'Soyabean',
    },
    update: {
      item_name: 'Soyabean',
    },
  });

  await prisma.purchaseItem.upsert({
    where: { item_name: 'Wheat' },
    create: {
      item_name: 'Wheat',
    },
    update: {
      item_name: 'Wheat',
    },
  });

  await prisma.purchaseItem.upsert({
    where: { item_name: 'Tur Kachari' },
    create: {
      item_name: 'Tur Kachari',
    },
    update: {
      item_name: 'Tur Kachari',
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
