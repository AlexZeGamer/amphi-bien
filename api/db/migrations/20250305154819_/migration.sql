-- CreateTable
CREATE TABLE "Feature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" TEXT,
    "iconUrl" TEXT
);

-- CreateTable
CREATE TABLE "_AmphiToFeature" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AmphiToFeature_A_fkey" FOREIGN KEY ("A") REFERENCES "Amphi" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AmphiToFeature_B_fkey" FOREIGN KEY ("B") REFERENCES "Feature" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_AmphiToFeature_AB_unique" ON "_AmphiToFeature"("A", "B");

-- CreateIndex
CREATE INDEX "_AmphiToFeature_B_index" ON "_AmphiToFeature"("B");
