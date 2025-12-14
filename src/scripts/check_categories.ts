
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const counts = await prisma.asset.groupBy({
        by: ['category'],
        _count: {
            _all: true
        }
    });
    console.log('Category Counts:', counts);

    // Also check if there are any assets with null category
    const nullCategory = await prisma.asset.count({
        where: { category: null }
    });
    console.log('Assets with null category:', nullCategory);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
