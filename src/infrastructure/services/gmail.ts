import nodemailer from "nodemailer";
import config from "../../config/load-config";
import { NotificationInfo } from "../../presentation/dtos/notification";

export class EmailService {

    public async SendEmail(monitor: NotificationInfo, email: string, htmlText?: string) {

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
            subject: `⚠️ Cảnh báo: ${monitor.getName()} vượt ngưỡng!`,
            html: htmlText ? htmlText :
                `
                    <h2>🔔 Cảnh báo từ hệ thống</h2>
                    <p><strong>Đối tượng quan trắc:</strong> ${monitor.getName()}</p>
                    <p><strong>Giá trị hiện tại:</strong> ${monitor.getValue()} ${monitor.getUnit()}</p>
                    <p><strong>Ngưỡng cảnh báo dưới:</strong> ${monitor.getLowerbound()} ${monitor.getUnit()}</p>
                    <p><strong>Ngưỡng cảnh báo trên:</strong> ${monitor.getUpperbound()} ${monitor.getUnit()}</p>
                    <p><strong>Miêu tả:</strong> ${monitor.getDes()}</p>
                    <p><strong>Thời gian:</strong> ${new Date(monitor.getDate()).toLocaleString()}</p>
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



