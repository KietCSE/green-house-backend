/*
  Warnings:

  - A unique constraint covering the columns `[feed]` on the table `MonitoringSubject` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MonitoringSubject_feed_key" ON "MonitoringSubject"("feed");
