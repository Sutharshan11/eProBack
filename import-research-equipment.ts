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

// Research Equipment data from spreadsheet
const researchAssets: AssetData[] = [
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0001', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Rock Gravity shaker Scale', qty: 1, purchaseDate: '2013.12.11', purchasePrice: '137,764.30', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0002', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Rock Gravity shaker Scale', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Sent to Rathnapura dated 01.08.2013', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0003', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Rock Gravity shaker Scale', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '2024' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0004', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Emergency Shower & eye washen', qty: 1, purchaseDate: '2013.03.18', purchasePrice: '100,000.00', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0005', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Scales', qty: 1, purchaseDate: '2024.12.10', purchasePrice: '', grnNum: '2823', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0006', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment vacuum pump', qty: 1, purchaseDate: '2013.12.10', purchasePrice: '175,000.00', grnNum: '2823', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0007', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Electronic with Output Miniac', qty: 1, purchaseDate: '2012.11.13', purchasePrice: '374,941.00', grnNum: '1832', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0008', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Peristaltic Pump', qty: 1, purchaseDate: '2012.11.13', purchasePrice: '46,510.31', grnNum: '1832', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0009', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Peristaltic Pump', qty: 1, purchaseDate: '2024.10.15', purchasePrice: '141,000.00', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0010', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Peristaltic Pump', qty: 1, purchaseDate: '2024.10.15', purchasePrice: '181,000.00', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0011', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Ionic Spectrometer Elec.', qty: 1, purchaseDate: '2012.11.01', purchasePrice: '272,681.00', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0012', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Occum Pump', qty: 1, purchaseDate: '2012.10.30', purchasePrice: '65,338.00', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0013', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Heater circulation', qty: 1, purchaseDate: '2013.07.24', purchasePrice: '136,264.00', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0014', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment D.C power pack', qty: 1, purchaseDate: '2013.07.24', purchasePrice: '84,000.00', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0015', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Bunsen burner with Air regulator', qty: 1, purchaseDate: '2013.03.15', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0016', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Bunsen burner', qty: 1, purchaseDate: '2013.03.01', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0017', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Bunsen burner', qty: 1, purchaseDate: '2024.03.01', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0018', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Bunsen burner with Air regulator', qty: 1, purchaseDate: '2024.03.01', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0019', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Bunsen burner with Air regulator', qty: 1, purchaseDate: '2024.03.01', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0020', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Distilling water apparatus', qty: 1, purchaseDate: '2014.10.15', purchasePrice: '462,870.80', grnNum: '3445', remarks: 'Sent to DR COMP CENTER OUR', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0021', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Pumpi water', qty: 1, purchaseDate: '2012.11.0', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0022', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Pumpi scale water', qty: 1, purchaseDate: '2013.11.25', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0023', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Sink', qty: 1, purchaseDate: '2013.12.13', purchasePrice: '3,870.00', grnNum: '2833', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0024', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Sink', qty: 1, purchaseDate: '2013.12.13', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/RE/0025', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Research Equipment', name: 'Research Equipment Schrodorm', qty: 1, purchaseDate: '1000', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/RE/0026', center: 'Colombo', section: 'Mineral Processing', assetType: 'Research Equipment', name: 'Research Equipment Microscope with ondigery', qty: 1, purchaseDate: '2013.12.10', purchasePrice: '183,518.00', grnNum: '2783', remarks: '', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/RE/0027', center: 'Colombo', section: 'Mineral Processing', assetType: 'Research Equipment', name: 'Research Equipment siving machine', qty: 1, purchaseDate: '2024.12.10', purchasePrice: '213,330.00', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/RE/0028', center: 'Colombo', section: 'Mineral Processing', assetType: 'Research Equipment', name: 'Research Equipment Crusher Microscope with coldigery', qty: 1, purchaseDate: '2024.11.30', purchasePrice: '183,518.00', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/RE/0029', center: 'Colombo', section: 'Mineral Processing', assetType: 'Research Equipment', name: 'Research Equipment Ceramic Microscope', qty: 1, purchaseDate: '2024.09.14', purchasePrice: '158,675.00', grnNum: '2535', remarks: '', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/RE/0030', center: 'Colombo', section: 'Mineral Processing', assetType: 'Research Equipment', name: 'Research Equipment Ceramic Mill', qty: 1, purchaseDate: '2024.09.14', purchasePrice: '158,675.00', grnNum: '2535', remarks: '', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/RE/0031', center: 'Colombo', section: 'Mineral Processing', assetType: 'Research Equipment', name: 'Research Equipment D.Pegatior a wing electroscope', qty: 1, purchaseDate: '2024.03.21', purchasePrice: '31,500.00', grnNum: '2831', remarks: '', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/RE/0032', center: 'Colombo', section: 'Mineral Processing', assetType: 'Research Equipment', name: 'Research Equipment Sch. Microscope', qty: 2, purchaseDate: '2024.12.01', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/RE/0033', center: 'Colombo', section: 'Mineral Processing', assetType: 'Research Equipment', name: 'Research Equipment Sch. Microscope', qty: 1, purchaseDate: '2024.12.01', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/RE/0034', center: 'Colombo', section: 'Mineral Processing', assetType: 'Research Equipment', name: 'Research Equipment Eln-Digital hand lens', qty: 1, purchaseDate: '2012.12.31', purchasePrice: '3,438.00', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/RE/0035', center: 'Colombo', section: 'Mineral Processing', assetType: 'Research Equipment', name: 'Research Equipment Eln-Digital hand lens', qty: 1, purchaseDate: '2012.12.31', purchasePrice: '3,438.00', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/RE/0036', center: 'Colombo', section: 'Mineral Processing', assetType: 'Research Equipment', name: 'Research Equipment Eln-Digital hand lens', qty: 1, purchaseDate: '2012.12.31', purchasePrice: '3,438.00', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/RE/0037', center: 'Colombo', section: 'Mineral Processing', assetType: 'Research Equipment', name: 'Research Equipment Eln-Digital hand lens', qty: 1, purchaseDate: '2012.12.31', purchasePrice: '3,438.00', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/RE/0038', center: 'Colombo', section: 'Mineral Processing', assetType: 'Research Equipment', name: 'Research Equipment Eln-Digital hand lens', qty: 14, purchaseDate: '2012.12.31', purchasePrice: '2,438.00', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/RE/0039', center: 'Colombo', section: 'Mineral Processing', assetType: 'Research Equipment', name: 'Research Equipment Eln-Digital hand lens', qty: 1, purchaseDate: '2012.12.31', purchasePrice: '2,438.00', grnNum: '', remarks: 'Missing', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/RE/0040', center: 'Colombo', section: 'Mineral Processing', assetType: 'Research Equipment', name: 'Research Equipment Eln-Digital hand lens', qty: 1, purchaseDate: '2012.12.31', purchasePrice: '2,438.00', grnNum: '', remarks: 'Missing', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/RE/0041', center: 'Colombo', section: 'Mineral Processing', assetType: 'Research Equipment', name: 'Research Equipment Eln-Digital hand lens', qty: 1, purchaseDate: '2012.12.31', purchasePrice: '2,438.00', grnNum: '', remarks: 'Missing', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/RE/0042', center: 'Colombo', section: 'Mineral Processing', assetType: 'Research Equipment', name: 'Research Equipment Refractor of Power', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
];

