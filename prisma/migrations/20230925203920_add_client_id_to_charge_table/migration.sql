-- AlterTable
ALTER TABLE "Charge" ADD COLUMN     "userClientId" TEXT;

-- AddForeignKey
ALTER TABLE "Charge" ADD CONSTRAINT "Charge_userClientId_fkey" FOREIGN KEY ("userClientId") REFERENCES "users-clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
