-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_createdById_fkey";

-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "createdById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;
