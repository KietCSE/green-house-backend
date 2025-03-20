/*
  Warnings:

  - Added the required column `sensorId` to the `Condition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `threshold` to the `Condition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prefixMessage` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Condition" ADD COLUMN     "sensorId" TEXT NOT NULL,
ADD COLUMN     "threshold" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "prefixMessage" TEXT NOT NULL;
