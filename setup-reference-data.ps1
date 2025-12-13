# Set-ExecutionPolicy bypassed PowerShell script
# This script bypasses execution policy restrictions

Write-Host "=========================================="
Write-Host "Asset Management Database Setup"
Write-Host "=========================================="
Write-Host ""

Write-Host "Step 1: Running Prisma Migration..."
$process = Start-Process -FilePath "npx" -ArgumentList "prisma", "migrate", "dev", "--name", "add_reference_data_models" -NoNewWindow -Wait -PassThru
if ($process.ExitCode -ne 0) {
    Write-Host "ERROR: Migration failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "Migration completed successfully!" -ForegroundColor Green
Write-Host ""

Write-Host "Step 2: Generating Prisma Client..."
$process = Start-Process -FilePath "npx" -ArgumentList "prisma", "generate" -NoNewWindow -Wait -PassThru
if ($process.ExitCode -ne 0) {
    Write-Host "ERROR: Prisma client generation failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "Prisma client generated successfully!" -ForegroundColor Green
Write-Host ""

Write-Host "Step 3: Seeding Asset Types..."
$process = Start-Process -FilePath "npx" -ArgumentList "tsx", "seed-asset-types.ts" -NoNewWindow -Wait -PassThru
if ($process.ExitCode -ne 0) {
    Write-Host "ERROR: Asset Types seed failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host ""

Write-Host "Step 4: Seeding Centers..."
$process = Start-Process -FilePath "npx" -ArgumentList "tsx", "seed-centers.ts" -NoNewWindow -Wait -PassThru
if ($process.ExitCode -ne 0) {
    Write-Host "ERROR: Centers seed failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host ""

Write-Host "Step 5: Seeding Sections..."
$process = Start-Process -FilePath "npx" -ArgumentList "tsx", "seed-sections.ts" -NoNewWindow -Wait -PassThru
if ($process.ExitCode -ne 0) {
    Write-Host "ERROR: Sections seed failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host ""

Write-Host "Step 6: Seeding Board of Survey Data..."
$process = Start-Process -FilePath "npx" -ArgumentList "tsx", "seed-board-of-survey.ts" -NoNewWindow -Wait -PassThru
if ($process.ExitCode -ne 0) {
    Write-Host "ERROR: Board of Survey seed failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host ""

Write-Host "Step 7: Importing 51 Laboratory Equipment Assets..."
$process = Start-Process -FilePath "npx" -ArgumentList "tsx", "import-assets.ts" -NoNewWindow -Wait -PassThru
if ($process.ExitCode -ne 0) {
    Write-Host "ERROR: Asset import failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host ""

Write-Host "=========================================="
Write-Host "SUCCESS: All data imported successfully!" -ForegroundColor Green
Write-Host "=========================================="
Write-Host ""
Write-Host "Summary:"
Write-Host "- 13 Asset Types"
Write-Host "- 16 Centers"
Write-Host "- 27 Sections"
Write-Host "- 6 Board of Survey Categories"
Write-Host "- 4 Board of Survey Years"
Write-Host "- 51 Laboratory Equipment Assets"
Write-Host ""
Write-Host "Run 'npx tsx verify-data.ts' to verify the import."
Write-Host ""
Read-Host "Press Enter to exit"
