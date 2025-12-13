
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.branch.upsert({
        where: { name: 'Head Office' },
        update: {},
        create: {
            name: 'Head Office',
            location: 'Colombo',
        }
    });
    console.log("Created Head Office branch");
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
