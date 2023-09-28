-- AlterEnum
ALTER TYPE "ChargeStatus" ADD VALUE 'REFUNDED';

-- AlterTable
ALTER TABLE "Charge" ADD COLUMN     "checkoutId" TEXT,
ADD COLUMN     "userProductId" TEXT;

-- CreateTable
CREATE TABLE "Checkout" (
    "id" TEXT NOT NULL,
    "chargeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Checkout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Checkout_chargeId_key" ON "Checkout"("chargeId");

-- AddForeignKey
ALTER TABLE "Charge" ADD CONSTRAINT "Charge_userProductId_fkey" FOREIGN KEY ("userProductId") REFERENCES "users-products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkout" ADD CONSTRAINT "Checkout_chargeId_fkey" FOREIGN KEY ("chargeId") REFERENCES "Charge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkout" ADD CONSTRAINT "Checkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
