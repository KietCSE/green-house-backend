-- AlterTable
ALTER TABLE "MonitoringSubject" ALTER COLUMN "alertDes" DROP NOT NULL,
ALTER COLUMN "alertlowerbound" DROP NOT NULL,
ALTER COLUMN "alertupperbound" DROP NOT NULL;
