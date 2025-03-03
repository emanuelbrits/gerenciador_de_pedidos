/*
  Warnings:

  - Added the required column `foto` to the `VendaProduto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VendaProduto" ADD COLUMN     "foto" TEXT NOT NULL;
