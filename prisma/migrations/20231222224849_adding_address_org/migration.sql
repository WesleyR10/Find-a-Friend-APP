/*
  Warnings:

  - Added the required column `address` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "address" TEXT NOT NULL;
