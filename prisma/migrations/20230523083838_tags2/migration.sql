/*
  Warnings:

  - You are about to drop the `TagsOnNodes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TagsOnNodes";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_NodeToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_NodeToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Node" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_NodeToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_NodeToTag_AB_unique" ON "_NodeToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_NodeToTag_B_index" ON "_NodeToTag"("B");
