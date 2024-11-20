/*
  Warnings:

  - You are about to alter the column `ballsPlayed` on the `BattingStats` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `runs` on the `BattingStats` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `notOuts` on the `BattingStats` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `sixes` on the `BattingStats` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `fours` on the `BattingStats` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `ones` on the `BattingStats` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `twos` on the `BattingStats` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `threes` on the `BattingStats` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "BattingStats" ALTER COLUMN "ballsPlayed" SET DATA TYPE INTEGER,
ALTER COLUMN "runs" SET DATA TYPE INTEGER,
ALTER COLUMN "notOuts" SET DATA TYPE INTEGER,
ALTER COLUMN "sixes" SET DATA TYPE INTEGER,
ALTER COLUMN "fours" SET DATA TYPE INTEGER,
ALTER COLUMN "ones" SET DATA TYPE INTEGER,
ALTER COLUMN "twos" SET DATA TYPE INTEGER,
ALTER COLUMN "threes" SET DATA TYPE INTEGER;
