/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `MonitoringSubject` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MonitoringSubject_name_key" ON "MonitoringSubject"("name");
