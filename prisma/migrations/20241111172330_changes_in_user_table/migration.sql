/*
  Warnings:

  - A unique constraint covering the columns `[mobile]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "otp" INTEGER,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "age" DROP NOT NULL,
ALTER COLUMN "dob" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");
