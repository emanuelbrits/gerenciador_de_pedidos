/*
  Warnings:

  - Added the required column `cliente` to the `Venda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Venda" ADD COLUMN     "cliente" TEXT NOT NULL;
