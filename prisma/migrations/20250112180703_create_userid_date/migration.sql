/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `UserStats` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserStats_userId_date_key" ON "UserStats"("userId", "date");
