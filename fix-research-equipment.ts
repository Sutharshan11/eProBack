import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🔧 Adding missing Research Equipment asset...');

    const assetType = await prisma.assetType.findFirst({ where: { name: 'Research Equipment' } });
    const center = await prisma.center.findFirst({ where: { name: 'Colombo' } });
    const section = await prisma.section.findFirst({ where: { name: 'Geo Chemistry' } });
    const colomboBranch = await prisma.branch.findFirst({ where: { name: 'Colombo Office' } });

    await prisma.asset.create({
        data: {
            assetId: 'GJRTI/CC/RD-Gche/RE/0021',
            assetCode: 'GJRTI/CC/RD-Gche/RE/0021',
            name: 'Research Equipment Pumpi water',
            category: 'Research Equipment',
            status: 'Active',
            value: 0,
            branchId: colomboBranch!.id,
            assetTypeId: assetType!.id,
            centerId: center!.id,
            sectionId: section!.id,
            currentSectionId: section!.id,
            quantity: 1,
            purchaseDate: null, // No valid date
            purchasePrice: 0,
            currentLocation: 'Colombo',
        },
    });

    console.log('✅ Added: GJRTI/CC/RD-Gche/RE/0021 - Research Equipment Pumpi water');
    console.log('\n✅ All Research Equipment assets now complete!');
}

main()
    .catch((e) => {
        console.error('Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
