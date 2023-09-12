/*
  Warnings:

  - Added the required column `email` to the `users-clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users-clients" ADD COLUMN     "email" TEXT NOT NULL;
