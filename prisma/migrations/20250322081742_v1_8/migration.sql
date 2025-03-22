/*
  Warnings:

  - Added the required column `feed` to the `MonitoringSubject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MonitoringSubject" ADD COLUMN     "feed" TEXT NOT NULL;
