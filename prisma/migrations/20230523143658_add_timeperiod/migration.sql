-- CreateTable
CREATE TABLE "TimePeriod" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_NodeToTimePeriod" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_NodeToTimePeriod_A_fkey" FOREIGN KEY ("A") REFERENCES "Node" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_NodeToTimePeriod_B_fkey" FOREIGN KEY ("B") REFERENCES "TimePeriod" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_NodeToTimePeriod_AB_unique" ON "_NodeToTimePeriod"("A", "B");

-- CreateIndex
CREATE INDEX "_NodeToTimePeriod_B_index" ON "_NodeToTimePeriod"("B");
