/*
  Warnings:

  - Added the required column `tossWonTeamId` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Innings" ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "chooseToBall" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "chooseToBat" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "inningsA" INTEGER,
ADD COLUMN     "inningsB" INTEGER,
ADD COLUMN     "tossWonTeamId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "createdBy" INTEGER;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_tossWonTeamId_fkey" FOREIGN KEY ("tossWonTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_inningsA_fkey" FOREIGN KEY ("inningsA") REFERENCES "Innings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_inningsB_fkey" FOREIGN KEY ("inningsB") REFERENCES "Innings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
