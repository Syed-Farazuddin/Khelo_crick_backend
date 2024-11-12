/*
  Warnings:

  - You are about to drop the column `battingStyle` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `bowlingStyle` on the `User` table. All the data in the column will be lost.
  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "battingStyle",
DROP COLUMN "bowlingStyle",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "dob" TEXT NOT NULL,
ADD COLUMN     "mobile" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "bowlingStyle" TEXT NOT NULL,
    "battingStyle" TEXT NOT NULL,
    "wicketKeeper" BOOLEAN NOT NULL,
    "allrounder" BOOLEAN NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stats" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "matches" INTEGER NOT NULL,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bowlingStats" (
    "id" SERIAL NOT NULL,
    "matches" INTEGER NOT NULL,
    "innings" INTEGER NOT NULL,
    "wickets" INTEGER NOT NULL,
    "noBalls" INTEGER NOT NULL,
    "wides" INTEGER NOT NULL,

    CONSTRAINT "bowlingStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "battingStats" (
    "id" SERIAL NOT NULL,
    "matches" INTEGER NOT NULL,
    "innings" INTEGER NOT NULL,
    "bowlsPlayed" BIGINT NOT NULL,
    "runs" BIGINT NOT NULL,
    "notOuts" BIGINT NOT NULL,
    "average" DECIMAL(65,30) NOT NULL,
    "strikeRate" DECIMAL(65,30) NOT NULL,
    "sixes" BIGINT NOT NULL,
    "fours" BIGINT NOT NULL,
    "ones" BIGINT NOT NULL,
    "twos" BIGINT NOT NULL,
    "threes" BIGINT NOT NULL,

    CONSTRAINT "battingStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldingStats" (
    "id" SERIAL NOT NULL,
    "catches" INTEGER NOT NULL,
    "mostCatches" INTEGER NOT NULL,
    "runOuts" INTEGER NOT NULL,
    "mostRunOuts" INTEGER NOT NULL,
    "stump" INTEGER NOT NULL,

    CONSTRAINT "FieldingStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "totalMatches" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "draws" INTEGER NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "state" TEXT NOT NULL,
    "ground" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "overs" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "teamAId" INTEGER NOT NULL,
    "teamBId" INTEGER NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
