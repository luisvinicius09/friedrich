/*
  Warnings:

  - Added the required column `amountInCents` to the `charges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expireDate` to the `charges` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('CREDIT_CARD', 'BOLETO', 'PIX');

-- AlterTable
ALTER TABLE "charges" ADD COLUMN     "amountInCents" INTEGER NOT NULL,
ADD COLUMN     "expireDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "selectedPaymentTypes" "PaymentType"[];
