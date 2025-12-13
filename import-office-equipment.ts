import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AssetImportData {
    assetCode: string;
    center: string;
    section: string;
    assetType: string;
    assetName: string;
    qty: number;
    invPageNo: string;
    purchaseDate: string;
    purchasePrice: string;
    grnNum: string;
    remarks: string;
    revaluationPrice: string;
    transferToConsumable: string;
    currentLocation: string;
    newSection: string;
    bos: string;
}

// Office Equipment data from the uploaded spreadsheet
const assetsData: AssetImportData[] = [
    { assetCode: 'GJRTI/CC/OFF/OE/0001', center: 'Colombo', section: 'Office', assetType: 'Office Equipment', assetName: 'Office Equipment (Image Scanner', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Kandy', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/KC/OFF/OE/0002', center: 'Kandy', section: 'Office', assetType: 'Office Equipment', assetName: 'Office Equipment (Photocopier', qty: 1, invPageNo: '', purchaseDate: '2019.10.19', purchasePrice: '27,750.00', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Kandy', newSection: 'Office', bos: '2025' },
    { assetCode: 'GJRTI/KC/PGC/OE/0003', center: 'Kandy', section: 'Precision Cutting', assetType: 'Office Equipment', assetName: 'Office Equipment (Photo copier', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Kandy', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/KC/PGC/OE/0004', center: 'Kandy', section: 'Precision Cutting', assetType: 'Office Equipment', assetName: 'Office Equipment (Projector & Screen', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Kandy', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/CC/FD/OE/0005', center: 'Colombo', section: 'Finance Division', assetType: 'Office Equipment', assetName: 'Office Equipment (Laser Printer-Brother 2340 Ladushalaa', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Finance Division', bos: '' },
    { assetCode: 'GJRTI/CC/FD/OE/0006', center: 'Colombo', section: 'Finance Division', assetType: 'Office Equipment', assetName: 'Office Equipment (Printer HP 1020', qty: 1, invPageNo: '', purchaseDate: '2019.02.08', purchasePrice: '16,750.00', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Finance Division', bos: '' },
    { assetCode: 'GJRTI/CC/FD/OE/0007', center: 'Colombo', section: 'Finance Division', assetType: 'Office Equipment', assetName: 'Office Equipment (Printer HP', qty: 1, invPageNo: '', purchaseDate: '2019.02.08', purchasePrice: '16,750.00', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Finance Division', bos: '' },
    { assetCode: 'GJRTI/CC/FD/OE/0008', center: 'Colombo', section: 'Finance Division', assetType: 'Office Equipment', assetName: 'Office Equipment (colour laser Printer HP', qty: 1, invPageNo: '', purchaseDate: '2019.02.08', purchasePrice: '16,750.00', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Finance Division', bos: '' },
    { assetCode: 'GJRTI/CC/FD/OE/0009', center: 'Colombo', section: 'Finance Division', assetType: 'Office Equipment', assetName: 'Office Equipment (Printer Canon IP 4840', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Finance Division', bos: '' },
    { assetCode: 'GJRTI/CC/CHA/OE/0010', center: 'Colombo', section: 'Chairman office', assetType: 'Office Equipment', assetName: 'Office Equipment (Printer Brother HL L2320D)W', qty: 1, invPageNo: '', purchaseDate: '2019.09.11', purchasePrice: '21,500.00', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Chairman office', bos: '' },
    { assetCode: 'GJRTI/CC/DG/OE/0011', center: 'Colombo', section: 'DG office', assetType: 'Office Equipment', assetName: 'Office Equipment (HP Printer', qty: 1, invPageNo: '', purchaseDate: '2019.09.26', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'DG office', bos: '' },
    { assetCode: 'GJRTI/CC/DG/OE/0012', center: 'Colombo', section: 'DG office', assetType: 'Office Equipment', assetName: 'Office Equipment (Photocopier', qty: 1, invPageNo: '', purchaseDate: '2019.09.26', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'DG office', bos: '' },
    { assetCode: 'GJRTI/CC/DG/OE/0013', center: 'Colombo', section: 'DG office', assetType: 'Office Equipment', assetName: 'Office Equipment (Photocopy Machine', qty: 1, invPageNo: '', purchaseDate: '2019.09.29', purchasePrice: '', grnNum: '', remarks: 'Destroy', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'DG office', bos: 'D' },
    { assetCode: 'GJRTI/CC/RD/OE/0014', center: 'Colombo', section: 'Research Division', assetType: 'Office Equipment', assetName: 'Office Equipment (Photocopy Machine', qty: 1, invPageNo: '', purchaseDate: '2019.09.05', purchasePrice: '21,500.00', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'DG office', bos: '' },
    { assetCode: 'GJRTI/CC/HR/OE/0015', center: 'Colombo', section: 'Administration Division', assetType: 'Office Equipment', assetName: 'Office Equipment (WEB Cam MitShiba 4D-06', qty: 1, invPageNo: '', purchaseDate: '2019.09.05', purchasePrice: '21,500.00', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/OE/0016', center: 'Colombo', section: 'Administration Division', assetType: 'Office Equipment', assetName: 'Office Equipment (Photo Scanner', qty: 1, invPageNo: '', purchaseDate: '2014.11.20', purchasePrice: '86,250.00', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/OE/0017', center: 'Colombo', section: 'Administration Division', assetType: 'Office Equipment', assetName: 'Office Equipment (EPSON A3 PRINTER White Camera', qty: 1, invPageNo: '', purchaseDate: '2019.08.26', purchasePrice: '30,750.00', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/OE/0018', center: 'Colombo', section: 'Administration Division', assetType: 'Office Equipment', assetName: 'Office Equipment (Time Recorder Amano)', qty: 1, invPageNo: '', purchaseDate: '2019.08.26', purchasePrice: '30,750.00', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/OE/0019', center: 'Colombo', section: 'Administration Division', assetType: 'Office Equipment', assetName: 'Office Equipment (Printer HP M3O1 COLOUR VIA-VGO37A3)', qty: 1, invPageNo: '', purchaseDate: '2019.02.08', purchasePrice: '16,750.00', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/OE/0020', center: 'Colombo', section: 'Administration Division', assetType: 'Office Equipment', assetName: 'Office Equipment (Printer HP LazerJet P2035', qty: 1, invPageNo: '', purchaseDate: '2019.08.31', purchasePrice: '21,500.00', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/OE/0021', center: 'Colombo', section: 'Administration Division', assetType: 'Office Equipment', assetName: 'Office Equipment (Photocopier', qty: 1, invPageNo: '', purchaseDate: '2019.08.31', purchasePrice: '21,500.00', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/OE/0022', center: 'Colombo', section: 'Administration Division', assetType: 'Office Equipment', assetName: 'Office Equipment (Photocopy Rilio', qty: 1, invPageNo: '', purchaseDate: '2019.12.30', purchasePrice: '455,750.00', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/OE/0023', center: 'Colombo', section: 'Administration Division', assetType: 'Office Equipment', assetName: 'Office Equipment (Multimedia Projector TIXIAN Hom 2 Speakers E', qty: 1, invPageNo: '', purchaseDate: '2012.12.06', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/OE/0024', center: 'Colombo', section: 'Administration Division', assetType: 'Office Equipment', assetName: 'Office Equipment (Lamination Machine A3 size', qty: 1, invPageNo: '', purchaseDate: '2019.12.30', purchasePrice: '8,750.00', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/OE/0025', center: 'Colombo', section: 'Administration Division', assetType: 'Office Equipment', assetName: 'Office Equipment (Hand Pull Machine', qty: 1, invPageNo: '', purchaseDate: '2019.11.20', purchasePrice: '15,450.00', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/OE/0026', center: 'Colombo', section: 'Administration Division', assetType: 'Office Equipment', assetName: 'Office Equipment (Spiral Bind Machine', qty: 1, invPageNo: '', purchaseDate: '2012.12.13', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/OE/0027', center: 'Colombo', section: 'Administration Division', assetType: 'Office Equipment', assetName: 'Office Equipment (Scanner Scan Snap', qty: 1, invPageNo: '', purchaseDate: '2012.12.13', purchasePrice: '16,000.00', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/OE/0028', center: 'Colombo', section: 'Administration Division', assetType: 'Office Equipment', assetName: 'Office Equipment (Refrigerator', qty: 1, invPageNo: '', purchaseDate: '2012.12.13', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/OE/0029', center: 'Colombo', section: 'Administration Division', assetType: 'Office Equipment', assetName: 'Office Equipment (T.V.Philips', qty: 2, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/OE/0030', center: 'Colombo', section: 'Administration Division', assetType: 'Office Equipment', assetName: 'Office Equipment (T.V.Samsung', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/OE/0031', center: 'Colombo', section: 'Administration Division', assetType: 'Office Equipment', assetName: 'Office Equipment (Television', qty: 2, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/JMS/OE/0032', center: 'Colombo', section: 'Jewellery Manufacturing', assetType: 'Office Equipment', assetName: 'Office Equipment (Air Conditioning Unit', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/CC/JDS/OE/0033', center: 'Colombo', section: 'Jewellery Designing', assetType: 'Office Equipment', assetName: 'Office Equipment (Air Conditioning Unit', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Jewellery Designing', bos: '' },
    { assetCode: 'GJRTI/CC/CAM/OE/0034', center: 'Colombo', section: 'CAM', assetType: 'Office Equipment', assetName: 'Office Equipment (3 D Printing Machine ( Repa fab )', qty: 1, invPageNo: '', purchaseDate: '2019.01.10', purchasePrice: '8,244,400.00', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'CAM', bos: '' },
    { assetCode: 'GJRTI/CC/CAM/OE/0035', center: 'Colombo', section: 'CAM', assetType: 'Office Equipment', assetName: 'Office Equipment (3 D Printing Machine', qty: 1, invPageNo: '', purchaseDate: '2019.12.10', purchasePrice: '135,588.00', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'CAM', bos: '' },
    { assetCode: 'GJRTI/CC/CADS/OE/0036', center: 'Colombo', section: 'CAD', assetType: 'Office Equipment', assetName: 'Office Equipment (UPS 1000 KVA', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'CAD', bos: '' },
    { assetCode: 'GJRTI/CC/TD/OE/0037', center: 'Colombo', section: 'Training Division', assetType: 'Office Equipment', assetName: 'Office Equipment (Digital Camera Sony', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Training Division', bos: '' },
    { assetCode: 'GJRTI/TD/OE/0038', center: 'Colombo', section: 'Training Division', assetType: 'Office Equipment', assetName: 'Office Equipment (Digital Camera Sony', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Kandy', newSection: 'Training Division', bos: '' },
    { assetCode: 'GJRTI/CC/TD/OE/0039', center: 'Colombo', section: 'Training Division', assetType: 'Office Equipment', assetName: 'Office Equipment (De Projector', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Galle', newSection: 'Jewellery Manufacturing', bos: '' },
];

function parsePrice(priceStr: string): number {
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/,/g, ''));
}

function parseDate(dateStr: string): Date | null {
    if (!dateStr) return null;
    // Format: YYYY.MM.DD
    const parts = dateStr.split('.');
    if (parts.length !== 3) return null;
    return new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
}

async function main() {
    console.log('🚀 Starting Office Equipment import...');
    console.log(`Total assets to import: ${assetsData.length}`);
    console.log('');

    // Get reference data
    const assetTypes = await prisma.assetType.findMany();
    const centers = await prisma.center.findMany();
    const sections = await prisma.section.findMany();
    const bosCategories = await prisma.boardOfSurveyCategory.findMany();

    // Get or create branches for Colombo, Kandy, and Galle
    const colomboBranch = await prisma.branch.upsert({
        where: { name: 'Colombo Office' },
        update: {},
        create: { name: 'Colombo Office', location: 'Colombo' },
    });

    const kandyBranch = await prisma.branch.upsert({
        where: { name: 'Kandy Office' },
        update: {},
        create: { name: 'Kandy Office', location: 'Kandy' },
    });

    const galleBranch = await prisma.branch.upsert({
        where: { name: 'Galle Office' },
        update: {},
        create: { name: 'Galle Office', location: 'Galle' },
    });

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const asset of assetsData) {
        try {
            // Find references
            const assetType = assetTypes.find(at => at.name === asset.assetType);
            const center = centers.find(c => c.name === asset.center);
            const section = sections.find(s => s.name === asset.section);
            const currentSection = sections.find(s => s.name === asset.newSection);
            const bosCategory = asset.bos ? bosCategories.find(b => b.code === asset.bos) : null;

            if (!assetType) {
                errors.push(`Asset ${asset.assetCode}: AssetType "${asset.assetType}" not found`);
                errorCount++;
                continue;
            }

            if (!center) {
                errors.push(`Asset ${asset.assetCode}: Center "${asset.center}" not found`);
                errorCount++;
                continue;
            }

            // Determine branch based on current location
            let branchId = colomboBranch.id;
            if (asset.currentLocation === 'Kandy') {
                branchId = kandyBranch.id;
            } else if (asset.currentLocation === 'Galle') {
                branchId = galleBranch.id;
            }

            const purchaseDate = parseDate(asset.purchaseDate);
            const purchasePrice = parsePrice(asset.purchasePrice);
            const revaluationPrice = parsePrice(asset.revaluationPrice);

            // Create asset
            await prisma.asset.create({
                data: {
                    assetId: asset.assetCode,
                    assetCode: asset.assetCode,
                    name: asset.assetName,
                    category: asset.assetType,
                    status: asset.bos === 'D' ? 'Disposed' : (asset.bos === 'Er' ? 'DoubleEntry' : 'Active'),
                    value: purchasePrice || 0,
                    branchId,
                    assetTypeId: assetType.id,
                    centerId: center.id,
                    sectionId: section?.id,
                    currentSectionId: currentSection?.id || section?.id,
                    boardOfSurveyCategoryId: bosCategory?.id,
                    quantity: asset.qty,
                    inventoryPageNo: asset.invPageNo || null,
                    purchaseDate,
                    purchasePrice,
                    grnNumber: asset.grnNum || null,
                    remarks: asset.remarks || null,
                    revaluationPrice: revaluationPrice || null,
                    transferredToConsumable: false,
                    currentLocation: asset.currentLocation,
                },
            });

            successCount++;
            console.log(`✅ Imported: ${asset.assetCode} - ${asset.assetName}`);
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
