"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
