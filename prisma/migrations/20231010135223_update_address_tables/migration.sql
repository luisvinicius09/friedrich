/*
  Warnings:

  - You are about to drop the column `neighborhood` on the `users-addresses` table. All the data in the column will be lost.
  - Added the required column `documentType` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `users-addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `users-addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateCode` to the `users-addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `users-addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentType` to the `users-clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `users-clients-addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `users-clients-addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `users-clients-addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateCode` to the `users-clients-addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `users-clients-addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `users-clients-addresses` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('CPF', 'CNPJ');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "documentType" "DocumentType" NOT NULL;

-- AlterTable
ALTER TABLE "users-addresses" DROP COLUMN "neighborhood",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "stateCode" TEXT NOT NULL,
ADD COLUMN     "zipCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users-clients" ADD COLUMN     "documentType" "DocumentType" NOT NULL;

-- AlterTable
ALTER TABLE "users-clients-addresses" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "complement" TEXT,
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "stateCode" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "zipCode" TEXT NOT NULL;
