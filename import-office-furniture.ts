import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AssetData {
    assetCode: string;
    center: string;
    section: string;
    assetType: string;
    name: string;
    qty: number;
    purchaseDate: string;
    purchasePrice: string;
    grnNum: string;
    remarks: string;
    currentLocation: string;
    newSection: string;
    bos: string;
}

// Office Furniture data from Naula center
const furnitureAssets: AssetData[] = [
    { assetCode: 'GJRTI/NUC/OFF/OF/00001', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Arm', qty: 1, purchaseDate: '', purchasePrice: '15,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00002', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair office', qty: 1, purchaseDate: '', purchasePrice: '15,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00003', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Fan', qty: 1, purchaseDate: '', purchasePrice: '15,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00004', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Fan', qty: 1, purchaseDate: '', purchasePrice: '9,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00005', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '1,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00006', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '1,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00007', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '1,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00008', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '1,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00009', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '1,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00010', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '1,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00011', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Kandy', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00012', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Kandy', newSection: '', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00013', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '1,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00014', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '1,600.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00015', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '1,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00016', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Kandy', newSection: '', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00017', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '1,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00018', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: '', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00019', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Kandy', newSection: '', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00020', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Kandy', newSection: '', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00021', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '1,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00022', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Kandy', newSection: '', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00023', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Kandy', newSection: '', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00024', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Kandy', newSection: '', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00025', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Kandy', newSection: '', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00026', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Kandy', newSection: '', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00027', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Kandy', newSection: '', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00028', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Chair Plastic', qty: 1, purchaseDate: '', purchasePrice: '1,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00029', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Wood Plastic', qty: 1, purchaseDate: '', purchasePrice: '1,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00030', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Wood Plastic', qty: 1, purchaseDate: '', purchasePrice: '50.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '2024' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00031', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Steel Plastic', qty: 1, purchaseDate: '', purchasePrice: '50.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '2024' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00032', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Steel Plastic', qty: 1, purchaseDate: '', purchasePrice: '50.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '2024' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00033', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Steel Plastic', qty: 1, purchaseDate: '', purchasePrice: '50.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '2024' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00034', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Steel Plastic', qty: 1, purchaseDate: '', purchasePrice: '50.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/NUC/OFF/OF/00035', center: 'Naula', section: 'Office', assetType: 'Office Furniture', name: 'Office Furniture Steel Plastic', qty: 1, purchaseDate: '', purchasePrice: '500.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Office', bos: '' },
];

function parsePrice(priceStr: string): number {
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/,/g, ''));
}

async function main() {
    console.log('🚀 Adding Office Furniture items from Naula...');
    console.log(`Total assets to import: ${furnitureAssets.length}`);
    console.log('');

    const assetType = await prisma.assetType.findFirst({ where: { name: 'Office Furniture' } });
    const center = await prisma.center.findFirst({ where: { name: 'Naula' } });
    const section = await prisma.section.findFirst({ where: { name: 'Office' } });
    const bosCategories = await prisma.boardOfSurveyCategory.findMany();

    // Get or create branches
    const naulaBranch = await prisma.branch.upsert({
        where: { name: 'Naula Office' },
        update: {},
        create: { name: 'Naula Office', location: 'Naula' },
    });

    const kandyBranch = await prisma.branch.findFirst({ where: { name: 'Kandy Office' } });

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const asset of furnitureAssets) {
        try {
            const bosCategory = asset.bos && asset.bos === '2024' ? null : bosCategories.find((b: any) => b.code === asset.bos);

            // Determine branch based on current location
            const branchId = asset.currentLocation === 'Kandy' ? kandyBranch!.id : naulaBranch.id;
            const purchasePrice = parsePrice(asset.purchasePrice);

            await prisma.asset.create({
                data: {
                    assetId: asset.assetCode,
                    assetCode: asset.assetCode,
                    name: asset.name,
                    category: 'Office Furniture',
                    status: 'Active',
                    value: purchasePrice || 0,
                    branchId,
                    assetTypeId: assetType!.id,
                    centerId: center!.id,
                    sectionId: section!.id,
                    currentSectionId: asset.newSection ? section!.id : undefined,
                    boardOfSurveyCategoryId: bosCategory?.id,
                    quantity: asset.qty,
                    purchasePrice,
                    currentLocation: asset.currentLocation,
                },
            });

            successCount++;
            console.log(`✅ Imported: ${asset.assetCode} - ${asset.name}`);
        } catch (error: any) {
            errorCount++;
            errors.push(`Asset ${asset.assetCode}: ${error.message}`);
            console.error(`❌ Error importing ${asset.assetCode}: ${error.message}`);
        }
    }

    console.log('');
    console.log('='.repeat(60));
    console.log('📊 Import Summary');
    console.log('='.repeat(60));
    console.log(`✅ Successfully imported: ${successCount} assets`);
    console.log(`❌ Failed: ${errorCount} assets`);
    console.log('');

    if (errors.length > 0) {
        console.log('Errors:');
        errors.forEach(err => console.log(`  - ${err}`));
    }
}

main()
    .catch((e) => {
        console.error('Fatal error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
