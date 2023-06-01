-- CreateTable
CREATE TABLE "GeographicalArea" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ModernCountryArea" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_GeographicalAreaToNode" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GeographicalAreaToNode_A_fkey" FOREIGN KEY ("A") REFERENCES "GeographicalArea" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GeographicalAreaToNode_B_fkey" FOREIGN KEY ("B") REFERENCES "Node" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ModernCountryAreaToNode" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ModernCountryAreaToNode_A_fkey" FOREIGN KEY ("A") REFERENCES "ModernCountryArea" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ModernCountryAreaToNode_B_fkey" FOREIGN KEY ("B") REFERENCES "Node" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_GeographicalAreaToNode_AB_unique" ON "_GeographicalAreaToNode"("A", "B");

-- CreateIndex
CREATE INDEX "_GeographicalAreaToNode_B_index" ON "_GeographicalAreaToNode"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ModernCountryAreaToNode_AB_unique" ON "_ModernCountryAreaToNode"("A", "B");

-- CreateIndex
CREATE INDEX "_ModernCountryAreaToNode_B_index" ON "_ModernCountryAreaToNode"("B");
