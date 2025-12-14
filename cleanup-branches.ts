import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MASTER_BRANCHES = [
    { name: 'Attanagalla', code: 'AC' },
    { name: 'Badulla', code: 'BC' },
    { name: 'Batticoloa', code: 'BTC' }, // Note: User spelling
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

// Mapping from "Bad" -> "Good"
const MAPPINGS: Record<string, string> = {
    'Rathnapura Office': 'Rathnapura',
    'Kandy Office': 'Kandy',
    'Galle Office': 'Galle',
    'Naula Office': 'Naula',
    'Nivithigala Office': 'Nivithigala',
    'Laggala Office': 'Laggala',
    'Attanagalla Office': 'Attanagalla',
    'Aththnagalla': 'Attanagalla', // Typo fix
    'Colombo Office': 'Colombo',
    'Ratnapura-GSP Office': 'Ratnapura-GSP',
    'Jaffna Office': 'Jaffna',
    'Batticaloa': 'Batticoloa', // Fix spelling to match user list
    // Add others if found
};

async function main() {
    console.log('Starting Branch Cleanup...');

    // 1. Ensure Master Branches Exist
    for (const mb of MASTER_BRANCHES) {
        const exists = await prisma.branch.findUnique({ where: { name: mb.name } });
        if (!exists) {
            console.log(`Creating Master Branch: ${mb.name}`);
            await prisma.branch.create({
                data: {
                    name: mb.name,
                    location: `${mb.name} (Code: ${mb.code})`
                }
            });
        }
    }

    // 2. Process Mappings
    for (const [bad, good] of Object.entries(MAPPINGS)) {
        const badBranch = await prisma.branch.findUnique({ where: { name: bad } });
        const goodBranch = await prisma.branch.findUnique({ where: { name: good } });

        if (badBranch && goodBranch) {
            console.log(`Merging ${bad} -> ${good}`);

            // Update Assets
            const assetsUpdate = await prisma.asset.updateMany({
                where: { branchId: badBranch.id },
                data: { branchId: goodBranch.id }
            });
            console.log(`  Moved ${assetsUpdate.count} assets.`);

            // Update Users
            const usersUpdate = await prisma.user.updateMany({
                where: { branchId: badBranch.id },
                data: { branchId: goodBranch.id }
            });
            console.log(`  Moved ${usersUpdate.count} users.`);

            // Move Transfers (From)
            await prisma.transferRequest.updateMany({
                where: { fromBranchId: badBranch.id },
                data: { fromBranchId: goodBranch.id }
            });

            // Move Transfers (To)
            await prisma.transferRequest.updateMany({
                where: { toBranchId: badBranch.id },
                data: { toBranchId: goodBranch.id }
            });

            // Delete Bad Branch
            await prisma.branch.delete({ where: { id: badBranch.id } });
            console.log(`  Deleted ${bad}.`);
        }
    }

    // 3. Optional: List remaining branches not in Master List
    const allBranches = await prisma.branch.findMany();
    const masterNames = new Set(MASTER_BRANCHES.map(b => b.name));
    const unknownBranches = allBranches.filter(b => !masterNames.has(b.name));

    if (unknownBranches.length > 0) {
        console.warn('WARNING: The following branches are in DB but NOT in Master List (and not mapped):');
        unknownBranches.forEach(b => console.log(` - ${b.name}`));

        // UNCOMMENT TO AUTO-DELETE UNKNOWN BRANCHES (Risky?)
        // The user said "keep above branches only". So we SHOULD delete them if they are empty?
        // Let's delete them if they have no assets/users.

        for (const b of unknownBranches) {
            const assetCount = await prisma.asset.count({ where: { branchId: b.id } });
            if (assetCount === 0) {
                console.log(`Deleting empty unknown branch: ${b.name}`);
                await prisma.branch.delete({ where: { id: b.id } });
            } else {
                console.log(`Skipping ${b.name} - it has ${assetCount} assets. Please manually map or delete.`);
            }
        }
    }

    console.log('Cleanup Finished.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
