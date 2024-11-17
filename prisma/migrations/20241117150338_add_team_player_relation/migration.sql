/*
  Warnings:

  - You are about to drop the `_PlayerToTeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PlayerToTeam" DROP CONSTRAINT "_PlayerToTeam_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlayerToTeam" DROP CONSTRAINT "_PlayerToTeam_B_fkey";

-- DropTable
DROP TABLE "_PlayerToTeam";

-- CreateTable
CREATE TABLE "_TeamPlayers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TeamPlayers_AB_unique" ON "_TeamPlayers"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamPlayers_B_index" ON "_TeamPlayers"("B");

-- AddForeignKey
ALTER TABLE "_TeamPlayers" ADD CONSTRAINT "_TeamPlayers_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamPlayers" ADD CONSTRAINT "_TeamPlayers_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
