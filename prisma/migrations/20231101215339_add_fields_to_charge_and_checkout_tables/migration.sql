-- AlterTable
ALTER TABLE "charges" ADD COLUMN     "externalId" TEXT;

-- AlterTable
ALTER TABLE "checkouts" ADD COLUMN     "barcodeNumber" TEXT,
ADD COLUMN     "digitableLine" TEXT,
ADD COLUMN     "externalId" TEXT,
ADD COLUMN     "paymentTypeChosen" "PaymentType";
