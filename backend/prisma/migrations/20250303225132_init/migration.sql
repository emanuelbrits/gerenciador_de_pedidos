/*
  Warnings:

  - Added the required column `nome` to the `VendaProduto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VendaProduto" ADD COLUMN     "nome" TEXT NOT NULL;
