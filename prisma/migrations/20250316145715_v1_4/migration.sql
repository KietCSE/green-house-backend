/*
  Warnings:

  - Added the required column `alertDes` to the `MonitoringSubject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alertlowerbound` to the `MonitoringSubject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alertupperbound` to the `MonitoringSubject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `MonitoringSubject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warning` to the `MonitoringSubject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MonitoringSubject" ADD COLUMN     "alertDes" TEXT NOT NULL,
ADD COLUMN     "alertlowerbound" INTEGER NOT NULL,
ADD COLUMN     "alertupperbound" INTEGER NOT NULL,
ADD COLUMN     "email" BOOLEAN NOT NULL,
ADD COLUMN     "warning" BOOLEAN NOT NULL;
