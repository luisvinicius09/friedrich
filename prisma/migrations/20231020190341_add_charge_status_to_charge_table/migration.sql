/*
  Warnings:

  - You are about to drop the column `chargeStatusId` on the `charges` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "charges" DROP CONSTRAINT "charges_chargeStatusId_fkey";

-- AlterTable
ALTER TABLE "charges" DROP COLUMN "chargeStatusId",
ADD COLUMN     "statusId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "charges" ADD CONSTRAINT "charges_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "charges-statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
