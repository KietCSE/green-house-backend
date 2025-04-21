-- DropForeignKey
ALTER TABLE "DeviceHistory" DROP CONSTRAINT "DeviceHistory_deviceId_fkey";

-- AddForeignKey
ALTER TABLE "DeviceHistory" ADD CONSTRAINT "DeviceHistory_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
