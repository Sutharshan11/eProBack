import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const missingAssets = [
    { assetCode: 'GJRTI/CC/RD/OE/0074', name: 'Office Equipment Silon camera accessories 11 " cath lens', price: 73500, grnNum: '2679', date: '2018-04-21' },
    { assetCode: 'GJRTI/CC/RD/OE/0075', name: 'Office Equipment Canon camera accessories 11 " cath lens', price: 25000, grnNum: '2679', date: '2018-06-21' },
    { assetCode: 'GJRTI/CC/RD/OE/0076', name: 'Office Equipment Silon Tri Pad Holder', price: 72500, grnNum: '2673', date: '2018-04-21', bosCode: 'R' },
    { assetCode: 'GJRTI/CC/RD/OE/0077', name: 'Office Equipment Silon camera accessories', price: 72500, grnNum: '2673', date: '2018-04-21' },
    { assetCode: 'GJRTI/CC/RD/OE/0078', name: 'Office Equipment Canon camera accessories', price: 25000, grnNum: '2673', date: '2018-06-21' },
    { assetCode: 'GJRTI/CC/RD/OE/0079', name: 'Office Equipment Canon camera accessories', price: 25000, grnNum: '2673', date: '2018-06-21' },
    { assetCode: 'GJRTI/CC/RD/OE/0080', name: 'Office Equipment Silon camera accessories', price: 72500, grnNum: '2673', date: '2018-04-21', bosCode: 'R' },
];

async function main() {
    console.log('Adding 7 missing assets with corrected dates...');

    const assetType = await prisma.assetType.findFirst({ where: { name: 'Office Equipment' } });
    const center = await prisma.center.findFirst({ where: { name: 'Colombo' } });
    const section = await prisma.section.findFirst({ where: { name: 'Research Division' } });
    const bosRepair = await prisma.boardOfSurveyCategory.findFirst({ where: { code: 'R' } });
    const colomboBranch = await prisma.branch.findFirst({ where: { name: 'Colombo Office' } });

    for (const asset of missingAssets) {
        await prisma.asset.create({
            data: {
                assetId: asset.assetCode,
                assetCode: asset.assetCode,
                name: asset.name,
                category: 'Office Equipment',
                status: asset.bosCode === 'R' ? 'Repair' : 'Active',
                value: asset.price,
                branchId: colomboBranch!.id,
                assetTypeId: assetType!.id,
                centerId: center!.id,
                sectionId: section!.id,
                currentSectionId: section!.id,
                boardOfSurveyCategoryId: asset.bosCode === 'R' ? bosRepair!.id : undefined,
                quantity: 1,
                purchaseDate: new Date(asset.date),
                purchasePrice: asset.price,
                grnNumber: asset.grnNum,
                currentLocation: 'Colombo',
            },
        });
        console.log(`✅ Added: ${asset.assetCode}`);
    }

    console.log('\n✅ All 7 missing assets added successfully!');
}

main()
    .catch((e) => {
        console.error('Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
