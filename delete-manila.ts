import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const branches = await prisma.branch.findMany({
        where: {
            name: { contains: 'Manila' }
        }
    });

    if (branches.length === 0) {
        console.log('No branches found matching "Manila".');
    } else {
        for (const branch of branches) {
            console.log(`Deleting branch: ${branch.name}`);
            // Delete assets or move them? User just said remove branch. 
            // Assuming delete branch and nullify assets or delete them? 
            // Safest to just delete branch if cascade or error if assets exist.
            // Let's check assets first.
            const assets = await prisma.asset.count({ where: { branchId: branch.id } });
            if (assets > 0) {
                console.log(`Branch ${branch.name} has ${assets} assets. Deleting assets first...`);
                await prisma.asset.deleteMany({ where: { branchId: branch.id } });
            }
            await prisma.branch.delete({ where: { id: branch.id } });
            console.log(`Deleted ${branch.name}`);
        }
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
