-- DropForeignKey
ALTER TABLE "BattingSchema" DROP CONSTRAINT "BattingSchema_inningsId_fkey";

-- DropForeignKey
ALTER TABLE "BowlingSchema" DROP CONSTRAINT "BowlingSchema_inningsId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_tossWonTeamId_fkey";

-- AlterTable
ALTER TABLE "BattingTeam" ADD COLUMN     "inningsId" INTEGER;

-- AlterTable
ALTER TABLE "BowlingTeam" ADD COLUMN     "inningsId" INTEGER;

-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "tossWonTeamId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_tossWonTeamId_fkey" FOREIGN KEY ("tossWonTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattingTeam" ADD CONSTRAINT "BattingTeam_inningsId_fkey" FOREIGN KEY ("inningsId") REFERENCES "Innings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BowlingTeam" ADD CONSTRAINT "BowlingTeam_inningsId_fkey" FOREIGN KEY ("inningsId") REFERENCES "Innings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
