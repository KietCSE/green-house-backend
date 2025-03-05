/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" INTEGER NOT NULL,
    "monitoringSubjectId" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonitoringSubject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "upperbound" INTEGER NOT NULL,
    "lowerbound" INTEGER NOT NULL,

    CONSTRAINT "MonitoringSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Data" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "monitoringSubjectId" INTEGER NOT NULL,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "power" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceHistory" (
    "id" SERIAL NOT NULL,
    "info" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceId" TEXT NOT NULL,

    CONSTRAINT "DeviceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Configuration" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "action" BOOLEAN NOT NULL,
    "deviceId" TEXT NOT NULL,

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchedulerConfig" (
    "id" INTEGER NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "repitation" TEXT,

    CONSTRAINT "SchedulerConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutomationConfig" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "AutomationConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Condition" (
    "id" SERIAL NOT NULL,
    "condition" TEXT NOT NULL,
    "automationConfigId" INTEGER NOT NULL,

    CONSTRAINT "Condition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_name_key" ON "Device"("name");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_monitoringSubjectId_fkey" FOREIGN KEY ("monitoringSubjectId") REFERENCES "MonitoringSubject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_monitoringSubjectId_fkey" FOREIGN KEY ("monitoringSubjectId") REFERENCES "MonitoringSubject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceHistory" ADD CONSTRAINT "DeviceHistory_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Configuration" ADD CONSTRAINT "Configuration_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchedulerConfig" ADD CONSTRAINT "SchedulerConfig_id_fkey" FOREIGN KEY ("id") REFERENCES "Configuration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutomationConfig" ADD CONSTRAINT "AutomationConfig_id_fkey" FOREIGN KEY ("id") REFERENCES "Configuration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Condition" ADD CONSTRAINT "Condition_automationConfigId_fkey" FOREIGN KEY ("automationConfigId") REFERENCES "AutomationConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
