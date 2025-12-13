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

// Laboratory Equipment data from spreadsheet
const labAssets: AssetData[] = [
    { assetCode: 'GJRTI/CC/RD-AN/LBE/0001', center: 'Colombo', section: 'Analytical', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Lab bottle - Wooden', qty: 1, purchaseDate: '2018.03.19', purchasePrice: '13,870.00', grnNum: '2520', remarks: '', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/CC/RD-AN/LBE/0002', center: 'Colombo', section: 'Analytical', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Weigher', qty: 1, purchaseDate: '2012.07.18', purchasePrice: '5,580.00', grnNum: '2520', remarks: '', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/CC/RD-AN/LBE/0003', center: 'Colombo', section: 'Analytical', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Sample Bank', qty: 1, purchaseDate: '2019.12.01', purchasePrice: '5,840.00', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/CC/RD-AN/LBE/0004', center: 'Colombo', section: 'Analytical', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Sample cupboard', qty: 1, purchaseDate: '2018.12.01', purchasePrice: '241,760.00', grnNum: '2425', remarks: '', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/CC/RD-AN/LBE/0005', center: 'Colombo', section: 'Analytical', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Lab Steel Cupboard', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/CC/RD-AN/LBE/0006', center: 'Colombo', section: 'Analytical', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Lab Steel Cupboard', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/CC/RD-AN/LBE/0007', center: 'Colombo', section: 'Analytical', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Lab Steel Oven Locker', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/CC/RD-AN/LBE/0008', center: 'Colombo', section: 'Analytical', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Lab Steel Oven Locker', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/CC/RD-AN/LBE/0009', center: 'Colombo', section: 'Analytical', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Lab Steel Oven Locker', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/GC/RD-Gche/LBE/0010', center: 'Galle', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Sample Banks', qty: 1, purchaseDate: '2019.12.01', purchasePrice: '14,790.00', grnNum: '2421', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/GC/RD-Gche/LBE/0011', center: 'Galle', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Sample Banks', qty: 1, purchaseDate: '2019.12.01', purchasePrice: '14,790.00', grnNum: '2421', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0012', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Laboratory Apparatus M=D', qty: 1, purchaseDate: '2013.12.23', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0013', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Storage cabinet for acid', qty: 1, purchaseDate: '2018.01.24', purchasePrice: '191,550.00', grnNum: '2184', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0014', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Analytical Balance with Monito', qty: 1, purchaseDate: '2024.11.19', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0015', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Table Geochemical lab steel / stainless with monito', qty: 1, purchaseDate: '2024.11.19', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0016', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Table Geochemical lab steel / stainless with monito', qty: 5, purchaseDate: '2013.01.15', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0017', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Balancing and Sedimentrology', qty: 2, purchaseDate: '2012.03.15', purchasePrice: '25,583.00', grnNum: '2167', remarks: '', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/LBE/0018', center: 'Colombo', section: 'Mineral Processing and Sedimentrology', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Balancing and Sedimentrology', qty: 2, purchaseDate: '2012.03.15', purchasePrice: '25,583.00', grnNum: '2167', remarks: '', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/LBE/0019', center: 'Colombo', section: 'Mineral Processing and Sedimentrology', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Sample Banks', qty: 1, purchaseDate: '2019.12.01', purchasePrice: '14,790.00', grnNum: '2421', remarks: '', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/LBE/0020', center: 'Colombo', section: 'Mineral Processing and Sedimentrology', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Sample Banks', qty: 1, purchaseDate: '2015.12.01', purchasePrice: '14,790.00', grnNum: '2421', remarks: '', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MAP/LBE/0021', center: 'Colombo', section: 'Mapping', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Sample Banks', qty: 1, purchaseDate: '2019.08.12', purchasePrice: '51,000.00', grnNum: '2421', remarks: '', currentLocation: 'Colombo', newSection: 'Mapping', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MAP/LBE/0022', center: 'Colombo', section: 'Mapping', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Lens bottle', qty: 1, purchaseDate: '2019.08.12', purchasePrice: '51,000.00', grnNum: '2421', remarks: '', currentLocation: 'Colombo', newSection: 'Mapping', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MAP/LBE/0023', center: 'Colombo', section: 'Mapping', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Sinke table', qty: 1, purchaseDate: '2018.12.01', purchasePrice: '48,300.00', grnNum: '2421', remarks: '', currentLocation: 'Colombo', newSection: 'Mapping', bos: '' },
    { assetCode: 'GJRTI/CC/RD/LBE/0024', center: 'Colombo', section: 'Research Division', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Sinke table', qty: 1, purchaseDate: '2018.12.01', purchasePrice: '48,300.00', grnNum: '2421', remarks: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/LBE/0025', center: 'Colombo', section: 'Research Division', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Sample Banks', qty: 1, purchaseDate: '2015.12.01', purchasePrice: '14,790.00', grnNum: '2421', remarks: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/LBE/0026', center: 'Colombo', section: 'Research Division', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Sample Banks', qty: 1, purchaseDate: '2015.12.01', purchasePrice: '14,790.00', grnNum: '2421', remarks: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/LBE/0027', center: 'Colombo', section: 'Research Division', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Sample Banks', qty: 18, purchaseDate: '2015.12.01', purchasePrice: '14,790.00', grnNum: '2421', remarks: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0028', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Lab Steel Oven Locker', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0029', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Lab Steel Steel Cupbor', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0030', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Lab Steel Steel Cupbor', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0031', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Lab Steel Steel Cupbor', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0032', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Lab Steel Steel Cupbor', qty: 5, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0033', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Lab Steel Steel Cupbor', qty: 7, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0034', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Lab Steel Steel Cupbor', qty: 5, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0035', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Lab Steel Oven Locker', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0036', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Sample Banks', qty: 6, purchaseDate: '2019.12.01', purchasePrice: '14,790.00', grnNum: '2421', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0037', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Sample Banks', qty: 6, purchaseDate: '2019.12.01', purchasePrice: '14,790.00', grnNum: '2421', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0038', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Sample Banks', qty: 6, purchaseDate: '2018.12.01', purchasePrice: '14,790.00', grnNum: '2421', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0039', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', name: 'Laboratory Equipment Fuels hood', qty: 6, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
];

function parsePrice(priceStr: string): number {
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/,/g, ''));
}

