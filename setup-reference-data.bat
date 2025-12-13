@echo off
REM Migration and Seed Script for Asset Management System

echo ==========================================
echo Asset Management Database Setup
echo ==========================================
echo.

echo Step 1: Running Prisma Migration...
call npx prisma migrate dev --name add_reference_data_models
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Migration failed!
    pause
    exit /b 1
)
echo Migration completed successfully!
echo.

echo Step 2: Seeding Asset Types...
call npx tsx seed-asset-types.ts
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Asset Types seed failed!
    pause
    exit /b 1
)
echo.

echo Step 3: Seeding Centers...
call npx tsx seed-centers.ts
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Centers seed failed!
    pause
    exit /b 1
)
echo.

echo Step 4: Seeding Sections...
call npx tsx seed-sections.ts
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Sections seed failed!
    pause
    exit /b 1
)
echo.

echo Step 5: Seeding Board of Survey Data...
call npx tsx seed-board-of-survey.ts
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Board of Survey seed failed!
    pause
    exit /b 1
)
echo.

echo Step 6: Importing 51 Laboratory Equipment Assets...
call npx tsx import-assets.ts
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Asset import failed!
    pause
    exit /b 1
)
echo.

echo ==========================================
echo SUCCESS: All data imported successfully!
echo ==========================================
echo.
echo Summary:
echo - 13 Asset Types
echo - 16 Centers
echo - 27 Sections
echo - 6 Board of Survey Categories
echo - 4 Board of Survey Years
echo - 51 Laboratory Equipment Assets
echo.
pause
