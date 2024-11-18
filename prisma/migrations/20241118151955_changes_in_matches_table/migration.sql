/*
  Warnings:

  - You are about to drop the column `teamId` on the `Match` table. All the data in the column will be lost.
  - Added the required column `ballType` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bowlingLimit` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "teamId",
ADD COLUMN     "ballType" TEXT NOT NULL,
ADD COLUMN     "bowlingLimit" INTEGER NOT NULL;
