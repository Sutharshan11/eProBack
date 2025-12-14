
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany({
        include: { branch: true }
    });
    console.log('Users:', users.map(u => ({ email: u.email, role: u.role, branch: u.branch?.name })));

    const branches = await prisma.branch.findMany({
        include: {
            assets: {
                select: { category: true }
            }
        }
    });

    branches.forEach(b => {
        const categories = [...new Set(b.assets.map(a => a.category))];
        console.log(`Branch: ${b.name}, ID: ${b.id}, Categories: ${categories.join(', ')}`);
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
