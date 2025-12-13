import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const centers = [
    { name: 'Attanagalla', shortCode: 'AC' },
    { name: 'Badulla', shortCode: 'BC' },
    { name: 'Batticoloa', shortCode: 'BTC' },
    { name: 'Colombo', shortCode: 'CC' },
    { name: 'Galle', shortCode: 'GC' },
    { name: 'Gampola', shortCode: 'GPC' },
    { name: 'Jaffna', shortCode: 'JC' },
    { name: 'Kandy', shortCode: 'KC' },
    { name: 'Laggala', shortCode: 'LC' },
    { name: 'Maradana', shortCode: 'MC' },
    { name: 'Naula', shortCode: 'NUC' },
    { name: 'Nivithigala', shortCode: 'NC' },
    { name: 'Rathnapura', shortCode: 'RC' },
    { name: 'Rathnapura-YC', shortCode: 'RYC' },
    { name: 'Ratnapura-GSP', shortCode: 'RGSP' },
    { name: 'Senapura', shortCode: 'SC' },
];

async function main() {
    console.log('Seeding Centers...');

    for (const center of centers) {
        await prisma.center.upsert({
            where: { shortCode: center.shortCode },
            update: {},
            create: center,
        });
    }

    console.log('✅ Centers seeded successfully!');
    console.log(`Total: ${centers.length} centers`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
