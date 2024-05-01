/*
  Warnings:

  - You are about to drop the column `targetId` on the `Links` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Target" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "targetId" INTEGER NOT NULL,
    "linkId" INTEGER NOT NULL,
    CONSTRAINT "Target_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Links" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Target_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Node" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Links" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sourceId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Links_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Node" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Links" ("createdAt", "id", "sourceId", "updatedAt", "value") SELECT "createdAt", "id", "sourceId", "updatedAt", "value" FROM "Links";
DROP TABLE "Links";
ALTER TABLE "new_Links" RENAME TO "Links";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
