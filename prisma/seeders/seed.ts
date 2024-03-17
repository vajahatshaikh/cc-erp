import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding seed.ts...');

  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      mobile_number: '9999999999',
      name: 'Admin',
      password: await bcrypt.hash('Pass@123', 10),
    },
  });

  await prisma.supplier.upsert({
    where: { supplier_email: 'supplier@gmail.com' },
    update: {},
    create: {
      supplier_email: 'supplier@gmail.com',
      mobile_number: '0000000000',
      supplier_name: 'Supplier Name',
    },
  });

  await prisma.purchaseItem.upsert({
    where: { item_name: 'Tur' },
    update: {},
    create: {
      item_name: 'Tur',
    },
  });

  await prisma.purchaseItem.upsert({
    where: { item_name: 'Chana' },
    update: {},
    create: {
      item_name: 'Chana',
    },
  });

  await prisma.purchaseItem.upsert({
    where: { item_name: 'Soyabean' },
    update: {},
    create: {
      item_name: 'Soyabean',
    },
  });

  await prisma.purchaseItem.upsert({
    where: { item_name: 'Wheat' },
    update: {},
    create: {
      item_name: 'Wheat',
    },
  });

  await prisma.purchaseItem.upsert({
    where: { item_name: 'Tur Kachari' },
    update: {},
    create: {
      item_name: 'Tur Kachari',
    },
  });

  await prisma.purchase.upsert({
    where: { id: 1 },
    update: {},
    create: {
      purchase_date: new Date('11-02-2020'),
      bill_no: 101,
      supplier_name: 'Supplier Name',
      purchase_item_name: 'Chana',
      weight: 3.76,
      purchase_amount: 16305,
      adat: 16305 * 0.0125,
      total_amount: 16305 + 16305 * 0.0125,
    },
  });

  await prisma.marketFee.upsert({
    where: { id: 1 },
    update: {},
    create: {
      purchase_date: new Date(),
      purchase_item_name: 'Chana',
      market_cess: 171.2,
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
