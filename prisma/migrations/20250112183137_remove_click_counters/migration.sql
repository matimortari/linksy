/*
  Warnings:

  - You are about to drop the column `count` on the `ButtonClick` table. All the data in the column will be lost.
  - You are about to drop the column `count` on the `LinkClick` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ButtonClick" DROP COLUMN "count";

-- AlterTable
ALTER TABLE "LinkClick" DROP COLUMN "count";
