-- AlterTable
ALTER TABLE "BattingSchema" ADD COLUMN     "bowlerName" TEXT,
ADD COLUMN     "caughtByName" TEXT;

-- AlterTable
ALTER TABLE "Innings" ADD COLUMN     "nonStrikerId" INTEGER,
ADD COLUMN     "strikerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Innings" ADD CONSTRAINT "Innings_strikerId_fkey" FOREIGN KEY ("strikerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Innings" ADD CONSTRAINT "Innings_nonStrikerId_fkey" FOREIGN KEY ("nonStrikerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;
