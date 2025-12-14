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
    "boardOfSurveyYearId" INTEGER,
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
    CONSTRAINT "Asset_boardOfSurveyCategoryId_fkey" FOREIGN KEY ("boardOfSurveyCategoryId") REFERENCES "BoardOfSurveyCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Asset_boardOfSurveyYearId_fkey" FOREIGN KEY ("boardOfSurveyYearId") REFERENCES "BoardOfSurveyYear" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Asset" ("assetCode", "assetId", "assetTypeId", "boardOfSurveyCategoryId", "branchId", "category", "centerId", "createdAt", "currentLocation", "currentSectionId", "grnNumber", "id", "inventoryPageNo", "name", "purchaseDate", "purchasePrice", "quantity", "remarks", "revaluationPrice", "sectionId", "status", "transferredToConsumable", "updatedAt", "value") SELECT "assetCode", "assetId", "assetTypeId", "boardOfSurveyCategoryId", "branchId", "category", "centerId", "createdAt", "currentLocation", "currentSectionId", "grnNumber", "id", "inventoryPageNo", "name", "purchaseDate", "purchasePrice", "quantity", "remarks", "revaluationPrice", "sectionId", "status", "transferredToConsumable", "updatedAt", "value" FROM "Asset";
DROP TABLE "Asset";
ALTER TABLE "new_Asset" RENAME TO "Asset";
CREATE UNIQUE INDEX "Asset_assetId_key" ON "Asset"("assetId");
CREATE UNIQUE INDEX "Asset_assetCode_key" ON "Asset"("assetCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
