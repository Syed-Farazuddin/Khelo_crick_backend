/*
  Warnings:

  - You are about to drop the column `playerId` on the `Stats` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Stats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bowlStatsId]` on the table `Stats` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fieldStatsId]` on the table `Stats` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[batStatsId]` on the table `Stats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `batStatsId` to the `Stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bowlStatsId` to the `Stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fieldStatsId` to the `Stats` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Stats_userId_key";

-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "bowlingStyle" DROP NOT NULL,
ALTER COLUMN "battingStyle" DROP NOT NULL,
ALTER COLUMN "wicketKeeper" DROP NOT NULL,
ALTER COLUMN "allrounder" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Stats" DROP COLUMN "playerId",
DROP COLUMN "userId",
ADD COLUMN     "batStatsId" INTEGER NOT NULL,
ADD COLUMN     "bowlStatsId" INTEGER NOT NULL,
ADD COLUMN     "fieldStatsId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Stats_bowlStatsId_key" ON "Stats"("bowlStatsId");

-- CreateIndex
CREATE UNIQUE INDEX "Stats_fieldStatsId_key" ON "Stats"("fieldStatsId");

-- CreateIndex
CREATE UNIQUE INDEX "Stats_batStatsId_key" ON "Stats"("batStatsId");

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_bowlStatsId_fkey" FOREIGN KEY ("bowlStatsId") REFERENCES "BowlingStats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_fieldStatsId_fkey" FOREIGN KEY ("fieldStatsId") REFERENCES "FieldingStats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_batStatsId_fkey" FOREIGN KEY ("batStatsId") REFERENCES "BattingStats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
