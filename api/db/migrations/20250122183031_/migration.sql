-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Amphi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lon" REAL NOT NULL,
    "seats" INTEGER NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "universityId" INTEGER NOT NULL,
    CONSTRAINT "Amphi_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Amphi" ("id", "lat", "lon", "name", "universityId", "seats") SELECT "id", "lat", "lon", "name", "universityId", "seats" FROM "Amphi";
DROP TABLE "Amphi";
ALTER TABLE "new_Amphi" RENAME TO "Amphi";
CREATE UNIQUE INDEX "Amphi_name_key" ON "Amphi"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
