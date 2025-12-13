# Asset Management System - Database Setup Guide

## Overview
This guide will help you set up the database with all reference data and import the initial 51 laboratory equipment assets.

## Prerequisites
- Node.js and npm installed
- PowerShell with execution policy allowing scripts (or use Command Prompt to run .bat file)

## Setup Steps

### Option 1: Automated Setup (Recommended)
Run the automated batch script that will execute all steps in sequence:

```batch
cd d:\eProc\server
setup-reference-data.bat
```

This will:
1. Run Prisma migrations
2. Seed Asset Types (13 types)
3. Seed Centers (16 locations)
4. Seed Sections (27 divisions)
5. Seed Board of Survey data (6 categories + 4 years)
6. Import 51 laboratory equipment assets

### Option 2: Manual Setup
If you prefer to run each step manually:

#### Step 1: Run Database Migration
```powershell
cd d:\eProc\server
npx prisma migrate dev --name add_reference_data_models
```

#### Step 2: Seed Asset Types
```powershell
npx tsx seed-asset-types.ts
```

#### Step 3: Seed Centers
```powershell
npx tsx seed-centers.ts
```

#### Step 4: Seed Sections
```powershell
npx tsx seed-sections.ts
```

#### Step 5: Seed Board of Survey Data
```powershell
npx tsx seed-board-of-survey.ts
```

#### Step 6: Import Assets
```powershell
npx tsx import-assets.ts
```

## Verify Data

After setup, verify all data was imported correctly:

```powershell
npx tsx verify-data.ts
```

This will show:
- Count of all reference data items
- Total assets imported
- Assets grouped by center, type, and section
- Any double entry or incomplete items

## Reference Data Summary

### Asset Types (13)
- Geuda Equipment [GE]
- Lapidary Equipment [LE]
- Jewellery Equipment [JE]
- Assay Equipment [AE]
- Office Furniture [OF]
- Office Equipment [OE]
- Fixture & Fittings [FF]
- Laboratory Equipment [LBE]
- Computer & Accessories [CA]
- Software & Software Development [SSD]
- **Gemmological Equipment [GME]** *(Note: Changed from GE to GME for uniqueness)*
- Research Equipment [RE]
- Library [LBY]

### Centers (16)
Attanagalla [AC], Badulla [BC], Batticoloa [BTC], Colombo [CC], Galle [GC], Gampola [GPC], Jaffna [JC], Kandy [KC], Laggala [LC], Maradana [MC], Naula [NUC], Nivithigala [NC], Rathnapura [RC], Rathnapura-YC [RYC], Ratnapura-GSP [RGSP], Senapura [SC]

### Sections (27)
Administration Division [HR], Analytical [RD-AN], CAD [CADS], CAM [CAM], Casting & Elec. Plating [CEP], Chairman office [CHA], Costume Jewellery [CJS], DG office [DG], Exploration [RD-EXP], Finance Division [FD], Gem Caving [GCV], Gem Cutting [GCS], Gemmology [GS], Geo Chemistry [RD-Gche], Heat Treatment [RD-HT], Internal Audit [IA], Jewellery Designing [JDS], Jewellery Manufacturing [JMS], Mapping [RD-MAP], Mineral Processing and Sedimentrology [RD-MPS], Office [OFF], Precision Cutting [PGC], **Quarters [QTS]**, Research Division [RD], Stores [STO], Training Division [TD], Assaying Unit [AU]

### Board of Survey Categories (6)
- Consumable [C]
- Destroy [D]
- Missing [M]
- Repair [R]
- Sale [S]
- Double Entry [Er]

### Board of Survey Years (4)
2022, 2023, 2024, 2025

## Troubleshooting

### PowerShell Execution Policy Error
If you see an error about "running scripts is disabled", you have two options:

**Option 1:** Use Command Prompt instead of PowerShell
- Open Command Prompt (CMD) instead of PowerShell
- Run the .bat file: `setup-reference-data.bat`

**Option 2:** Temporarily allow PowerShell scripts (Admin required)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Migration Errors
If migration fails, you may need to reset the database:
```powershell
npx prisma migrate reset
```
Then run the setup again.

### Import Errors
If asset import fails, check the error messages. Common issues:
- Reference data not seeded (run seed scripts first)
- Duplicate asset codes
- Invalid dates or prices

## Next Steps

After successful setup:
1. Start the development server: `npm run dev`
2. Test the API endpoints
3. Update frontend components to use the new reference data
4. Implement asset management features

## Files Created

- `prisma/schema.prisma` - Updated with new models
- `seed-asset-types.ts` - Asset type seed script
- `seed-centers.ts` - Center seed script
- `seed-sections.ts` - Section seed script
- `seed-board-of-survey.ts` - Board of Survey seed script
- `import-assets.ts` - Asset import script with 51 items
- `verify-data.ts` - Database verification script
- `setup-reference-data.bat` - Automated setup batch file
