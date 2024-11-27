/*
  Warnings:

  - You are about to drop the column `bowlingSchemaId` on the `Ball` table. All the data in the column will be lost.
  - You are about to drop the column `playerName` on the `BowlingSchema` table. All the data in the column will be lost.
  - Added the required column `runs` to the `Ball` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overLeft` to the `BowlingSchema` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ball" DROP CONSTRAINT "Ball_bowlingSchemaId_fkey";

-- AlterTable
ALTER TABLE "Ball" DROP COLUMN "bowlingSchemaId",
ADD COLUMN     "isBye" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isRunOut" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isWicket" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "overId" INTEGER,
ADD COLUMN     "runs" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "BattingSchema" ADD COLUMN     "battingTeamId" INTEGER;

-- AlterTable
ALTER TABLE "BowlingSchema" DROP COLUMN "playerName",
ADD COLUMN     "bowlingTeamId" INTEGER,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "overLeft" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Innings" ADD COLUMN     "bytes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalNoBalls" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalWides" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "BattingTeam" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "BattingTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BowlingTeam" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "BowlingTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Over" (
    "id" SERIAL NOT NULL,
    "bowlerId" INTEGER,
    "order" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Over_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BattingTeam" ADD CONSTRAINT "BattingTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BowlingTeam" ADD CONSTRAINT "BowlingTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattingSchema" ADD CONSTRAINT "BattingSchema_battingTeamId_fkey" FOREIGN KEY ("battingTeamId") REFERENCES "BattingTeam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BowlingSchema" ADD CONSTRAINT "BowlingSchema_bowlingTeamId_fkey" FOREIGN KEY ("bowlingTeamId") REFERENCES "BowlingTeam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ball" ADD CONSTRAINT "Ball_overId_fkey" FOREIGN KEY ("overId") REFERENCES "Over"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Over" ADD CONSTRAINT "Over_bowlerId_fkey" FOREIGN KEY ("bowlerId") REFERENCES "BowlingSchema"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Over" ADD CONSTRAINT "Over_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
