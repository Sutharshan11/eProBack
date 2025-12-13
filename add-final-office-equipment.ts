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

// Additional Office Equipment data from fourth spreadsheet (items 0124-0163+)
const newAssets: AssetData[] = [
    { assetCode: 'GJRTI/RC/GCS/OE/0124', center: 'Rathnapura', section: 'Gem Cutting', name: 'Office Equipment Fan Stand (Pedestal )', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura-YC', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/RC/GCS/OE/0125', center: 'Rathnapura', section: 'Gem Cutting', name: 'Office Equipment Fan Stand (Pedestal )', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura-YC', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/RC/GCS/OE/0126', center: 'Rathnapura', section: 'Gem Cutting', name: 'Office Equipment Fan Stand (Pedestal )', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura-YC', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/RC/RD-HT/OE/0127', center: 'Rathnapura', section: 'Heat Treatment', name: 'Office Equipment Fax Phone', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Stores', bos: '' },
    { assetCode: 'GJRTI/RC/STO/OE/0128', center: 'Rathnapura', section: 'Stores', name: 'Office Equipment Fax Phone', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Stores', bos: '' },
    { assetCode: 'GJRTI/RC/STO/OE/0129', center: 'Rathnapura', section: 'Stores', name: 'Office Equipment Fan Stand (Pedestal )', qty: 2, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Stores', bos: '2021' },
    { assetCode: 'GJRTI/RC/STO/OE/0130', center: 'Rathnapura', section: 'Stores', name: 'Office Equipment Fan Stand (Pedestal )', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Stores', bos: '' },
    { assetCode: 'GJRTI/RC/STO/OE/0131', center: 'Rathnapura', section: 'Stores', name: 'Office Equipment Fan Stand (Pedestal )', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Stores', bos: '' },
    { assetCode: 'GJRTI/RC/STO/OE/0132', center: 'Rathnapura', section: 'Stores', name: 'Office Equipment Fan-code', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Stores', bos: '' },
    { assetCode: 'GJRTI/RC/STO/OE/0133', center: 'Rathnapura', section: 'Stores', name: 'Office Equipment Fan Stand (Pedestal )', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Stores', bos: '' },
    { assetCode: 'GJRTI/NC/GCS/OE/0134', center: 'Nivithigala', section: 'Gem Cutting', name: 'Office Equipment Fan Stand (Pedestal )', qty: 1, purchaseDate: '', purchasePrice: '2,000.00', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NC/GCS/OE/0135', center: 'Nivithigala', section: 'Gem Cutting', name: 'Office Equipment Fan Stand (Pedestal )', qty: 1, purchaseDate: '', purchasePrice: '2,000.00', grnNum: '', remarks: '', currentLocation: 'Nivithigala', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NC/GCS/OE/0136', center: 'Nivithigala', section: 'Gem Cutting', name: 'Office Equipment Fan Stand (Pedestal )', qty: 1, purchaseDate: '', purchasePrice: '2,000.00', grnNum: '', remarks: '', currentLocation: 'Nivithigala', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NC/GCS/OE/0137', center: 'Nivithigala', section: 'Gem Cutting', name: 'Office Equipment Fan Stand (Pedestal )', qty: 1, purchaseDate: '', purchasePrice: '2,000.00', grnNum: '', remarks: '', currentLocation: 'Nivithigala', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NC/GCS/OE/0138', center: 'Nivithigala', section: 'Gem Cutting', name: 'Office Equipment Fan Stand (Pedestal )', qty: 1, purchaseDate: '', purchasePrice: '2,000.00', grnNum: '', remarks: '', currentLocation: 'Nivithigala', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NC/GCS/OE/0139', center: 'Nivithigala', section: 'Gem Cutting', name: 'Office Equipment Fan Stand (Pedestal )', qty: 1, purchaseDate: '', purchasePrice: '2,000.00', grnNum: '', remarks: '', currentLocation: 'Nivithigala', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/NC/OFF/OE/0140', center: 'Nivithigala', section: 'Office', name: 'Office Equipment Washing Machine', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/RC/OFF/OE/0141', center: 'Rathnapura', section: 'Office', name: 'Office Equipment Washing Machine', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/RC/OFF/OE/0142', center: 'Rathnapura', section: 'Office', name: 'Office Equipment Machine throdocopy', qty: 1, purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/MC/LBE/OE/0143', center: 'Maradana', section: 'Training Division', name: 'Office Equipment Fax Mail', qty: 1, purchaseDate: '2024.07.31', purchasePrice: '513,275.00', grnNum: '11452', remarks: '', currentLocation: 'Colombo', newSection: 'Training Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/OE/0144', center: 'Colombo', section: 'Administration Division', name: 'Office Equipment Colour Printer K56 - Copy', qty: 1, purchaseDate: '2024.07.31', purchasePrice: '513,275.00', grnNum: '11452', remarks: 'fond not NUUA-TG NERTDA', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/CC/HR/OE/0145', center: 'Colombo', section: 'Administration Division', name: 'Office Equipment Sony Hand Recorder', qty: 1, purchaseDate: '2024.09.02', purchasePrice: '22,000.00', grnNum: '11461', remarks: '', currentLocation: 'Colombo', newSection: 'Administration Division', bos: '' },
    { assetCode: 'GJRTI/RC/PGC/OE/0146', center: 'Rathnapura', section: 'Precision Cutting', name: 'Office Equipment Hot Water Machine', qty: 1, purchaseDate: '2024.10.05', purchasePrice: '92,405.00', grnNum: '11456', remarks: '', currentLocation: 'Rathnapura', newSection: 'Precision Cutting', bos: '' },
    { assetCode: 'GJRTI/RC/PGC/OE/0147', center: 'Rathnapura', section: 'Precision Cutting', name: 'Office Equipment Wine sonic respector', qty: 1, purchaseDate: '2024.09.26', purchasePrice: '166,854.00', grnNum: '11457', remarks: '', currentLocation: 'Rathnapura', newSection: 'Precision Cutting', bos: '' },
    { assetCode: 'GJRTI/RC/GCS/OE/0148', center: 'Rathnapura', section: 'Gem Cutting', name: 'Office Equipment Loud Speacker', qty: 1, purchaseDate: '2025.01.01', purchasePrice: '', grnNum: '', remarks: '', currentLocation: 'Ruvumira', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/RC/GCS/OE/0149', center: 'Rathnapura', section: 'Gem Cutting', name: 'Office Equipment Colour Printer-Epson L476', qty: 1, purchaseDate: '2024.10.05', purchasePrice: '92,405.00', grnNum: '', remarks: '', currentLocation: 'Rathnapura', newSection: 'Gem Cutting', bos: '' },
    { assetCode: 'GJRTI/LC/JMS/OE/0150', center: 'Laggala', section: 'Jewellery Manufacturing', name: 'Office Equipment Stand Fan', qty: 1, purchaseDate: '2025.03.13', purchasePrice: '10,090.00', grnNum: '11461', remarks: '', currentLocation: 'Laggala', newSection: 'Jewellery Manufacturing', bos: '' },
    { assetCode: 'GJRTI/LC/OFF/OE/0151', center: 'Laggala', section: 'Office', name: 'Office Equipment Stand Fan', qty: 1, purchaseDate: '2025.03.13', purchasePrice: '10,090.00', grnNum: '11461', remarks: '', currentLocation: 'Laggala', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/LC/OFF/OE/0152', center: 'Laggala', section: 'Office', name: 'Office Equipment Stand Fan', qty: 1, purchaseDate: '2025.03.13', purchasePrice: '10,090.00', grnNum: '11461', remarks: '', currentLocation: 'Laggala', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/LC/OFF/OE/0153', center: 'Laggala', section: 'Office', name: 'Office Equipment Stand Fan', qty: 1, purchaseDate: '2025.03.13', purchasePrice: '10,090.00', grnNum: '11461', remarks: '', currentLocation: 'Laggala', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/LC/OFF/OE/0154', center: 'Laggala', section: 'Office', name: 'Office Equipment Stand Fan', qty: 1, purchaseDate: '2025.03.13', purchasePrice: '10,090.00', grnNum: '11461', remarks: '', currentLocation: 'Laggala', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/LC/OFF/OE/0155', center: 'Laggala', section: 'Office', name: 'Office Equipment Stand Fan', qty: 1, purchaseDate: '2025.03.13', purchasePrice: '10,090.00', grnNum: '11461', remarks: '', currentLocation: 'Laggala', newSection: 'Office', bos: '' },
    { assetCode: 'GJRTI/CC/RD-AN/OE/0156', center: 'Colombo', section: 'Analytical', name: 'Office Equipment AHS', qty: 1, purchaseDate: '2025.03.14', purchasePrice: '95,189.87', grnNum: '11460', remarks: '', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/KC/TD/OE/0157', center: 'Kandy', section: 'Training Division', name: 'Office Equipment Television', qty: 1, purchaseDate: '2025.05.18', purchasePrice: '81,500.00', grnNum: '11462', remarks: '', currentLocation: 'Kandy', newSection: 'Training Division', bos: '' },
    { assetCode: 'GJRTI/KC/TD/OE/0158', center: 'Kandy', section: 'Training Division', name: 'Office Equipment White Board', qty: 1, purchaseDate: '2025.05.18', purchasePrice: '4,150.00', grnNum: '11462', remarks: '', currentLocation: 'Kandy', newSection: 'Training Division', bos: '' },
    { assetCode: 'GJRTI/KC/TD/OE/0159', center: 'Kandy', section: 'Training Division', name: 'Office Equipment White Board', qty: 1, purchaseDate: '2025.05.18', purchasePrice: '4,150.00', grnNum: '11462', remarks: '', currentLocation: 'Kandy', newSection: 'Training Division', bos: '' },
    { assetCode: 'GJRTI/KC/TD/OE/0160', center: 'Kandy', section: 'Training Division', name: 'Office Equipment White Board', qty: 1, purchaseDate: '2025.05.18', purchasePrice: '4,150.00', grnNum: '11462', remarks: '', currentLocation: 'Kandy', newSection: 'Training Division', bos: '' },
    { assetCode: 'GJRTI/CC/TD/OE/0161', center: 'Colombo', section: 'Training Division', name: 'Office Equipment Camera - Indoor', qty: 1, purchaseDate: '2025.06.20', purchasePrice: '9,550.00', grnNum: '11464', remarks: '', currentLocation: 'Colombo', newSection: 'Training Division', bos: '' },
    { assetCode: 'GJRTI/CC/TD/OE/0162', center: 'Colombo', section: 'Training Division', name: 'Office Equipment Camera - Indoor', qty: 1, purchaseDate: '2025.06.20', purchasePrice: '9,550.00', grnNum: '11464', remarks: '', currentLocation: 'Colombo', newSection: 'Training Division', bos: '' },
    { assetCode: 'GJRTI/CC/TD/OE/0163', center: 'Colombo', section: 'Training Division', name: 'Office Equipment Camera - Indoor', qty: 1, purchaseDate: '2025.06.20', purchasePrice: '9,550.00', grnNum: '11464', remarks: '', currentLocation: 'Colombo', newSection: 'Training Division', bos: '' },
];

function parsePrice(priceStr: string): number {
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/,/g, ''));
}

function parseDate(dateStr: string): Date | null {
    if (!dateStr || dateStr === '2021') return null;
    const parts = dateStr.split('.');
    if (parts.length !== 3) return null;
    if (parts[2].length > 2 || isNaN(Number(parts[2]))) return null;
    return new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
}

async function main() {
    console.log('🚀 Adding final batch of Office Equipment items...');
    console.log(`Total new assets to import: ${newAssets.length}`);
    console.log('');

    const assetType = await prisma.assetType.findFirst({ where: { name: 'Office Equipment' } });
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

    for (const asset of newAssets) {
        try {
            const center = centers.find((c: any) => c.name === asset.center);
            const section = sections.find((s: any) => s.name === asset.section);
            const currentSection = sections.find((s: any) => s.name === asset.newSection);
            const bosCategory = asset.bos && asset.bos !== '2021' ? bosCategories.find((b: any) => b.code === asset.bos) : null;

            if (!center) {
                errors.push(`Asset ${asset.assetCode}: Center "${asset.center}" not found`);
                errorCount++;
                continue;
            }

            // Determine branch based on current location
            let branchLocation = asset.currentLocation;
            if (branchLocation === 'Ruvumira') branchLocation = 'Rathnapura';
            if (branchLocation === 'Rathnapura-YC') branchLocation = 'Rathnapura';

            const branch = await getBranch(branchLocation);
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
