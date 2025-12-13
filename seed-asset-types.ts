import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const assetTypes = [
    { name: 'Geuda Equipment', shortCode: 'GE' },
    { name: 'Lapidary Equipment', shortCode: 'LE' },
    { name: 'Jewellery Equipment', shortCode: 'JE' },
    { name: 'Assay Equipment', shortCode: 'AE' },
    { name: 'Office Furniture', shortCode: 'OF' },
    { name: 'Office Equipment', shortCode: 'OE' },
    { name: 'Fixture & Fittings', shortCode: 'FF' },
    { name: 'Laboratory Equipment', shortCode: 'LBE' },
    { name: 'Computer & Accessories', shortCode: 'CA' },
    { name: 'Software & Software Development', shortCode: 'SSD' },
    { name: 'Gemmological Equipment', shortCode: 'GME' }, // Changed from GE to GME
    { name: 'Research Equipment', shortCode: 'RE' },
    { name: 'Library', shortCode: 'LBY' },
];

async function main() {
    console.log('Seeding Asset Types...');

    for (const assetType of assetTypes) {
        await prisma.assetType.upsert({
            where: { shortCode: assetType.shortCode },
            update: {},
            create: assetType,
        });
    }

    console.log('✅ Asset Types seeded successfully!');
    console.log(`Total: ${assetTypes.length} asset types`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
