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

// Computer & Accessories data from spreadsheet
const computerAssets: AssetData[] = [
    { assetCode: 'GJRTI/KC/OFF/CA/0001', center: 'Kandy', section: 'Office', assetType: 'Computer & Accessories', name: 'Computer & Accessories Computer system', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Kandy', newSection: 'Office', bos: '2024' },
    { assetCode: 'GJRTI/KC/OFF/CA/0002', center: 'Kandy', section: 'Office', assetType: 'Computer & Accessories', name: 'Computer & Accessories Computer system', qty: 10, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Kandy', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/KC/OFF/CA/0003', center: 'Kandy', section: 'Office', assetType: 'Computer & Accessories', name: 'Computer & Accessories Scanner', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Kandy', newSection: 'Office', bos: '2024' },
    { assetCode: 'GJRTI/KC/OFF/CA/0004', center: 'Kandy', section: 'Office', assetType: 'Computer & Accessories', name: 'Computer & Accessories Scanner', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Kandy', newSection: 'Office', bos: '2025' },
    { assetCode: 'GJRTI/KC/OFF/CA/0005', center: 'Kandy', section: 'Office', assetType: 'Computer & Accessories', name: 'Computer & Accessories Scanner', qty: 11, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Kandy', newSection: 'Office', bos: '2025' },
    { assetCode: 'GJRTI/KC/OFF/CA/0006', center: 'Kandy', section: 'Office', assetType: 'Computer & Accessories', name: 'Computer & Accessories Computer Atunakai Set', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'TC', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/CC/FD/CA/0007', center: 'Colombo', section: 'Finance Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories Computer tystem with Government unit ( Dtm )-738', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Finance Division', bos: '' },
    { assetCode: 'GJRTI/CC/FD/CA/0008', center: 'Colombo', section: 'Finance Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories Computer System with Mainframe tymtem unit ( Dtm )-738', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Finance Division', bos: '' },
    { assetCode: 'GJRTI/CC/FD/CA/0009', center: 'Colombo', section: 'Finance Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories Computer tymtem with Mainframe tymtem unit ( Dtm )-738', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Finance Division', bos: '' },
    { assetCode: 'GJRTI/CC/FD/CA/0010', center: 'Colombo', section: 'Finance Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories Computer tymtem with Mainframe tymtem unit ( Dtm )-738', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Finance Division', bos: '' },
    { assetCode: 'GJRTI/CC/FD/CA/0011', center: 'Colombo', section: 'Finance Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories Computer tymtem with Mainframe tymtem unit ( Dtm )-738', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Finance Division', bos: '' },
    { assetCode: 'GJRTI/CC/FD/CA/0012', center: 'Colombo', section: 'Finance Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories Computer tymtem with Microfone Cort', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Finance Division', bos: '' },
    { assetCode: 'GJRTI/CC/FD/CA/0013', center: 'Colombo', section: 'Finance Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories Lap Top Monitor', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Finance Division', bos: '' },
    { assetCode: 'GJRTI/CC/FD/CA/0014', center: 'Colombo', section: 'Finance Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories Lap Top - Dell ( Vostro )', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Demini Laptop', currentLocation: 'Colombo', newSection: 'Finance Division', bos: '' },
    { assetCode: 'GJRTI/CC/FD/CA/0015', center: 'Colombo', section: 'Finance Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories Printer - Desk ( Epson Black)', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Finance Division', bos: '' },
    { assetCode: 'GJRTI/CC/FD/CA/0016', center: 'Colombo', section: 'Finance Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories UPS ( Panala )', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Gateng', currentLocation: 'Colombo', newSection: 'Finance Division', bos: '' },
    { assetCode: 'GJRTI/CC/FD/CA/0017', center: 'Colombo', section: 'Finance Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories UPS ( Panala )', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Finance Division', bos: '' },
    { assetCode: 'GJRTI/CC/FD/CA/0018', center: 'Colombo', section: 'Finance Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories UPS ( Panala )', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Finance Division', bos: '' },
    { assetCode: 'GJRTI/CC/FD/CA/0019', center: 'Colombo', section: 'Finance Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories UPS ( Panala )', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Finance Division', bos: '' },
    { assetCode: 'GJRTI/CC/FD/CA/0020', center: 'Colombo', section: 'Finance Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories UPS ( Panala )', qty: 7, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Finance Division', bos: '' },
    { assetCode: 'GJRTI/CC/FD/CA/0021', center: 'Colombo', section: 'Finance Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories UPS ( 800 )', qty: 7, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Finance Division', bos: '' },
    { assetCode: 'GJRTI/CC/CHA/CA/0022', center: 'Colombo', section: 'Chairman office', assetType: 'Computer & Accessories', name: 'Computer & Accessories Computer system with SOP - D8-B2802 / J02482 / in20100', qty: 1, purchaseDate: '2012.12.11', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Chairman office', bos: '' },
    { assetCode: 'GJRTI/CC/DG/CA/0023', center: 'Colombo', section: 'DG office', assetType: 'Computer & Accessories', name: 'Computer & Accessories UPS ( Panala )', qty: 1, purchaseDate: '2012.10.01', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Chairman office', bos: '2024' },
    { assetCode: 'GJRTI/CC/DG/CA/0024', center: 'Colombo', section: 'DG office', assetType: 'Computer & Accessories', name: 'Computer & Accessories UPS ( Panala )', qty: 1, purchaseDate: '2012.10.01', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'DG office', bos: '' },
    { assetCode: 'GJRTI/CC/DG/CA/0025', center: 'Colombo', section: 'DG office', assetType: 'Computer & Accessories', name: 'Computer & Accessories Computer Desktop : note with Monitor-tiD', qty: 1, purchaseDate: '2012.03.24', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'DG office', bos: '2024' },
    { assetCode: 'GJRTI/CC/DG/CA/0026', center: 'Colombo', section: 'DG office', assetType: 'Computer & Accessories', name: 'Computer & Accessories Computer Desktop note with CPU-UBER', qty: 1, purchaseDate: '2024.03.08', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'DG office', bos: '' },
    { assetCode: 'GJRTI/CC/HR/CA/0027', center: 'Colombo', section: 'Administration Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories UPS ( Panala )', qty: 11, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/IA/CA/0070', center: 'Colombo', section: 'Internal Audit', assetType: 'Computer & Accessories', name: 'Computer & Accessories Computer System Unit Auto x 24(1 unit) (Mammen Machamibel 11)', qty: 1, purchaseDate: '2014.01.24', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Internal Audit', bos: '2024' },
    { assetCode: 'GJRTI/CC/IA/CA/0089', center: 'Colombo', section: 'Internal Audit', assetType: 'Computer & Accessories', name: 'Computer & Accessories Computer System Unit Auto x 500 ( Mammel x 50 )', qty: 1, purchaseDate: '2014.01.24', purchasePrice: '81,900.00', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Internal Audit', bos: '' },
    { assetCode: 'GJRTI/CC/IA/CA/0071', center: 'Colombo', section: 'Internal Audit', assetType: 'Computer & Accessories', name: 'Computer & Accessories UPS Ponala', qty: 1, purchaseDate: '2024.03.08', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Internal Audit', bos: '2024' },
    { assetCode: 'GJRTI/CC/IA/CA/0072', center: 'Colombo', section: 'Internal Audit', assetType: 'Computer & Accessories', name: 'Computer & Accessories UPS', qty: 2, purchaseDate: '2014.01.01', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Internal Audit', bos: '' },
    { assetCode: 'GJRTI/CC/IA/CA/0073', center: 'Colombo', section: 'Internal Audit', assetType: 'Computer & Accessories', name: 'Computer & Accessories UPS', qty: 2, purchaseDate: '2014.01.01', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Internal Audit', bos: '' },
    { assetCode: 'GJRTI/CC/IA/CA/0074', center: 'Colombo', section: 'Internal Audit', assetType: 'Computer & Accessories', name: 'Computer & Accessories UPS', qty: 1, purchaseDate: '2024.03.08', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Internal Audit', bos: '' },
    { assetCode: 'GJRTI/CC/IA/CA/0075', center: 'Colombo', section: 'Internal Audit', assetType: 'Computer & Accessories', name: 'Computer & Accessories UPS', qty: 1, purchaseDate: '2014.01.14', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Internal Audit', bos: '' },
    { assetCode: 'GJRTI/CC/IA/CA/0083', center: 'Colombo', section: 'Internal Audit', assetType: 'Computer & Accessories', name: 'Computer & Accessories Printer Incl Soft b T(N ( Estheron )', qty: 1, purchaseDate: '2019.08.14', purchasePrice: '10,800.00', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Internal Audit', bos: '' },
    { assetCode: 'GJRTI/CC/IA/CA/0084', center: 'Colombo', section: 'Internal Audit', assetType: 'Computer & Accessories', name: 'Computer & Accessories UPS', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Internal Audit', bos: '' },
    { assetCode: 'GJRTI/CC/HR/CA/0088', center: 'Colombo', section: 'Administration Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories tymtem Unit ( 500 ) IBM', qty: 11, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/CA/0089', center: 'Colombo', section: 'Administration Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories Dell ( Optle )', qty: 11, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/CA/0090', center: 'Colombo', section: 'Administration Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories Monitor', qty: 13, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/CA/0093', center: 'Colombo', section: 'Administration Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories Computer System unit DC 2510B WITH -(Key board + maintion -)', qty: 13, purchaseDate: '2012.01.20', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/CA/0094', center: 'Colombo', section: 'Administration Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories Computer System unit ( Mammen )', qty: 13, purchaseDate: '2012.01.04', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/CA/0095', center: 'Colombo', section: 'Administration Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories Dell Dell ( LELE )', qty: 13, purchaseDate: '2014.04.10', purchasePrice: '144,000.00', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/CA/0096', center: 'Colombo', section: 'Administration Division', assetType: 'Computer & Accessories', name: 'Computer & Accessories Dell Wevie Desktop Computer', qty: 13, purchaseDate: '2014.04.10', purchasePrice: '144,000.00', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
];

function parsePrice(priceStr: string): number {
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/,/g, ''));
}

function parseDate(dateStr: string): Date | null {
    if (!dateStr || dateStr === '2024' || dateStr === '2025') return null;
    const parts = dateStr.split('.');
    if (parts.length !== 3) return null;
    if (parts[2].length > 2 || isNaN(Number(parts[2]))) return null;
    return new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
}

async function main() {
    console.log('🚀 Adding Computer & Accessories items...');
    console.log(`Total assets to import: ${computerAssets.length}`);
    console.log('');

    const assetType = await prisma.assetType.findFirst({ where: { name: 'Computer & Accessories' } });
    const centers = await prisma.center.findMany();
    const sections = await prisma.section.findMany();
    const bosCategories = await prisma.boardOfSurveyCategory.findMany();

    // Get or create branches
    const branches = await prisma.branch.findMany();
    const getBranch = async (location: string) => {
        let branch = branches.find(b => b.name === `${location} Office`);
        if (!branch) {
            branch = await prisma.branch.upsert({
                where: { name: `${location} Office` },
                update: {},
                create: { name: `${location} Office`, location },
            });
        }
        return branch;
    };

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const asset of computerAssets) {
        try {
            const center = centers.find((c: any) => c.name === asset.center);
            const section = sections.find((s: any) => s.name === asset.section);
            const currentSection = sections.find((s: any) => s.name === asset.newSection);
            const bosCategory = asset.bos && asset.bos !== '2024' && asset.bos !== '2025' ? bosCategories.find((b: any) => b.code === asset.bos) : null;

            if (!center) {
                errors.push(`Asset ${asset.assetCode}: Center "${asset.center}" not found`);
                errorCount++;
                continue;
            }

            // Handle special location
            let branchLocation = asset.currentLocation;
            if (branchLocation === 'TC') branchLocation = 'Kandy';

            const branch = await getBranch(branchLocation);
            const purchaseDate = parseDate(asset.purchaseDate);
            const purchasePrice = parsePrice(asset.purchasePrice);

            await prisma.asset.create({
                data: {
                    assetId: asset.assetCode,
                    assetCode: asset.assetCode,
                    name: asset.name,
                    category: 'Computer & Accessories',
                    status: 'Active',
                    value: purchasePrice || 0,
                    branchId: branch.id,
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
