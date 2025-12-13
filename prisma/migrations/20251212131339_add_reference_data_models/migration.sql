-- CreateTable
CREATE TABLE "AssetType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "shortCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Center" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "shortCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Section" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "shortCode" TEXT NOT NULL,
    "centerId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Section_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BoardOfSurveyCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "BoardOfSurveyYear" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Asset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "assetId" TEXT NOT NULL,
    "assetCode" TEXT,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "status" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "assetTypeId" INTEGER,
    "centerId" INTEGER,
    "sectionId" INTEGER,
    "currentSectionId" INTEGER,
    "branchId" INTEGER NOT NULL,
    "boardOfSurveyCategoryId" INTEGER,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "inventoryPageNo" TEXT,
    "purchaseDate" DATETIME,
    "purchasePrice" REAL,
    "grnNumber" TEXT,
    "remarks" TEXT,
    "revaluationPrice" REAL,
    "transferredToConsumable" BOOLEAN NOT NULL DEFAULT false,
    "currentLocation" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Asset_assetTypeId_fkey" FOREIGN KEY ("assetTypeId") REFERENCES "AssetType" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Asset_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Asset_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Asset_currentSectionId_fkey" FOREIGN KEY ("currentSectionId") REFERENCES "Section" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Asset_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Asset_boardOfSurveyCategoryId_fkey" FOREIGN KEY ("boardOfSurveyCategoryId") REFERENCES "BoardOfSurveyCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Asset" ("assetId", "branchId", "category", "createdAt", "id", "name", "status", "updatedAt", "value") SELECT "assetId", "branchId", "category", "createdAt", "id", "name", "status", "updatedAt", "value" FROM "Asset";
DROP TABLE "Asset";
ALTER TABLE "new_Asset" RENAME TO "Asset";
CREATE UNIQUE INDEX "Asset_assetId_key" ON "Asset"("assetId");
CREATE UNIQUE INDEX "Asset_assetCode_key" ON "Asset"("assetCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "AssetType_name_key" ON "AssetType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AssetType_shortCode_key" ON "AssetType"("shortCode");

-- CreateIndex
CREATE UNIQUE INDEX "Center_name_key" ON "Center"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Center_shortCode_key" ON "Center"("shortCode");

-- CreateIndex
CREATE UNIQUE INDEX "Section_name_key" ON "Section"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Section_shortCode_key" ON "Section"("shortCode");

-- CreateIndex
CREATE UNIQUE INDEX "BoardOfSurveyCategory_name_key" ON "BoardOfSurveyCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BoardOfSurveyCategory_code_key" ON "BoardOfSurveyCategory"("code");

-- CreateIndex
CREATE UNIQUE INDEX "BoardOfSurveyYear_year_key" ON "BoardOfSurveyYear"("year");