function parsePrice(priceStr: string): number {
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/,/g, ''));
}

function parseDate(dateStr: string): Date | null {
    if (!dateStr || dateStr === '2013' || dateStr === '2014' || dateStr === '2024' || dateStr === '1000') return null;
    const parts = dateStr.split('.');
    if (parts.length !== 3) return null;
    if (parts[2].length > 2 || isNaN(Number(parts[2]))) return null;
    return new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
}

async function main() {
    console.log('🚀 Adding Research Equipment items...');
    console.log(`Total assets to import: ${researchAssets.length}`);
    console.log('');

    const assetType = await prisma.assetType.findFirst({ where: { name: 'Research Equipment' } });
    const center = await prisma.center.findFirst({ where: { name: 'Colombo' } });
    const sections = await prisma.section.findMany();

    const colomboBranch = await prisma.branch.findFirst({ where: { name: 'Colombo Office' } });

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const asset of researchAssets) {
        try {
            const currentSection = sections.find((s: any) => s.name === asset.newSection);

            const purchaseDate = parseDate(asset.purchaseDate);
            const purchasePrice = parsePrice(asset.purchasePrice);

            await prisma.asset.create({
                data: {
                    assetId: asset.assetCode,
                    assetCode: asset.assetCode,
                    name: asset.name,
                    category: 'Research Equipment',
                    status: 'Active',
                    value: purchasePrice || 0,
                    branchId: colomboBranch!.id,
                    assetTypeId: assetType!.id,
                    centerId: center!.id,
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
