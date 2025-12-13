import prisma from './src/utils/prisma';

async function main() {
    const user = await prisma.user.findUnique({
        where: { email: 'admin@example.com' },
    });
    console.log('User found:', user);
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
