/*
  Warnings:

  - Added the required column `unit` to the `MonitoringSubject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MonitoringSubject" ADD COLUMN     "unit" TEXT NOT NULL;
