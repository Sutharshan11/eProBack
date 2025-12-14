import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create Super Admin
    const admin = await prisma.user.upsert({
        where: { email: 'sutharshankanna04@gmail.com' },
        update: {},
        create: {
            email: 'sutharshankanna04@gmail.com',
            name: 'Super Admin',
            password: hashedPassword,
            role: 'SUPER_ADMIN',
        },
    });

    console.log({ admin });

    // Create some branches
    // Create Master Branches
    const MASTER_BRANCHES = [
        { name: 'Attanagalla', code: 'AC' },
        { name: 'Badulla', code: 'BC' },
        { name: 'Batticoloa', code: 'BTC' },
        { name: 'Colombo', code: 'CC' },
        { name: 'Galle', code: 'GC' },
        { name: 'Gampola', code: 'GPC' },
        { name: 'Jaffna', code: 'JC' },
        { name: 'Kandy', code: 'KC' },
        { name: 'Laggala', code: 'LC' },
        { name: 'Maradana', code: 'MC' },
        { name: 'Naula', code: 'NUC' },
        { name: 'Nivithigala', code: 'NC' },
        { name: 'Rathnapura', code: 'RC' },
        { name: 'Rathnapura-YC', code: 'RYC' },
        { name: 'Ratnapura-GSP', code: 'RGSP' },
        { name: 'Senapura', code: 'SC' }
    ];

    for (const branch of MASTER_BRANCHES) {
        await prisma.branch.upsert({
            where: { name: branch.name },
            update: {},
            create: {
                name: branch.name,
                location: `${branch.name} (Code: ${branch.code})`,
            }
        });
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
