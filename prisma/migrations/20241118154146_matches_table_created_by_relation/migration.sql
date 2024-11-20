/*
  Warnings:

  - A unique constraint covering the columns `[createdById]` on the table `Match` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdById` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "createdById" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Match_createdById_key" ON "Match"("createdById");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
