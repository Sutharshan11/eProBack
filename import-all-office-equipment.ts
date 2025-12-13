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

// Complete Office Equipment data - Original 39 + New items from second spreadsheet
const assetsData: AssetImportData[] = [
    // Original 39 items (0001-0039)
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

    // New items from second spreadsheet (0041-0089)
    { assetCode: 'GJRTI/CC/PGC/OE/0041', center: 'Colombo', section: 'Training Division', assetType: 'Office Equipment', assetName: 'Office Equipment Fan Pedestal', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Training Division', bos: '' },
    { assetCode: 'GJRTI/CC/PGC/OE/0042', center: 'Colombo', section: 'Training Division', assetType: 'Office Equipment', assetName: 'Office Equipment Fan Pedestal', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Training Division', bos: '' },
    { assetCode: 'GJRTI/CC/PGC/OE/0043', center: 'Colombo', section: 'Training Division', assetType: 'Office Equipment', assetName: 'Office Equipment Fan Pedestal', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Training Division', bos: '' },
    { assetCode: 'GJRTI/CC/PGC/OE/0044', center: 'Colombo', section: 'Training Division', assetType: 'Office Equipment', assetName: 'Office Equipment Fan Pedestal', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Training Division', bos: '' },
    { assetCode: 'GJRTI/CC/PGC/OE/0045', center: 'Colombo', section: 'Training Division', assetType: 'Office Equipment', assetName: 'Office Equipment Amplifier Projector', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Destroy', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Training Division', bos: 'D' },
    { assetCode: 'GJRTI/CC/PGC/OE/0046', center: 'Colombo', section: 'Training Division', assetType: 'Office Equipment', assetName: 'Office Equipment Document Projector', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Destroy', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Training Division', bos: 'D' },
    { assetCode: 'GJRTI/CC/PGC/OE/0047', center: 'Colombo', section: 'Training Division', assetType: 'Office Equipment', assetName: 'Office Equipment Projector', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Manila', newSection: 'Training Division', bos: 'R' },
    { assetCode: 'GJRTI/CC/PGC/OE/0048', center: 'Colombo', section: 'Training Division', assetType: 'Office Equipment', assetName: 'Office Equipment Multi Media Screen 80*100', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Training Division', bos: '' },
    { assetCode: 'GJRTI/CC/PGC/OE/0049', center: 'Colombo', section: 'Training Division', assetType: 'Office Equipment', assetName: 'Office Equipment Printer HP', qty: 2, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Training Division', bos: '' },
    { assetCode: 'GJRTI/CC/PGC/OE/0050', center: 'Colombo', section: 'Training Division', assetType: 'Office Equipment', assetName: 'Office Equipment printer HP', qty: 2, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Training Division', bos: '' },
    { assetCode: 'GJRTI/CC/PGC/OE/0051', center: 'Colombo', section: 'Training Division', assetType: 'Office Equipment', assetName: 'Office Equipment printer Xerox camera', qty: 1, invPageNo: '', purchaseDate: '2018.03.22', purchasePrice: '26,500.00', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Training Division', bos: 'R' },
    { assetCode: 'GJRTI/CC/PGC/OE/0052', center: 'Colombo', section: 'Training Division', assetType: 'Office Equipment', assetName: 'Office Equipment Printer', qty: 2, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Training Division', bos: '2021' },
    { assetCode: 'GJRTI/CC/PGC/OE/0053', center: 'Colombo', section: 'Training Division', assetType: 'Office Equipment', assetName: 'Office Equipment Printer Melty Function', qty: 2, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Training Division', bos: '' },
    { assetCode: 'GJRTI/CC/PGC/OE/0054', center: 'Colombo', section: 'Training Division', assetType: 'Office Equipment', assetName: 'Office Equipment printer Jelly X 700', qty: 2, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Training Division', bos: '' },
    { assetCode: 'GJRTI/CC/PGC/OE/0055', center: 'Colombo', section: 'Training Division', assetType: 'Office Equipment', assetName: 'Office Equipment Laptop', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Training Division', bos: '' },
    { assetCode: 'GJRTI/CC/PGC/OE/0056', center: 'Colombo', section: 'Training Division', assetType: 'Office Equipment', assetName: 'Office Equipment Printer Brother HL 6180', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Training Division', bos: 'R' },
    { assetCode: 'GJRTI/CC/GS/OE/0057', center: 'Colombo', section: 'Gemmology', assetType: 'Office Equipment', assetName: 'Office Equipment Refrigerator 260 Soelis', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Gemmology', bos: '' },
    { assetCode: 'GJRTI/CC/GS/OE/0058', center: 'Colombo', section: 'Gemmology', assetType: 'Office Equipment', assetName: 'Office Equipment Stand fan', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Gemmology', bos: '' },
    { assetCode: 'GJRTI/CC/GS/OE/0059', center: 'Colombo', section: 'Gemmology', assetType: 'Office Equipment', assetName: 'Office Equipment stand fan', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Gemmology', bos: '' },
    { assetCode: 'GJRTI/CC/GS/OE/0060', center: 'Colombo', section: 'Gemmology', assetType: 'Office Equipment', assetName: 'Office Equipment Fan', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Gemmology', bos: '' },
    { assetCode: 'GJRTI/CC/GS/OE/0061', center: 'Colombo', section: 'Gemmology', assetType: 'Office Equipment', assetName: 'Office Equipment Switch', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Gemmology', bos: '' },
    { assetCode: 'GJRTI/CC/GS/OE/0062', center: 'Colombo', section: 'Gemmology', assetType: 'Office Equipment', assetName: 'Office Equipment Tell Me', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Gemmology', bos: '' },
    { assetCode: 'GJRTI/CC/RD-AN/OE/0063', center: 'Colombo', section: 'Analytical', assetType: 'Office Equipment', assetName: 'Office Equipment Printer Colour HP - XBF Access', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: 'Not in inventory', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/CC/RD-Gche/OE/0064', center: 'Colombo', section: 'Geo Chemistry', assetType: 'Office Equipment', assetName: 'Office Equipment Printer Colour HP - XBF Access', qty: 1, invPageNo: '', purchaseDate: '2006.07.01', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Analytical', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MAP/OE/0065', center: 'Colombo', section: 'Mapping', assetType: 'Office Equipment', assetName: 'Office Equipment Colour Hewlett Printer A0 (Brother )', qty: 1, invPageNo: '', purchaseDate: '2006.07.01', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Mapping', bos: '' },
    { assetCode: 'GJRTI/CC/RD-MPS/OE/0066', center: 'Colombo', section: 'Mineral Processing and Sedimentrology', assetType: 'Office Equipment', assetName: 'Office Equipment Multifunction Scanner Kodra - Se 3120', qty: 1, invPageNo: '', purchaseDate: '2006.07.01', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Mapping', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0067', center: 'Colombo', section: 'Research Division', assetType: 'Office Equipment', assetName: 'Office Equipment Slide Projector Kodra - Se 3120', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '143,750.00', grnNum: '2611', remarks: 'Not in inventory', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Mapping', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0068', center: 'Colombo', section: 'Research Division', assetType: 'Office Equipment', assetName: 'Office Equipment Book Hinder QBC C300 comm', qty: 1, invPageNo: '', purchaseDate: '2017.09.09', purchasePrice: '5,775.00', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0069', center: 'Colombo', section: 'Research Division', assetType: 'Office Equipment', assetName: 'Office Equipment Copper HO 7', qty: 1, invPageNo: '', purchaseDate: '2024.12.30', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0070', center: 'Colombo', section: 'Research Division', assetType: 'Office Equipment', assetName: 'Office Equipment Scanner HP E1', qty: 1, invPageNo: '', purchaseDate: '', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0071', center: 'Colombo', section: 'Research Division', assetType: 'Office Equipment', assetName: 'Office Equipment E.C.T Ring Bind', qty: 1, invPageNo: '', purchaseDate: '2017.05.31', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0072', center: 'Colombo', section: 'Research Division', assetType: 'Office Equipment', assetName: 'Office Equipment T.V. Sony', qty: 1, invPageNo: '', purchaseDate: '2019.11.20', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0073', center: 'Colombo', section: 'Research Division', assetType: 'Office Equipment', assetName: 'Office Equipment Water filter Accessories Softner - 8 Inch', qty: 1, invPageNo: '', purchaseDate: '2019.11.20', purchasePrice: '', grnNum: '', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0074', center: 'Colombo', section: 'Research Division', assetType: 'Office Equipment', assetName: 'Office Equipment Silon camera accessories 11 \" cath lens', qty: 1, invPageNo: '', purchaseDate: '2018.21.04', purchasePrice: '73,500.00', grnNum: '2679', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0075', center: 'Colombo', section: 'Research Division', assetType: 'Office Equipment', assetName: 'Office Equipment Canon camera accessories 11 \" cath lens', qty: 1, invPageNo: '', purchaseDate: '2018.21.06', purchasePrice: '25,000.00', grnNum: '2679', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0076', center: 'Colombo', section: 'Research Division', assetType: 'Office Equipment', assetName: 'Office Equipment Silon Tri Pad Holder', qty: 1, invPageNo: '', purchaseDate: '2018.21.04', purchasePrice: '72,500.00', grnNum: '2673', confirms: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: 'R' },
    { assetCode: 'GJRTI/CC/RD/OE/0077', center: 'Colombo', section: 'Research Division', assetType: 'Office Equipment', assetName: 'Office Equipment Silon camera accessories', qty: 1, invPageNo: '', purchaseDate: '2018.21.04', purchasePrice: '72,500.00', grnNum: '2673', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0078', center: 'Colombo', section: 'Research Division', assetType: 'Office Equipment', assetName: 'Office Equipment Canon camera accessories', qty: 1, invPageNo: '', purchaseDate: '2018.21.06', purchasePrice: '25,000.00', grnNum: '2673', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0079', center: 'Colombo', section: 'Research Division', assetType: 'Office Equipment', assetName: 'Office Equipment Canon camera accessories', qty: 1, invPageNo: '', purchaseDate: '2018.21.06', purchasePrice: '25,000.00', grnNum: '2673', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: '' },
    { assetCode: 'GJRTI/CC/RD/OE/0080', center: 'Colombo', section: 'Research Division', assetType: 'Office Equipment', assetName: 'Office Equipment Silon camera accessories', qty: 1, invPageNo: '', purchaseDate: '2018.21.04', purchasePrice: '72,500.00', grnNum: '2673', remarks: '', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: 'R' },
    { assetCode: 'GJ RTI/CC/RD/OE/0089', center: 'Colombo', section: 'Research Division', assetType: 'Office Equipment', assetName: 'Office Equipment Gemnas M322220A Printer', qty: 1, invPageNo: '', purchaseDate: '2018.03.24', purchasePrice: '26,500.00', grnNum: '2294', remarks: 'Infidenz', revaluationPrice: '', transferToConsumable: '', currentLocation: 'Colombo', newSection: 'Research Division', bos: 'R' },
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
    // Handle invalid formats
    if (parts[2].length > 2 || isNaN(Number(parts[2]))) return null;
    return new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
}

async function main() {
    console.log('🚀 Starting Complete Office Equipment import...');
    console.log(`Total assets to import: ${assetsData.length}`);
    console.log('');

    // Get reference data
    const assetTypes = await prisma.assetType.findMany();
    const centers = await prisma.center.findMany();
    const sections = await prisma.section.findMany();
    const bosCategories = await prisma.boardOfSurveyCategory.findMany();

    // Get or create branches
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

    const manilaBranch = await prisma.branch.upsert({
        where: { name: 'Manila Office' },
        update: {},
        create: { name: 'Manila Office', location: 'Manila' },
    });

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const asset of assetsData) {
        try {
            const assetType = assetTypes.find((at: any) => at.name === asset.assetType);
            const center = centers.find((c: any) => c.name === asset.center);
            const section = sections.find((s: any) => s.name === asset.section);
            const currentSection = sections.find((s: any) => s.name === asset.newSection);
            const bosCategory = asset.bos && asset.bos !== '2021' && asset.bos !== '2025' ? bosCategories.find((b: any) => b.code === asset.bos) : null;

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

            let branchId = colomboBranch.id;
            if (asset.currentLocation === 'Kandy') {
                branchId = kandyBranch.id;
            } else if (asset.currentLocation === 'Galle') {
                branchId = galleBranch.id;
            } else if (asset.currentLocation === 'Manila') {
                branchId = manilaBranch.id;
            }

            const purchaseDate = parseDate(asset.purchaseDate);
            const purchasePrice = parsePrice(asset.purchasePrice);
            const revaluationPrice = parsePrice(asset.revaluationPrice);

            await prisma.asset.create({
                data: {
                    assetId: asset.assetCode,
                    assetCode: asset.assetCode,
                    name: asset.assetName,
                    category: asset.assetType,
                    status: asset.bos === 'D' ? 'Disposed' : (asset.bos === 'Er' ? 'DoubleEntry' : (asset.bos === 'R' ? 'Repair' : 'Active')),
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
