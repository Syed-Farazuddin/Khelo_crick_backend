/*
  Warnings:

  - You are about to drop the column `playerId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `teamAId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `teamBId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the `battingStats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bowlingStats` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Stats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teamId` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Stats` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_playerId_fkey";

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "playerId",
DROP COLUMN "teamAId",
DROP COLUMN "teamBId",
ADD COLUMN     "teamId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Stats" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "battingStats";

-- DropTable
DROP TABLE "bowlingStats";

-- CreateTable
CREATE TABLE "BowlingStats" (
    "id" SERIAL NOT NULL,
    "matches" INTEGER NOT NULL,
    "innings" INTEGER NOT NULL,
    "wickets" INTEGER NOT NULL,
    "noBalls" INTEGER NOT NULL,
    "wides" INTEGER NOT NULL,

    CONSTRAINT "BowlingStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BattingStats" (
    "id" SERIAL NOT NULL,
    "matches" INTEGER NOT NULL,
    "innings" INTEGER NOT NULL,
    "ballsPlayed" BIGINT NOT NULL,
    "runs" BIGINT NOT NULL,
    "notOuts" BIGINT NOT NULL,
    "average" DECIMAL(65,30) NOT NULL,
    "strikeRate" DECIMAL(65,30) NOT NULL,
    "sixes" BIGINT NOT NULL,
    "fours" BIGINT NOT NULL,
    "ones" BIGINT NOT NULL,
    "twos" BIGINT NOT NULL,
    "threes" BIGINT NOT NULL,

    CONSTRAINT "BattingStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tournament" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stats_userId_key" ON "Stats"("userId");
