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
    "schoolId" INTEGER NOT NULL,
    CONSTRAINT "Amphi_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Amphi" ("id", "lat", "lon", "name", "schoolId", "seats") SELECT "id", "lat", "lon", "name", "schoolId", "seats" FROM "Amphi";
DROP TABLE "Amphi";
ALTER TABLE "new_Amphi" RENAME TO "Amphi";
CREATE UNIQUE INDEX "Amphi_name_key" ON "Amphi"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
