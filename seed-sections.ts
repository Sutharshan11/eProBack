import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sections = [
    { name: 'Administration Division', shortCode: 'HR' },
    { name: 'Analytical', shortCode: 'RD-AN' },
    { name: 'CAD', shortCode: 'CADS' },
    { name: 'CAM', shortCode: 'CAM' },
    { name: 'Casting & Elec. Plating', shortCode: 'CEP' },
    { name: 'Chairman office', shortCode: 'CHA' },
    { name: 'Costume Jewellery', shortCode: 'CJS' },
    { name: 'DG office', shortCode: 'DG' },
    { name: 'Exploration', shortCode: 'RD-EXP' },
    { name: 'Finance Division', shortCode: 'FD' },
    { name: 'Gem Caving', shortCode: 'GCV' },
    { name: 'Gem Cutting', shortCode: 'GCS' },
    { name: 'Gemmology', shortCode: 'GS' },
    { name: 'Geo Chemistry', shortCode: 'RD-Gche' },
    { name: 'Heat Treatment', shortCode: 'RD-HT' },
    { name: 'Internal Audit', shortCode: 'IA' },
    { name: 'Jewellery Designing', shortCode: 'JDS' },
    { name: 'Jewellery Manufacturing', shortCode: 'JMS' },
    { name: 'Mapping', shortCode: 'RD-MAP' },
    { name: 'Mineral Processing and Sedimentrology', shortCode: 'RD-MPS' },
    { name: 'Office', shortCode: 'OFF' },
    { name: 'Precision Cutting', shortCode: 'PGC' },
    { name: 'Quarters', shortCode: 'QTS' },  // Corrected from "Quatars"
    { name: 'Research Division', shortCode: 'RD' },
    { name: 'Stores', shortCode: 'STO' },
    { name: 'Training Division', shortCode: 'TD' },
    { name: 'Assaying Unit', shortCode: 'AU' },
];

async function main() {
    console.log('Seeding Sections...');

    for (const section of sections) {
        await prisma.section.upsert({
            where: { shortCode: section.shortCode },
            update: {},
            create: section,
        });
    }

    console.log('✅ Sections seeded successfully!');
    console.log(`Total: ${sections.length} sections`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
