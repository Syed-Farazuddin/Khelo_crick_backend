/*
  Warnings:

  - You are about to drop the `_teamAPlayers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_teamBPlayers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_teamAPlayers" DROP CONSTRAINT "_teamAPlayers_A_fkey";

-- DropForeignKey
ALTER TABLE "_teamAPlayers" DROP CONSTRAINT "_teamAPlayers_B_fkey";

-- DropForeignKey
ALTER TABLE "_teamBPlayers" DROP CONSTRAINT "_teamBPlayers_A_fkey";

-- DropForeignKey
ALTER TABLE "_teamBPlayers" DROP CONSTRAINT "_teamBPlayers_B_fkey";

-- DropTable
DROP TABLE "_teamAPlayers";

-- DropTable
DROP TABLE "_teamBPlayers";

-- CreateTable
CREATE TABLE "_players" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_players_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_players_B_index" ON "_players"("B");

-- AddForeignKey
ALTER TABLE "_players" ADD CONSTRAINT "_players_A_fkey" FOREIGN KEY ("A") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_players" ADD CONSTRAINT "_players_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
