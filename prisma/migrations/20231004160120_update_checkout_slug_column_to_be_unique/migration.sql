/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `checkouts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "checkouts_slug_key" ON "checkouts"("slug");
