/*
  Warnings:

  - Changed the type of `info` on the `DeviceHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DeviceHistoryInfo" AS ENUM ('Auto', 'Scheduler');

-- AlterTable
ALTER TABLE "DeviceHistory" DROP COLUMN "info",
ADD COLUMN     "info" "DeviceHistoryInfo" NOT NULL;
