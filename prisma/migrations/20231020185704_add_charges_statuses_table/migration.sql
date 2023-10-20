/*
  Warnings:

  - You are about to drop the column `status` on the `charges` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "charges" DROP COLUMN "status",
ADD COLUMN     "chargeStatusId" INTEGER;

-- DropEnum
DROP TYPE "ChargeStatus";

-- CreateTable
CREATE TABLE "charges-statuses" (
    "id" SERIAL NOT NULL,
    "statusName" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "charges-statuses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "charges" ADD CONSTRAINT "charges_chargeStatusId_fkey" FOREIGN KEY ("chargeStatusId") REFERENCES "charges-statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
