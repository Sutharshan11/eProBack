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

// Lapidary Equipment data from spreadsheet
const lapidaryAssets: AssetData[] = [
    { assetCode: 'GJRTI/NUC/GCS/LE/0001', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment Machine PD 4', qty: 1, purchaseDate: '', purchasePrice: '250,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: 'R' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0002', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment Machine PD 4', qty: 1, purchaseDate: '', purchasePrice: '200,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: 'R' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0003', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment Machine PD 4', qty: 1, purchaseDate: '', purchasePrice: '200,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0004', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment Machine PD 4', qty: 1, purchaseDate: '', purchasePrice: '250,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0005', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment Machine PD 1', qty: 1, purchaseDate: '', purchasePrice: '200,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0006', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment Machine PD 1', qty: 1, purchaseDate: '', purchasePrice: '200,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0007', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment Machine Trim saw', qty: 1, purchaseDate: '', purchasePrice: '150,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0008', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment Machine Dual Grinding', qty: 1, purchaseDate: '', purchasePrice: '150,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0009', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment Alan key (7 pics)', qty: 1, purchaseDate: '', purchasePrice: '2,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0010', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment faceter', qty: 1, purchaseDate: '', purchasePrice: '25,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0011', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment faceter', qty: 1, purchaseDate: '', purchasePrice: '25,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0012', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment faceter', qty: 1, purchaseDate: '', purchasePrice: '25,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0013', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment faceter', qty: 1, purchaseDate: '', purchasePrice: '25,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0014', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment faceter', qty: 1, purchaseDate: '', purchasePrice: '25,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0015', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment faceter', qty: 1, purchaseDate: '', purchasePrice: '25,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0016', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment faceter', qty: 1, purchaseDate: '', purchasePrice: '25,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0017', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment faceter', qty: 1, purchaseDate: '', purchasePrice: '25,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0018', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment faceter', qty: 1, purchaseDate: '', purchasePrice: '25,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0019', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment faceter', qty: 1, purchaseDate: '', purchasePrice: '25,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0020', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment faceter', qty: 1, purchaseDate: '', purchasePrice: '25,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0021', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment faceter', qty: 1, purchaseDate: '', purchasePrice: '25,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0022', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment faceter', qty: 1, purchaseDate: '', purchasePrice: '25,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0023', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment faceter', qty: 1, purchaseDate: '', purchasePrice: '25,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0024', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment faceter', qty: 1, purchaseDate: '', purchasePrice: '25,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0025', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment faceter', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Kandy', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0026', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment faceter', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Kandy', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0027', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment faceter', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Kandy', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0028', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment lap copper', qty: 1, purchaseDate: '', purchasePrice: '17,500.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0029', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment lap copper', qty: 1, purchaseDate: '', purchasePrice: '17,500.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0030', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment lap copper', qty: 1, purchaseDate: '', purchasePrice: '17,500.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0081', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment lap copper', qty: 1, purchaseDate: '', purchasePrice: '20,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0082', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment lap copper', qty: 1, purchaseDate: '', purchasePrice: '20,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0083', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment lap copper', qty: 1, purchaseDate: '', purchasePrice: '20,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0084', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment lap copper', qty: 1, purchaseDate: '', purchasePrice: '20,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0035', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment lap copper', qty: 1, purchaseDate: '', purchasePrice: '20,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0036', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment lap copper', qty: 1, purchaseDate: '', purchasePrice: '20,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0037', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment lap copper', qty: 1, purchaseDate: '', purchasePrice: '20,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0038', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment lap copper', qty: 1, purchaseDate: '', purchasePrice: '20,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0039', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment lap copper', qty: 1, purchaseDate: '', purchasePrice: '20,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0040', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment lap Tin', qty: 1, purchaseDate: '', purchasePrice: '15,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0041', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment lap Tin', qty: 1, purchaseDate: '', purchasePrice: '15,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0042', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment lap Tin', qty: 1, purchaseDate: '', purchasePrice: '15,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0043', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment lap Tin', qty: 1, purchaseDate: '', purchasePrice: '15,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0044', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment lap Tin', qty: 1, purchaseDate: '', purchasePrice: '15,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NUC/GCS/LE/0045', center: 'Naula', section: 'Gem Cutting', assetType: 'Lapidary Equipment', name: 'Lapidary Equipment lap Tin', qty: 1, purchaseDate: '', purchasePrice: '15,000.00', grnNum: '', remarks: '', currentLocation: 'Naula', newSection: 'Gem Cutting', bos: '' },
];

function parsePrice(priceStr: string): number {
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/,/g, ''));
}

async function main() {
    console.log('🚀 Adding Lapidary Equipment items...');
    console.log(`Total assets to import: ${lapidaryAssets.length}`);
    console.log('');

    const assetType = await prisma.assetType.findFirst({ where: { name: 'Lapidary Equipment' } });
    const center = await prisma.center.findFirst({ where: { name: 'Naula' } });
    const section = await prisma.section.findFirst({ where: { name: 'Gem Cutting' } });
    const bosCategories = await prisma.boardOfSurveyCategory.findMany();

    const naulaBranch = await prisma.branch.findFirst({ where: { name: 'Naula Office' } });
    const kandyBranch = await prisma.branch.findFirst({ where: { name: 'Kandy Office' } });

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const asset of lapidaryAssets) {
        try {
            const bosCategory = asset.bos && asset.bos !== '2024' ? bosCategories.find((b: any) => b.code === asset.bos) : null;

            const branchId = asset.currentLocation === 'Kandy' ? kandyBranch!.id : naulaBranch!.id;
            const purchasePrice = parsePrice(asset.purchasePrice);

            await prisma.asset.create({
                data: {
                    assetId: asset.assetCode,
                    assetCode: asset.assetCode,
                    name: asset.name,
                    category: 'Lapidary Equipment',
                    status: asset.bos === 'R' ? 'Repair' : 'Active',
                    value: purchasePrice || 0,
                    branchId,
                    assetTypeId: assetType!.id,
                    centerId: center!.id,
                    sectionId: section!.id,
                    currentSectionId: section!.id,
                    boardOfSurveyCategoryId: bosCategory?.id,
                    quantity: asset.qty,
                    purchasePrice,
                    grnNumber: asset.grnNum || null,
                    remarks: asset.remarks || null,
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
