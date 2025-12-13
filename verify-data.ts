import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('📊 Database Verification Report');
    console.log('='.repeat(60));
    console.log('');

    // Check Asset Types
    const assetTypes = await prisma.assetType.findMany();
    console.log(`✅ Asset Types: ${assetTypes.length}`);
    assetTypes.forEach(at => console.log(`   - [${at.shortCode}] ${at.name}`));
    console.log('');

    // Check Centers
    const centers = await prisma.center.findMany();
    console.log(`✅ Centers: ${centers.length}`);
    centers.forEach(c => console.log(`   - [${c.shortCode}] ${c.name}`));
    console.log('');

    // Check Sections
    const sections = await prisma.section.findMany();
    console.log(`✅ Sections: ${sections.length}`);
    sections.forEach(s => console.log(`   - [${s.shortCode}] ${s.name}`));
    console.log('');

    // Check Board of Survey Categories
    const bosCategories = await prisma.boardOfSurveyCategory.findMany();
    console.log(`✅ Board of Survey Categories: ${bosCategories.length}`);
    bosCategories.forEach(b => console.log(`   - [${b.code}] ${b.name}`));
    console.log('');

    // Check Board of Survey Years
    const bosYears = await prisma.boardOfSurveyYear.findMany();
    console.log(`✅ Board of Survey Years: ${bosYears.length}`);
    bosYears.forEach(y => console.log(`   - ${y.year}`));
    console.log('');

    // Check Assets
    const assets = await prisma.asset.findMany({
        include: {
            assetType: true,
            center: true,
            section: true,
            branch: true,
            boardOfSurveyCategory: true,
        },
    });
    console.log(`✅ Total Assets: ${assets.length}`);

    // Group by center
    const assetsByCenter = assets.reduce((acc, asset) => {
        const centerName = asset.center?.name || 'Unknown';
        acc[centerName] = (acc[centerName] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    console.log('   Assets by Center:');
    Object.entries(assetsByCenter).forEach(([center, count]) => {
        console.log(`   - ${center}: ${count} assets`);
    });
    console.log('');

    // Group by asset type
    const assetsByType = assets.reduce((acc, asset) => {
        const typeName = asset.assetType?.name || 'Unknown';
        acc[typeName] = (acc[typeName] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    console.log('   Assets by Type:');
    Object.entries(assetsByType).forEach(([type, count]) => {
        console.log(`   - ${type}: ${count} assets`);
    });
    console.log('');

    // Group by section
    const assetsBySection = assets.reduce((acc, asset) => {
        const sectionName = asset.section?.name || 'Unknown';
        acc[sectionName] = (acc[sectionName] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    console.log('   Assets by Section:');
    Object.entries(assetsBySection).forEach(([section, count]) => {
        console.log(`   - ${section}: ${count} assets`);
    });
    console.log('');

    // Check for double entry items
    const doubleEntryAssets = assets.filter(a => a.boardOfSurveyCategory?.code === 'Er');
    console.log(`⚠️  Double Entry Assets: ${doubleEntryAssets.length}`);
    if (doubleEntryAssets.length > 0) {
        doubleEntryAssets.forEach(a => {
            console.log(`   - ${a.assetCode}: ${a.name}`);
        });
    }
    console.log('');

    // Check for assets with missing purchase info
    const assetsWithoutPurchaseInfo = assets.filter(a => !a.purchaseDate || !a.purchasePrice);
    console.log(`⚠️  Assets without complete purchase info: ${assetsWithoutPurchaseInfo.length}`);
    console.log('');

    console.log('='.repeat(60));
    console.log('✅ Database verification complete!');
}

main()
    .catch((e) => {
        console.error('Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