function parseDate(dateStr: string): Date | null {
    if (!dateStr || dateStr === '2013' || dateStr === '2014' || dateStr === '2024' || dateStr === '2015' || dateStr === '2018' || dateStr === '2019' || dateStr === '2012') return null;
    const parts = dateStr.split('.');
    if (parts.length !== 3) return null;
    if (parts[2].length > 2 || isNaN(Number(parts[2]))) return null;
    return new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
}

async function main() {
    console.log('🚀 Adding Laboratory Equipment items...');
    console.log(`Total assets to import: ${labAssets.length}`);
    console.log('');

    const assetType = await prisma.assetType.findFirst({ where: { name: 'Laboratory Equipment' } });
    const centers = await prisma.center.findMany();
    const sections = await prisma.section.findMany();

    const colomboBranch = await prisma.branch.findFirst({ where: { name: 'Colombo Office' } });

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const asset of labAssets) {
        try {
            const center = centers.find((c: any) => c.name === asset.center);
            const currentSection = sections.find((s: any) => s.name === asset.newSection);

            if (!center) {
                errors.push(`Asset ${asset.assetCode}: Center "${asset.center}" not found`);
                errorCount++;
                continue;
            }

            const purchaseDate = parseDate(asset.purchaseDate);
            const purchasePrice = parsePrice(asset.purchasePrice);

            await prisma.asset.create({
                data: {
                    assetId: asset.assetCode,
                    assetCode: asset.assetCode,
                    name: asset.name,
                    category: 'Laboratory Equipment',
                    status: 'Active',
                    value: purchasePrice || 0,
                    branchId: colomboBranch!.id,
                    assetTypeId: assetType!.id,
                    centerId: center.id,
                    sectionId: currentSection?.id,
                    currentSectionId: currentSection?.id,
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
