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

// Jewellery Equipment data from spreadsheet
const jewelleryAssets: AssetData[] = [
    { assetCode: 'GJRTI/AC/JMS/JE/0001', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Anvil Steel', qty: 1, purchaseDate: '2017.09.26', purchasePrice: '1,900.00', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0002', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Anvil Steel', qty: 1, purchaseDate: '2017.09.26', purchasePrice: '1,900.00', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0003', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Anvil Steel', qty: 1, purchaseDate: '2017.09.26', purchasePrice: '2,500.00', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0004', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Anvil Horn', qty: 1, purchaseDate: '2017.09.26', purchasePrice: '5,400.00', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0005', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Blow Lamp Set', qty: 1, purchaseDate: '2017.10.27', purchasePrice: '4,000.00', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0006', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Blow Lamp Set', qty: 1, purchaseDate: '2017.10.27', purchasePrice: '4,000.00', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0007', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Blow Lamp Set', qty: 1, purchaseDate: '2017.10.27', purchasePrice: '4,000.00', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0008', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Blow Lamp Set', qty: 1, purchaseDate: '2017.10.27', purchasePrice: '4,000.00', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0009', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Blow Lamp Set', qty: 1, purchaseDate: '2017.10.27', purchasePrice: '4,000.00', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0010', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Blow Lamp Set', qty: 1, purchaseDate: '2017.10.27', purchasePrice: '4,000.00', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0011', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Blow Lamp Set', qty: 1, purchaseDate: '2017.10.27', purchasePrice: '4,000.00', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0012', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Blow Lamp Set', qty: 1, purchaseDate: '2017.10.27', purchasePrice: '4,000.00', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0013', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Blow Lamp Set', qty: 1, purchaseDate: '2017.10.27', purchasePrice: '4,000.00', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0014', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Blow Lamp Set', qty: 1, purchaseDate: '2017.10.27', purchasePrice: '4,000.00', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0015', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Blow Lamp Set', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0016', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Blow Lamp Set', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0017', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Blow Lamp Set', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0018', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Blow Lamp Set', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0019', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Bench Grinder', qty: 1, purchaseDate: '2017.09.26', purchasePrice: '4,950.00', grnNum: '', remarks: 'Handover to HR Division', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0020', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Bench Vice', qty: 1, purchaseDate: '2017.09.25', purchasePrice: '2,500.00', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0021', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Bench Vice', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0022', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Bench Vice', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0023', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Bench Vice', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0024', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Domring Block', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0025', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Domring Block', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0026', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Draw Plate', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0027', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Draw Plate', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0028', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Electronic Scale', qty: 1, purchaseDate: '2017.10.27', purchasePrice: '31,000.00', grnNum: '', remarks: 'Handover to HR Division', currentLocation: 'Colombo', newSection: 'Jewellery Manufacturing', bos: 'M' },
    { assetCode: 'GJRTI/AC/JMS/JE/0029', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Hand Vice', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0030', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Hand Vice', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0031', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Hand Vice', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0032', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Hand Vice', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0033', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Hand Vice', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0034', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Melting Furnance', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0035', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Optivisor', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0036', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Optivisor', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/AC/JMS/JE/0037', center: 'Attanagalla', section: 'Jewellery Manufacturing', assetType: 'Jewellery Equipment', name: 'Jewellery Equipment Optivisor', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Attanagalla', newSection: 'Jewellery Manufacturing', bos: '' },
];

function parsePrice(priceStr: string): number {
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/,/g, ''));
}

function parseDate(dateStr: string): Date | null {
    if (!dateStr) return null;
    const parts = dateStr.split('.');
    if (parts.length !== 3) return null;
    if (parts[2].length > 2 || isNaN(Number(parts[2]))) return null;
    return new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
}

async function main() {
    console.log('🚀 Adding Jewellery Equipment items...');
    console.log(`Total assets to import: ${jewelleryAssets.length}`);
    console.log('');

    const assetType = await prisma.assetType.findFirst({ where: { name: 'Jewellery Equipment' } });
    const center = await prisma.center.findFirst({ where: { name: 'Attanagalla' } });
    const section = await prisma.section.findFirst({ where: { name: 'Jewellery Manufacturing' } });
    const bosCategories = await prisma.boardOfSurveyCategory.findMany();

    // Create Attanagalla branch if needed
    let attanagallaBranch = await prisma.branch.findFirst({ where: { name: 'Attanagalla Office' } });
    if (!attanagallaBranch) {
        attanagallaBranch = await prisma.branch.create({
            data: { name: 'Attanagalla Office', location: 'Attanagalla' }
        });
        console.log('Created new branch: Attanagalla Office');
    }

    const colomboBranch = await prisma.branch.findFirst({ where: { name: 'Colombo Office' } });

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const asset of jewelleryAssets) {
        try {
            const bosCategory = asset.bos ? bosCategories.find((b: any) => b.code === asset.bos) : null;

            const branchId = asset.currentLocation === 'Colombo' ? colomboBranch!.id : attanagallaBranch!.id;
            const purchasePrice = parsePrice(asset.purchasePrice);
            const purchaseDate = parseDate(asset.purchaseDate);

            await prisma.asset.create({
                data: {
                    assetId: asset.assetCode,
                    assetCode: asset.assetCode,
                    name: asset.name,
                    category: 'Jewellery Equipment',
                    status: asset.bos === 'M' ? 'Missing' : 'Active',
                    value: purchasePrice || 0,
                    branchId,
                    assetTypeId: assetType!.id,
                    centerId: center!.id,
                    sectionId: section!.id,
                    currentSectionId: section!.id,
                    boardOfSurveyCategoryId: bosCategory?.id,
                    quantity: asset.qty,
                    purchaseDate,
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
