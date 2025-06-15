/*
  Warnings:

  - Added the required column `velocidade` to the `Plano` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plano" ADD COLUMN     "velocidade" INTEGER NOT NULL;
