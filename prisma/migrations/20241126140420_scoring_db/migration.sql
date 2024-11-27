/*
  Warnings:

  - You are about to drop the `_MatchToPlayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TeamPlayers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MatchToPlayer" DROP CONSTRAINT "_MatchToPlayer_A_fkey";

-- DropForeignKey
ALTER TABLE "_MatchToPlayer" DROP CONSTRAINT "_MatchToPlayer_B_fkey";

-- DropForeignKey
ALTER TABLE "_TeamPlayers" DROP CONSTRAINT "_TeamPlayers_A_fkey";

-- DropForeignKey
ALTER TABLE "_TeamPlayers" DROP CONSTRAINT "_TeamPlayers_B_fkey";

-- DropTable
DROP TABLE "_MatchToPlayer";

-- DropTable
DROP TABLE "_TeamPlayers";

-- CreateTable
CREATE TABLE "Innings" (
    "id" SERIAL NOT NULL,
    "totalRuns" INTEGER NOT NULL DEFAULT 0,
    "extras" INTEGER NOT NULL DEFAULT 0,
    "oversPlayed" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Innings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BattingSchema" (
    "id" SERIAL NOT NULL,
    "playerName" TEXT,
    "playerId" INTEGER,
    "inningsId" INTEGER,
    "runsScores" INTEGER[],
    "totalRuns" INTEGER NOT NULL,
    "fours" INTEGER NOT NULL,
    "sixes" INTEGER NOT NULL,
    "isOut" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BattingSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BowlingSchema" (
    "id" SERIAL NOT NULL,
    "playerName" TEXT,
    "playerId" INTEGER,
    "inningsId" INTEGER,
    "oversBowled" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BowlingSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ball" (
    "id" SERIAL NOT NULL,
    "playedById" INTEGER NOT NULL,
    "isWide" BOOLEAN NOT NULL DEFAULT false,
    "isNoBall" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,
    "bowlingSchemaId" INTEGER,

    CONSTRAINT "Ball_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlayerTeams" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_teamAPlayers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_teamBPlayers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerTeams_AB_unique" ON "_PlayerTeams"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerTeams_B_index" ON "_PlayerTeams"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_teamAPlayers_AB_unique" ON "_teamAPlayers"("A", "B");

-- CreateIndex
CREATE INDEX "_teamAPlayers_B_index" ON "_teamAPlayers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_teamBPlayers_AB_unique" ON "_teamBPlayers"("A", "B");

-- CreateIndex
CREATE INDEX "_teamBPlayers_B_index" ON "_teamBPlayers"("B");

-- AddForeignKey
ALTER TABLE "BattingSchema" ADD CONSTRAINT "BattingSchema_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattingSchema" ADD CONSTRAINT "BattingSchema_inningsId_fkey" FOREIGN KEY ("inningsId") REFERENCES "Innings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BowlingSchema" ADD CONSTRAINT "BowlingSchema_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BowlingSchema" ADD CONSTRAINT "BowlingSchema_inningsId_fkey" FOREIGN KEY ("inningsId") REFERENCES "Innings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ball" ADD CONSTRAINT "Ball_playedById_fkey" FOREIGN KEY ("playedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ball" ADD CONSTRAINT "Ball_bowlingSchemaId_fkey" FOREIGN KEY ("bowlingSchemaId") REFERENCES "BowlingSchema"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerTeams" ADD CONSTRAINT "_PlayerTeams_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerTeams" ADD CONSTRAINT "_PlayerTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_teamAPlayers" ADD CONSTRAINT "_teamAPlayers_A_fkey" FOREIGN KEY ("A") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_teamAPlayers" ADD CONSTRAINT "_teamAPlayers_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_teamBPlayers" ADD CONSTRAINT "_teamBPlayers_A_fkey" FOREIGN KEY ("A") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_teamBPlayers" ADD CONSTRAINT "_teamBPlayers_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
