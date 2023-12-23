/*
  Warnings:

  - Added the required column `animalType` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "animalType" TEXT NOT NULL,
ADD COLUMN     "size" TEXT,
ALTER COLUMN "breed" DROP NOT NULL;
