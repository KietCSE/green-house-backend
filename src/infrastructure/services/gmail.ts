import nodemailer from "nodemailer";
import config from "../../config/load-config";
import { NotificationData } from "../../presentation/dtos/notification";
import { Condition, Configuration, Device } from "@prisma/client";

export class EmailService {

    public async SendEmail(monitor: NotificationData, email: string) {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.EMAIL_USER as string,
                pass: config.EMAIL_PWD as string,
            },
        });

        const mailOptions: nodemailer.SendMailOptions = {
            from: `"Green Hourse System" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `⚠️ Cảnh báo: ${monitor.monitoringSubject.name} vượt ngưỡng!`,
            html: `
                <h2>🔔 Cảnh báo từ hệ thống</h2>
                <p><strong>Đối tượng quan trắc:</strong> ${monitor.monitoringSubject.name}</p>
                <p><strong>Giá trị hiện tại:</strong> ${monitor.notification.value} ${monitor.monitoringSubject.unit}</p>
                <p><strong>Ngưỡng cảnh báo dưới:</strong> ${monitor.monitoringSubject.alertlowerbound} ${monitor.monitoringSubject.unit}</p>
                <p><strong>Ngưỡng cảnh báo trên:</strong> ${monitor.monitoringSubject.alertupperbound} ${monitor.monitoringSubject.unit}</p>
                <p><strong>Miêu tả:</strong> ${monitor.monitoringSubject.alertDes}</p>
                <p><strong>Thời gian:</strong> ${new Date(monitor.notification.date).toLocaleString()}</p>
            `,
        };

        try {
            console.log(email)
            const info = await transporter.sendMail(mailOptions);
            console.log("Email sent successfully:", info.response);
        } catch (error) {
            console.error("Error occurred:", error);
        }

    }

    public async SendEmailConfig(value: number, device: Device, configAuto: Configuration, condition: Condition, email: string) {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.EMAIL_USER as string,
                pass: config.EMAIL_PWD as string,
            },
        });

        const mailOptions: nodemailer.SendMailOptions = {
            from: `"Green Hourse System" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `⚠️ Cảnh báo: Đội tượng quan trắc ${condition.sensorId} vượt ngưỡng!`,
            html: `
                <h2 style="color: red;">🔔 Cảnh báo từ hệ thống Green House</h2>
                <p><strong>Thiết bị:</strong> ${device.name}</p>
                <p><strong>Mô tả thiết bị:</strong> ${device.description || "Chưa có mô tả"}</p>
                <p><strong>Mô tả cấu hình:</strong> ${configAuto.description || "Chưa có mô tả"}</p>
                <p><strong>Mô tả điều kiện:</strong> ${condition.description || "Chưa có mô tả"}</p>
                <p><strong>Điều kiện kích hoạt:</strong> ${value} ${condition.condition} ${condition.threshold}</p>
                <p><strong>Giá trị hiện tại:</strong> ${value}</p>
                <p><strong>Thời gian phát hiện:</strong> ${new Date().toLocaleString()}</p>
                <hr/>
                <h3>Các hành động tiếp theo:</h3>
                <ul>
                    <li>Vui lòng kiểm tra tình trạng thiết bị.</li>
                    <li>Kiểm tra các yếu tố môi trường hoặc hệ thống của thiết bị.</li>
                </ul>
                <p><em>Đây là email tự động, vui lòng không phản hồi trực tiếp!</em></p>
            `,
        };

        try {
            console.log(email)
            const info = await transporter.sendMail(mailOptions);
            console.log("Email sent successfully:", info.response);
        } catch (error) {
            console.error("Error occurred:", error);
        }

    }
}



