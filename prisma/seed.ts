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
    const branches = ['Rathnapura', 'Kandy', 'Galle', 'Naula', 'Awissawella', 'Aththnagalla', 'Nivithigala', 'Batticaloa', 'Jaffna'];

    for (const branch of branches) {
        const branchName = branch; // Fix unused variable warning if any
        await prisma.branch.upsert({
            where: { name: branchName },
            update: {},
            create: {
                name: branchName,
                location: `${branchName} City`,
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
