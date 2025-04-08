import nodemailer from "nodemailer";
import config from "../../config/load-config";
import { NotificationData } from "../../presentation/dtos/notification";

export class EmailService {

    public async SendEmail(monitor: NotificationData, email: string, htmlText?: string) {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.EMAIL_USER as string,
                pass: config.EMAIL_PWD as string,
            },
        });

        const mailOptions: nodemailer.SendMailOptions = {
            from: `"Green House System" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `⚠️ Cảnh báo: ${monitor.monitoringSubject.name} vượt ngưỡng!`,
            html: htmlText ? htmlText :
                `
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
}



