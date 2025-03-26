-- DropForeignKey
ALTER TABLE "AutomationConfig" DROP CONSTRAINT "AutomationConfig_id_fkey";

-- DropForeignKey
ALTER TABLE "Condition" DROP CONSTRAINT "Condition_automationConfigId_fkey";

-- DropForeignKey
ALTER TABLE "Configuration" DROP CONSTRAINT "Configuration_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "SchedulerConfig" DROP CONSTRAINT "SchedulerConfig_id_fkey";

-- AddForeignKey
ALTER TABLE "Configuration" ADD CONSTRAINT "Configuration_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchedulerConfig" ADD CONSTRAINT "SchedulerConfig_id_fkey" FOREIGN KEY ("id") REFERENCES "Configuration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutomationConfig" ADD CONSTRAINT "AutomationConfig_id_fkey" FOREIGN KEY ("id") REFERENCES "Configuration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Condition" ADD CONSTRAINT "Condition_automationConfigId_fkey" FOREIGN KEY ("automationConfigId") REFERENCES "AutomationConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;
