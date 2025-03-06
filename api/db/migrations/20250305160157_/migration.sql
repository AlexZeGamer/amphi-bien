/*
  Warnings:

  - You are about to drop the column `iconUrl` on the `Feature` table. All the data in the column will be lost.
  - Added the required column `icon` to the `Feature` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Feature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" TEXT,
    "icon" TEXT NOT NULL
);
INSERT INTO "new_Feature" ("id", "name", "value") SELECT "id", "name", "value" FROM "Feature";
DROP TABLE "Feature";
ALTER TABLE "new_Feature" RENAME TO "Feature";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
