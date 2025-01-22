/*
  Warnings:

  - Added the required column `schoolId` to the `Amphi` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "School" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Amphi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lon" REAL NOT NULL,
    "seats" INTEGER NOT NULL,
    "schoolId" INTEGER NOT NULL,
    CONSTRAINT "Amphi_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Amphi" ("id", "lat", "lon", "name", "seats") SELECT "id", "lat", "lon", "name", "seats" FROM "Amphi";
DROP TABLE "Amphi";
ALTER TABLE "new_Amphi" RENAME TO "Amphi";
CREATE UNIQUE INDEX "Amphi_name_key" ON "Amphi"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
