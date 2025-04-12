/*
  Warnings:

  - The `repitation` column on the `SchedulerConfig` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SchedulerConfig" DROP COLUMN "repitation",
ADD COLUMN     "repitation" TEXT[];
