import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AssetData {
    assetCode: string;
    center: string;
    section: string;
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

// Additional Office Equipment data from third spreadsheet
const newAssets: AssetData[] = [
    { assetCode: 'GJRTI/CC/RD/OE/0081', center: 'Colombo', section: 'Research Division', name: 'Office Equipment Gemnas M322220A Printer', qty: 1, purchaseDate: '2019.03.14', purchasePrice: '55,500.00', grnNum: '2294', remarks: 'mapping', currentLocation: 'Colombo', newSection: 'Research Division', bos: 'R' },
    { assetCode: 'GJRTI/CC/RD/OE/0082', center: 'Colombo', section: 'Research Division', name: 'Office Equipment Printer', qty: 2, purchaseDate: '2017.05.30', purchasePrice: '96,900.00', grnNum: '', remarks: 'Geo Chen-kist', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0083', center: 'Colombo', section: 'Research Division', name: 'Office Equipment Scanner', qty: 1, purchaseDate: '2019.07.31', purchasePrice: '31,502.00', grnNum: '', remarks: 'Geo Chen-Mapping', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0084', center: 'Colombo', section: 'Research Division', name: 'Office Equipment Printer-MP Lazer jel m525', qty: 1, purchaseDate: '2017.05.24', purchasePrice: '86,900.00', grnNum: '2443', remarks: 'winsigsburg', currentLocation: 'Rathnapura', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0085', center: 'Colombo', section: 'Research Division', name: 'Office Equipment Printer MP 305+', qty: 1, purchaseDate: '2017.05.24', purchasePrice: '85,500.00', grnNum: '2443', remarks: 'Lagy', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0086', center: 'Colombo', section: 'Research Division', name: 'Office Equipment TV', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0087', center: 'Colombo', section: 'Research Division', name: 'Office Equipment Binding Lad 0 box', qty: 1, purchaseDate: '2019.03.14', purchasePrice: '21,817.30', grnNum: '2525', remarks: 'refrigerue', currentLocation: 'Rathnapura', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0088', center: 'Colombo', section: 'Research Division', name: 'Office Equipment Binding Lad 0 box', qty: 1, purchaseDate: '2019.03.14', purchasePrice: '21,817.30', grnNum: '2525', remarks: '', currentLocation: 'Rathnapura', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0089', center: 'Colombo', section: 'Research Division', name: 'Office Equipment Binding Lad 0 box', qty: 1, purchaseDate: '2019.03.14', purchasePrice: '21,817.30', grnNum: '2525', remarks: '', currentLocation: 'Rathnapura', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0090', center: 'Colombo', section: 'Research Division', name: 'Office Equipment Binding Lad 0 box', qty: 1, purchaseDate: '2019.03.14', purchasePrice: '21,817.30', grnNum: '2525', remarks: '', currentLocation: 'Rathnapura', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0091', center: 'Colombo', section: 'Research Division', name: 'Office Equipment Binding Lad 0 box', qty: 1, purchaseDate: '2019.07.01', purchasePrice: '5,600.00', grnNum: '276', remarks: 'mapping', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0092', center: 'Colombo', section: 'Research Division', name: 'Office Equipment Scan Fax G4', qty: 1, purchaseDate: '2019.03.14', purchasePrice: '21,817.30', grnNum: '2525', remarks: '', currentLocation: 'Rathnapura', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0093', center: 'Colombo', section: 'Research Division', name: 'Office Equipment Stan Pans 18" (Innuva', qty: 1, purchaseDate: '2019.07.01', purchasePrice: '5,600.00', grnNum: '2745', remarks: 'pendili', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0094', center: 'Colombo', section: 'Research Division', name: 'Office Equipment 2 in 1 sysol 11', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0095', center: 'Colombo', section: 'Research Division', name: 'Office Equipment Radio', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0096', center: 'Colombo', section: 'Research Division', name: 'Office Equipment Gonads M3322DA Printer', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0097', center: 'Colombo', section: 'Research Division', name: 'Office Equipment B.volt (Lithium )', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/RC/HR/OE/0098', center: 'Rathnapura', section: 'Administration Division', name: 'Office Equipment Printer HP-2404', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/RC/PGC/OE/0099', center: 'Rathnapura', section: 'Precision Cutting', name: 'Office Equipment AC Counter-Cixing', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Lecture Hall', currentLocation: 'Rathnapura', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/RC/PGC/OE/0100', center: 'Rathnapura', section: 'Precision Cutting', name: 'Office Equipment AC Counter-Cixing', qty: 1, purchaseDate: '2012.08.28', purchasePrice: '87,750.00', grnNum: '', remarks: 'Main Hall', currentLocation: 'Rathnapura', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/RC/OFF/OE/0101', center: 'Rathnapura', section: 'Office', name: 'Office Equipment FAX Machine', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/RC/OFF/AS/0102', center: 'Rathnapura', section: 'Office', name: 'Office Equipment dan - Pedestal', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Office', bos: '2021' },
    { assetCode: 'GJRTI/RC/PGC/AS/0103', center: 'Rathnapura', section: 'Precision Cutting', name: 'Office Equipment AMPLIFIER - B', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'fond for Repair - Head Office', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/RC/JMS/OE/0104', center: 'Rathnapura', section: 'Jewellery Manufacturing', name: 'Office Equipment AC', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/RC/JMS/OE/0105', center: 'Rathnapura', section: 'Jewellery Manufacturing', name: 'Office Equipment AC', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/RC/JMS/OE/0106', center: 'Rathnapura', section: 'Jewellery Manufacturing', name: 'Office Equipment AC', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/RC/JMS/OE/0107', center: 'Rathnapura', section: 'Jewellery Manufacturing', name: 'Office Equipment AC', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/RC/JMS/OE/0108', center: 'Rathnapura', section: 'Jewellery Manufacturing', name: 'Office Equipment AC', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/RC/GS/OE/0109', center: 'Rathnapura', section: 'Gemmology', name: 'Office Equipment air condiorner', qty: 1, purchaseDate: '2019.09.16', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Gemmology', bos: '' },
    { assetCode: 'GJRTI/RC/GS/OE/0110', center: 'Rathnapura', section: 'Gemmology', name: 'Office Equipment AC', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Gemmology', bos: '' },
    { assetCode: 'GJRTI/RC/GS/OE/0111', center: 'Rathnapura', section: 'Gemmology', name: 'Office Equipment AHS - 100', qty: 2, purchaseDate: '2024', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Gemmology', bos: '' },
    { assetCode: 'GJRTI/RC/JDS/OE/0112', center: 'Rathnapura', section: 'Jewellery Designing', name: 'Office Equipment Air condition Unit', qty: 1, purchaseDate: '2017.05.18', purchasePrice: '', grnNum: '2745', remarks: '', currentLocation: 'Rathnapura', newSection: 'Jewellery Designing', bos: '' },
    { assetCode: 'GJRTI/RC/GCV/OE/0113', center: 'Rathnapura', section: 'Gem Caving', name: 'Office Equipment Stand Fan', qty: 1, purchaseDate: '2015.08.06', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Gem Caving', bos: 'R' },
    { assetCode: 'GJRTI/RC/GCV/OE/0114', center: 'Rathnapura', section: 'Gem Caving', name: 'Office Equipment Has-Stand (Pedestal )', qty: 1, purchaseDate: '7010', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Gem Caving', bos: '2021' },
    { assetCode: 'GJRTI/RC/GCV/OE/0115', center: 'Rathnapura', section: 'Gem Caving', name: 'Office Equipment Scan Mobile', qty: 1, purchaseDate: '2018', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Gem Caving', bos: '' },
    { assetCode: 'GJRTI/RC/RD-HT/OE/0116', center: 'Rathnapura', section: 'Heat Treatment', name: 'Office Equipment Air - Code', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/RC/RD-HT/OE/0117', center: 'Rathnapura', section: 'Heat Treatment', name: 'Office Equipment Projector - Multimedia', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/RC/GCS/OE/0118', center: 'Rathnapura', section: 'Gem Cutting', name: 'Office Equipment Air Code', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/RC/GCS/OE/0119', center: 'Rathnapura', section: 'Gem Cutting', name: 'Office Equipment AC', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/RC/GCS/OE/0120', center: 'Rathnapura', section: 'Gem Cutting', name: 'Office Equipment Pan - Table', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '(?+1', remarks: '', currentLocation: 'Rathnapura', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/RC/GCS/OE/0121', center: 'Rathnapura', section: 'Gem Cutting', name: 'Office Equipment mand Drill', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '(?+1', remarks: '', currentLocation: 'Rathnapura', newSection: 'Gem Cutting', bos: '2024' },
    { assetCode: 'GJRTI/RC/GCS/OE/0122', center: 'Rathnapura', section: 'Gem Cutting', name: 'Office Equipment AIR Stand (Pedestal )', qty: 1, purchaseDate: '7010', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Gem Cutting', bos: '2025' },
    { assetCode: 'GJRTI/RC/HR/OE/0123', center: 'Rathnapura', section: 'Administration Division', name: 'Office Equipment Mulam-i', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '7018', remarks: '', currentLocation: 'Rathnapura', newSection: 'Administration Division', bos: '' },
];

function parsePrice(priceStr: string): number {
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/,/g, ''));
}

function parseDate(dateStr: string): Date | null {
    if (!dateStr || dateStr === '7010' || dateStr === '7018' || dateStr === '2018' || dateStr === '2024') return null;
    const parts = dateStr.split('.');
    if (parts.length !== 3) return null;
    if (parts[2].length > 2 || isNaN(Number(parts[2]))) return null;
    return new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
}

async function main() {
    console.log('🚀 Adding additional Office Equipment items...');
    console.log(`Total new assets to import: ${newAssets.length}`);
    console.log('');

    const assetType = await prisma.assetType.findFirst({ where: { name: 'Office Equipment' } });
    const centers = await prisma.center.findMany();
    const sections = await prisma.section.findMany();
    const bosCategories = await prisma.boardOfSurveyCategory.findMany();

    const colomboBranch = await prisma.branch.findFirst({ where: { name: 'Colombo Office' } });
    const rathnapuraBranch = await prisma.branch.findFirst({ where: { name: 'Rathnapura Office' } });

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const asset of newAssets) {
        try {
            const center = centers.find((c: any) => c.name === asset.center);
            const section = sections.find((s: any) => s.name === asset.section);
            const currentSection = sections.find((s: any) => s.name === asset.newSection);
            const bosCategory = asset.bos && asset.bos !== '2021' && asset.bos !== '2024' && asset.bos !== '2025'
                ? bosCategories.find((b: any) => b.code === asset.bos)
                : null;

            if (!center) {
                errors.push(`Asset ${asset.assetCode}: Center "${asset.center}" not found`);
                errorCount++;
                continue;
            }

            const branchId = asset.currentLocation === 'Colombo' ? colomboBranch!.id : rathnapuraBranch!.id;
            const purchaseDate = parseDate(asset.purchaseDate);
            const purchasePrice = parsePrice(asset.purchasePrice);

            await prisma.asset.create({
                data: {
                    assetId: asset.assetCode,
                    assetCode: asset.assetCode,
                    name: asset.name,
                    category: 'Office Equipment',
                    status: asset.bos === 'D' ? 'Disposed' : (asset.bos === 'R' ? 'Repair' : 'Active'),
                    value: purchasePrice || 0,
                    branchId,
                    assetTypeId: assetType!.id,
                    centerId: center.id,
                    sectionId: section?.id,
                    currentSectionId: currentSection?.id || section?.id,
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
