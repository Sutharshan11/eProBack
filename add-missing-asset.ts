import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Adding missing asset GJRTI/CC/HR/OE/0025...');

    await prisma.asset.create({
        data: {
            assetId: 'GJRTI/CC/HR/OE/0025',
            assetCode: 'GJRTI/CC/HR/OE/0025',
            name: 'Office Equipment (Hand Pull Machine',
            category: 'Office Equipment',
            status: 'Active',
            value: 15450,
            branchId: 10, // Colombo Office
            assetTypeId: 6, // Office Equipment
            centerId: 4, // Colombo
            sectionId: 1, // Administration Division
            currentSectionId: 1,
            quantity: 1,
            purchaseDate: new Date('2019-11-20'),
            purchasePrice: 15450,
            currentLocation: 'Colombo',
        },
    });

    console.log('✅ Asset GJRTI/CC/HR/OE/0025 added successfully!');
}

main()
    .catch((e) => {
        console.error('Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
