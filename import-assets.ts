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

const assetsData: AssetImportData[] = [
    { assetCode: 'GJRTI/CC/RD-AN/LBE/0001', center: 'Colombo', section: 'Analytical', assetType: 'Laboratory Equipment', assetName: 'Lab table - Wooden', qty: 1, invPageNo: '5', purchaseDate: '2018.03.19', purchasePrice: '15,870.00', grnNum: '2536', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/CC/RD-AN/LBE/0002', center: 'Colombo', section: 'Analytical', assetType: 'Laboratory Equipment', assetName: 'Lab table - Wooden', qty: 1, invPageNo: '5', purchaseDate: '2018.03.19', purchasePrice: '15,870.00', grnNum: '2536', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/CC/RD-AN/LBE/0003', center: 'Colombo', section: 'Analytical', assetType: 'Laboratory Equipment', assetName: 'Lab table Hard wooden', qty: 1, invPageNo: '5', purchaseDate: '2018.03.19', purchasePrice: '43,585.00', grnNum: '2536', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/CC/RD-AN/LBE/0004', center: 'Colombo', section: 'Analytical', assetType: 'Laboratory Equipment', assetName: 'Lab table Hard wooden', qty: 1, invPageNo: '5', purchaseDate: '2018.03.19', purchasePrice: '43,585.00', grnNum: '2536', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/CC/RD-AN/LBE/0005', center: 'Colombo', section: 'Analytical', assetType: 'Laboratory Equipment', assetName: 'Sample cupboard', qty: 1, invPageNo: '5', purchaseDate: '2016.12.01', purchasePrice: '24,750.00', grnNum: '2421', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/CC/RD-AN/LBE/0006', center: 'Colombo', section: 'Analytical', assetType: 'Laboratory Equipment', assetName: 'Lab Stool Steel Cusion', qty: 1, invPageNo: '6', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in Inventory', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/CC/RD-AN/LBE/0007', center: 'Colombo', section: 'Analytical', assetType: 'Laboratory Equipment', assetName: 'Lab Stool Steel Cusion', qty: 1, invPageNo: '6', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in Inventory', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/CC/RD-AN/LBE/0008', center: 'Colombo', section: 'Analytical', assetType: 'Laboratory Equipment', assetName: 'Lab Stool Steel Cusion', qty: 1, invPageNo: '6', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in Inventory', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/CC/RD-AN/LBE/0009', center: 'Colombo', section: 'Analytical', assetType: 'Laboratory Equipment', assetName: 'Lab Stool Steel Cusion', qty: 1, invPageNo: '6', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in Inventory', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/CC/RD-AN/LBE/0010', center: 'Colombo', section: 'Analytical', assetType: 'Laboratory Equipment', assetName: 'Lab Stool Steel Cusion', qty: 1, invPageNo: '6', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in Inventory', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0011', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', assetName: 'Sample Racks', qty: 1, invPageNo: '4', purchaseDate: '2016.12.01', purchasePrice: '18,750.00', grnNum: '2421', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0012', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', assetName: 'Sample Racks', qty: 1, invPageNo: '4', purchaseDate: '2016.12.01', purchasePrice: '18,750.00', grnNum: '2421', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0013', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', assetName: 'Sample cupboard with rack', qty: 1, invPageNo: '4', purchaseDate: '2016.12.01', purchasePrice: '24,750.00', grnNum: '2421', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0014', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', assetName: 'Storage cabinet for acid', qty: 1, invPageNo: '4', purchaseDate: '2018.01.29', purchasePrice: '155,250.00', grnNum: '2584', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0015', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', assetName: 'Table Geochemical lab steel / ceramic with moblile Drawer', qty: 1, invPageNo: '5', purchaseDate: '2015.01.16', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0016', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', assetName: 'Table Geochemical lab steel / ceramic with moblile Drawer', qty: 1, invPageNo: '5', purchaseDate: '2015.01.16', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0017', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', assetName: 'Table Geochemical lab steel / ceramic with moblile Drawer', qty: 1, invPageNo: '5', purchaseDate: '2015.01.16', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/LBE/0018', center: 'Colombo', section: 'Mineral Processing and Sedimentrology', assetType: 'Laboratory Equipment', assetName: 'Table mineralogy lab steel  / ceramic  with file Drawer', qty: 1, invPageNo: '9', purchaseDate: '2015.01.16', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/LBE/0019', center: 'Colombo', section: 'Mineral Processing and Sedimentrology', assetType: 'Laboratory Equipment', assetName: 'Lab table Hard wooden', qty: 1, invPageNo: '9', purchaseDate: '2018.03.19', purchasePrice: '43,585.00', grnNum: '2536', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/LBE/0020', center: 'Colombo', section: 'Mineral Processing and Sedimentrology', assetType: 'Laboratory Equipment', assetName: 'Sample Racks', qty: 1, invPageNo: '9', purchaseDate: '2016.12.01', purchasePrice: '18,750.00', grnNum: '2421', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Mineral Processing and Sedimentrology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-EXP/LBE/0021', center: 'Colombo', section: 'Exploration', assetType: 'Laboratory Equipment', assetName: 'Sample Racks', qty: 1, invPageNo: '6', purchaseDate: '2016.12.01', purchasePrice: '18,750.00', grnNum: '2421', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Exploration', bos: '' },
    { assetCode: 'GJRTI/CC/RD-EXP/LBE/0022', center: 'Colombo', section: 'Exploration', assetType: 'Laboratory Equipment', assetName: 'Sample cupboard', qty: 1, invPageNo: '6', purchaseDate: '2016.12.01', purchasePrice: '24,750.00', grnNum: '2421', remarks: '1st floor', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Exploration', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MAP/LBE/0023', center: 'Colombo', section: 'Mapping', assetType: 'Laboratory Equipment', assetName: 'Light table', qty: 1, invPageNo: '3', purchaseDate: '2014.09.16', purchasePrice: '94,000.00', grnNum: '2261', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Mapping', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MAP/LBE/0024', center: 'Colombo', section: 'Mapping', assetType: 'Laboratory Equipment', assetName: 'Sample Racks', qty: 1, invPageNo: '3', purchaseDate: '2016.12.01', purchasePrice: '18,750.00', grnNum: '2421', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Mapping', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MAP/LBE/0025', center: 'Colombo', section: 'Mapping', assetType: 'Laboratory Equipment', assetName: 'Sample cupboard', qty: 1, invPageNo: '3', purchaseDate: '2016.12.01', purchasePrice: '24,750.00', grnNum: '2421', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Mapping', bos: '' },
    { assetCode: 'GJRTI/CC/RD/LBE/0026', center: 'Colombo', section: 'Research Division', assetType: 'Laboratory Equipment', assetName: 'Sample Racks', qty: 1, invPageNo: '18', purchaseDate: '2016.12.01', purchasePrice: '18,750.00', grnNum: '2421', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/LBE/0027', center: 'Colombo', section: 'Research Division', assetType: 'Laboratory Equipment', assetName: 'Sample Racks', qty: 1, invPageNo: '18', purchaseDate: '2016.12.01', purchasePrice: '18,750.00', grnNum: '2421', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/LBE/0028', center: 'Colombo', section: 'Research Division', assetType: 'Laboratory Equipment', assetName: 'Sample cupboard', qty: 1, invPageNo: '18', purchaseDate: '2016.12.01', purchasePrice: '24,750.00', grnNum: '2421', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0029', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', assetName: 'Lab Stool Steel Cusion', qty: 1, invPageNo: '5', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in Inventory', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0030', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', assetName: 'Lab Stool Steel Cusion', qty: 1, invPageNo: '5', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in Inventory', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0031', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', assetName: 'Lab Stool Steel Cusion', qty: 1, invPageNo: '5', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in Inventory', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0032', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', assetName: 'Lab Stool Steel Cusion', qty: 1, invPageNo: '5', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in Inventory', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0033', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', assetName: 'Lab Stool Steel Cusion', qty: 1, invPageNo: '5', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in Inventory', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0034', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', assetName: 'Lab Stool Steel Cusion', qty: 1, invPageNo: '5', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in Inventory', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0035', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', assetName: 'Lab Stool Steel Cusion', qty: 1, invPageNo: '5', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in Inventory', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0036', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', assetName: 'Sample Racks', qty: 1, invPageNo: '6', purchaseDate: '2016.12.01', purchasePrice: '18,750.00', grnNum: '2421', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0037', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', assetName: 'Sample Racks', qty: 1, invPageNo: '6', purchaseDate: '2016.12.01', purchasePrice: '18,750.00', grnNum: '2421', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0038', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', assetName: 'Sample Racks', qty: 1, invPageNo: '6', purchaseDate: '2016.12.01', purchasePrice: '18,750.00', grnNum: '2421', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/LBE/0039', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Laboratory Equipment', assetName: 'Autoclave (Biobase)', qty: 1, invPageNo: '6', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in Inventory', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Geo Chemistry', bos: '' },
    { assetCode: 'GJRTI/RC/PGC/LBE/0040', center: 'Rathnapura', section: 'Precision Cutting', assetType: 'Laboratory Equipment', assetName: 'Lab Stool Steel Cusion', qty: 1, invPageNo: '', purchaseDate: '2024.07.19', purchasePrice: '42,447.38', grnNum: '11452', remarks: 'Double entery - not valied', revaluationPrice: '', transferToConsumable: '', currentLocation: 'ERROR NOT VALIED', newSection: 'Precision Cutting', bos: 'Er' },
    { assetCode: 'GJRTI/RC/PGC/LBE/0041', center: 'Rathnapura', section: 'Precision Cutting', assetType: 'Laboratory Equipment', assetName: 'Lab Stool Steel Cusion', qty: 1, invPageNo: '', purchaseDate: '2024.07.19', purchasePrice: '42,447.38', grnNum: '11452', remarks: 'Double entery - not valied', revaluationPrice: '', transferToConsumable: '', currentLocation: 'ERROR NOT VALIED', newSection: 'Precision Cutting', bos: 'Er' },
    { assetCode: 'GJRTI/RC/PGC/LBE/0042', center: 'Rathnapura', section: 'Precision Cutting', assetType: 'Laboratory Equipment', assetName: 'Lab Stool Steel Cusion', qty: 1, invPageNo: '', purchaseDate: '2024.07.19', purchasePrice: '42,447.38', grnNum: '11452', remarks: 'Double entery - not valied', revaluationPrice: '', transferToConsumable: '', currentLocation: 'ERROR NOT VALIED', newSection: 'Precision Cutting', bos: 'Er' },
    { assetCode: 'GJRTI/RC/PGC/LBE/0043', center: 'Rathnapura', section: 'Precision Cutting', assetType: 'Laboratory Equipment', assetName: 'Lab Stool Steel Cusion', qty: 1, invPageNo: '', purchaseDate: '2024.07.19', purchasePrice: '42,447.38', grnNum: '11452', remarks: 'Double entery - not valied', revaluationPrice: '', transferToConsumable: '', currentLocation: 'ERROR NOT VALIED', newSection: 'Precision Cutting', bos: 'Er' },
    { assetCode: 'GJRTI/RC/PGC/LBE/0044', center: 'Rathnapura', section: 'Precision Cutting', assetType: 'Laboratory Equipment', assetName: 'Lab Stool Steel Cusion', qty: 1, invPageNo: '', purchaseDate: '2024.07.19', purchasePrice: '42,447.38', grnNum: '11452', remarks: 'Double entery - not valied', revaluationPrice: '', transferToConsumable: '', currentLocation: 'ERROR NOT VALIED', newSection: 'Precision Cutting', bos: 'Er' },
    { assetCode: 'GJRTI/RC/PGC/LBE/0045', center: 'Rathnapura', section: 'Precision Cutting', assetType: 'Laboratory Equipment', assetName: 'Lab Stool Steel Cusion', qty: 1, invPageNo: '', purchaseDate: '2024.07.19', purchasePrice: '42,447.38', grnNum: '11452', remarks: 'Double entery - not valied', revaluationPrice: '', transferToConsumable: '', currentLocation: 'ERROR NOT VALIED', newSection: 'Precision Cutting', bos: 'Er' },
    { assetCode: 'GJRTI/RC/PGC/LBE/0046', center: 'Rathnapura', section: 'Precision Cutting', assetType: 'Laboratory Equipment', assetName: 'Lab Stool Steel Cusion', qty: 1, invPageNo: '', purchaseDate: '2024.07.19', purchasePrice: '42,447.38', grnNum: '11452', remarks: 'Double entery - not valied', revaluationPrice: '', transferToConsumable: '', currentLocation: 'ERROR NOT VALIED', newSection: 'Precision Cutting', bos: 'Er' },
    { assetCode: 'GJRTI/RC/PGC/LBE/0047', center: 'Rathnapura', section: 'Precision Cutting', assetType: 'Laboratory Equipment', assetName: 'Lab Stool Steel Cusion', qty: 1, invPageNo: '', purchaseDate: '2024.07.19', purchasePrice: '42,447.34', grnNum: '11452', remarks: 'Double entery - not valied', revaluationPrice: '', transferToConsumable: '', currentLocation: 'ERROR NOT VALIED', newSection: 'Precision Cutting', bos: 'Er' },
    { assetCode: 'GJRTI/RC/PGC/LBE/0048', center: 'Rathnapura', section: 'Precision Cutting', assetType: 'Laboratory Equipment', assetName: 'Laboratory Table', qty: 1, invPageNo: '', purchaseDate: '2024.10.05', purchasePrice: '92,866.00', grnNum: '11456', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Rathnapura', newSection: 'Precision Cutting', bos: '' },
    { assetCode: 'GJRTI/RC/PGC/LBE/0049', center: 'Rathnapura', section: 'Precision Cutting', assetType: 'Laboratory Equipment', assetName: 'Laboratory Table', qty: 1, invPageNo: '', purchaseDate: '2024.10.05', purchasePrice: '92,866.00', grnNum: '11456', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Rathnapura', newSection: 'Precision Cutting', bos: '' },
    { assetCode: 'GJRTI/RC/PGC/LBE/0050', center: 'Rathnapura', section: 'Precision Cutting', assetType: 'Laboratory Equipment', assetName: 'Laboratory Table', qty: 1, invPageNo: '', purchaseDate: '2024.10.05', purchasePrice: '92,866.00', grnNum: '11456', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Rathnapura', newSection: 'Precision Cutting', bos: '' },
    { assetCode: 'GJRTI/RC/PGC/LBE/0051', center: 'Rathnapura', section: 'Precision Cutting', assetType: 'Laboratory Equipment', assetName: 'Laboratory Table', qty: 1, invPageNo: '', purchaseDate: '2024.10.05', purchasePrice: '92,866.00', grnNum: '11456', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Rathnapura', newSection: 'Precision Cutting', bos: '' },
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
    console.log('🚀 Starting asset import...');
    console.log(`Total assets to import: ${assetsData.length}`);
    console.log('');

    // Get reference data
    const assetTypes = await prisma.assetType.findMany();
    const centers = await prisma.center.findMany();
    const sections = await prisma.section.findMany();
    const bosCategories = await prisma.boardOfSurveyCategory.findMany();

    // Get or create branches for Colombo and Rathnapura
    const colomboBranch = await prisma.branch.upsert({
        where: { name: 'Colombo Office' },
        update: {},
        create: { name: 'Colombo Office', location: 'Colombo' },
    });

    const rathnapuraBranch = await prisma.branch.upsert({
        where: { name: 'Rathnapura Office' },
        update: {},
        create: { name: 'Rathnapura Office', location: 'Rathnapura' },
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

            const branchId = asset.center === 'Colombo' ? colomboBranch.id : rathnapuraBranch.id;
            const purchaseDate = parseDate(asset.purchaseDate);
            const purchasePrice = parsePrice(asset.purchasePrice);
            const revaluationPrice = parsePrice(asset.revaluationPrice);

            // Create asset
            await prisma.asset.create({
                data: {
                    assetId: asset.assetCode, // Using assetCode as assetId
                    assetCode: asset.assetCode,
                    name: asset.assetName,
                    category: asset.assetType, // Legacy field
                    status: asset.bos === 'Er' ? 'DoubleEntry' : 'Active',
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
