import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function verifyLogin() {
    const email = 'sutharshankanna04@gmail.com';
    const password = 'password123';

    console.log(`Checking user: ${email}`);
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        console.error('❌ User not found!');
        return;
    }

    console.log('✅ User found in DB.');
    console.log(`Stored Hash: ${user.password}`);

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        console.log('✅ Password Match! Login logic is correct.');
    } else {
        console.error('❌ Password Mismatch! The stored hash does not match "password123".');
    }
}

verifyLogin()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
