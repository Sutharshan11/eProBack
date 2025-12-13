import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
    { name: 'Consumable', code: 'C' },
    { name: 'Destroy', code: 'D' },
    { name: 'Missing', code: 'M' },
    { name: 'Repair', code: 'R' },
    { name: 'Sale', code: 'S' },
    { name: 'Double Entry', code: 'Er' },
];

const years = [2022, 2023, 2024, 2025];

async function main() {
    console.log('Seeding Board of Survey Categories...');

    for (const category of categories) {
        await prisma.boardOfSurveyCategory.upsert({
            where: { code: category.code },
            update: {},
            create: category,
        });
    }

    console.log('✅ Board of Survey Categories seeded successfully!');
    console.log(`Total: ${categories.length} categories`);

    console.log('\nSeeding Board of Survey Years...');

    for (const year of years) {
        await prisma.boardOfSurveyYear.upsert({
            where: { year },
            update: {},
            create: { year },
        });
    }

    console.log('✅ Board of Survey Years seeded successfully!');
    console.log(`Total: ${years.length} years`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
