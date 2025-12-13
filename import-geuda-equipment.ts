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

// Geuda Equipment data from spreadsheet
const guedaAssets: AssetData[] = [
    { assetCode: 'GJRTI/CC/RD-HT/GE/0001', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Digital Thermometer', qty: 1, purchaseDate: '2017.06.27', purchasePrice: '9,779.00', grnNum: '2418', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0002', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Muffle Kiln etr', qty: 1, purchaseDate: '2013.03.05', purchasePrice: '74,000.00', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0003', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Nitrogen gas regulator', qty: 1, purchaseDate: '2013.03.05', purchasePrice: '5,671.37', grnNum: '2726', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0004', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Bunsen burner with stand', qty: 1, purchaseDate: '2013', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0005', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Cylinder Oxygen', qty: 1, purchaseDate: '2013', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0006', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Synthetic Diamond', qty: 1, purchaseDate: '2013', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0007', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Cylinder Oxygen', qty: 1, purchaseDate: '2013', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0008', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Synthetic Diamond', qty: 1, purchaseDate: '2013', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0009', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Cylinder Oxygen', qty: 2, purchaseDate: '2013', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0010', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Cylinder Oxygen', qty: 2, purchaseDate: '2013', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0011', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Cylinder Oxygen', qty: 2, purchaseDate: '2013', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0012', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Cylinder (r)', qty: 1, purchaseDate: '2013', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0013', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Cylinder (r)', qty: 1, purchaseDate: '2013', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0014', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Furnaces - Lamella', qty: 1, purchaseDate: '2007.05.15', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0015', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Land stones with stand', qty: 1, purchaseDate: '2008', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0016', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment thermocouple with digital', qty: 2, purchaseDate: '2007', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0017', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Oxidizer', qty: 1, purchaseDate: '2008', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0018', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Crucible -GK set', qty: 1, purchaseDate: '2017.05.23', purchasePrice: '22,000.00', grnNum: '2456', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0019', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Crucible', qty: 1, purchaseDate: '2014', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0020', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Thermoscope', qty: 1, purchaseDate: '2014', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0021', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Torch type crucible', qty: 1, purchaseDate: '2014', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0022', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Research Tglgngngngngnw', qty: 5, purchaseDate: '2019.12.10', purchasePrice: '8,185,000.00', grnNum: '2925', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/CC/RD-HT/GE/0023', center: 'Colombo', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment refrigerated Circulator', qty: 1, purchaseDate: '2019.12.10', purchasePrice: '541,744.48', grnNum: '', remarks: '', currentLocation: 'Colombo', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/RGSP/RD-HT/GE/0024', center: 'Ratnapura-GSP', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Muffle Furnace', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Ratnapura-GSP', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/RGSP/RD-HT/GE/0025', center: 'Ratnapura-GSP', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Heat Gun', qty: 1, purchaseDate: '', purchasePrice: '45000', grnNum: '', remarks: '', currentLocation: 'Ratnapura-GSP', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/RGSP/RD-HT/GE/0026', center: 'Ratnapura-GSP', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Cyntel Oxygen', qty: 2, purchaseDate: '', purchasePrice: '45000', grnNum: '', remarks: '', currentLocation: 'Ratnapura-GSP', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/RGSP/RD-HT/GE/0027', center: 'Ratnapura-GSP', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Cyntel Oxygen', qty: 2, purchaseDate: '', purchasePrice: '45000', grnNum: '', remarks: '', currentLocation: 'Ratnapura-GSP', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/RGSP/RD-HT/GE/0028', center: 'Ratnapura-GSP', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Cyntel Oxygen', qty: 2, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Ratnapura-GSP', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/RGSP/RD-HT/GE/0029', center: 'Ratnapura-GSP', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Furnaces - Electric', qty: 5, purchaseDate: '', purchasePrice: '11,915,706.00', grnNum: '', remarks: '', currentLocation: '50000000', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/RGSP/RD-HT/GE/0030', center: 'Ratnapura-GSP', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Furnace -Chamber', qty: 5, purchaseDate: '2019.01.10', purchasePrice: '455,416.50', grnNum: '', remarks: '', currentLocation: '500000', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/RC/RD-HT/GE/0031', center: 'Rathnapura', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Cyntel (Niragen 47L', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/RC/RD-HT/GE/0032', center: 'Rathnapura', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Cyntel Oxygen', qty: 5, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/RC/RD-HT/GE/0033', center: 'Rathnapura', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Cyntel Oxygen', qty: 5, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/RC/RD-HT/GE/0034', center: 'Rathnapura', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Cyntel Oxygen', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Heat Treatment', bos: '' },
    { assetCode: 'GJRTI/RC/RD-HT/GE/0035', center: 'Rathnapura', section: 'Heat Treatment', assetType: 'Geuda Equipment', name: 'Geuda Equipment Cyntel Oxygen', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Heat Treatment', bos: '' },
];

function parsePrice(priceStr: string): number {
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/,/g, ''));
}

function parseDate(dateStr: string): Date | null {
    if (!dateStr || dateStr === '2013' || dateStr === '2014' || dateStr === '2007' || dateStr === '2008') return null;
    const parts = dateStr.split('.');
    if (parts.length !== 3) return null;
    if (parts[2].length > 2 || isNaN(Number(parts[2]))) return null;
    return new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
}

async function main() {
    console.log('🚀 Adding Geuda Equipment items...');
    console.log(`Total assets to import: ${guedaAssets.length}`);
    console.log('');

    const assetType = await prisma.assetType.findFirst({ where: { name: 'Geuda Equipment' } });
    const centers = await prisma.center.findMany();
    const section = await prisma.section.findFirst({ where: { name: 'Heat Treatment' } });

    // Get or create branches
    const branches = await prisma.branch.findMany();
    const getBranch = async (location: string) => {
        // Handle special locations
        if (location === '50000000' || location === '500000') location = 'Ratnapura-GSP';

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

    for (const asset of guedaAssets) {
        try {
            const center = centers.find((c: any) => c.name === asset.center);

            if (!center) {
                errors.push(`Asset ${asset.assetCode}: Center "${asset.center}" not found`);
                errorCount++;
                continue;
            }

            const branch = await getBranch(asset.currentLocation);
            const purchaseDate = parseDate(asset.purchaseDate);
            const purchasePrice = parsePrice(asset.purchasePrice);

            await prisma.asset.create({
                data: {
                    assetId: asset.assetCode,
                    assetCode: asset.assetCode,
                    name: asset.name,
                    category: 'Geuda Equipment',
                    status: 'Active',
                    value: purchasePrice || 0,
                    branchId: branch.id,
                    assetTypeId: assetType!.id,
                    centerId: center.id,
                    sectionId: section!.id,
                    currentSectionId: section!.id,
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
