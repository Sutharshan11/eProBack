import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🗑️  Clearing existing asset data...');

    // Delete all assets
    const deletedAssets = await prisma.asset.deleteMany({});
    console.log(`✅ Deleted ${deletedAssets.count} assets`);

    // Delete asset history
    const deletedHistory = await prisma.assetHistory.deleteMany({});
    console.log(`✅ Deleted ${deletedHistory.count} asset history records`);

    // Delete transfer requests
    const deletedTransfers = await prisma.transferRequest.deleteMany({});
    console.log(`✅ Deleted ${deletedTransfers.count} transfer requests`);

    console.log('');
    console.log('✅ All asset data cleared successfully!');
}

main()
    .catch((e) => {
        console.error('Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
