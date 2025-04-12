import nodemailer from "nodemailer";
import config from "../../config/load-config";
import { NotificationInfo } from "../../presentation/dtos/notification";
// import { Condition, Configuration, Device } from "@prisma/client";
import { NotificationDevice, NotificationSchedule } from "../../presentation/dtos/notification-device";
import prisma from '../../config/prisma-config'


export class EmailService {

    public async SendEmailToAllUser(monitor: NotificationInfo, htmlText?: string) {
        const listemail = await prisma.user.findMany({
            where: { receiveNotification: true },
            select: { email: true }
        })
        listemail
            .map(e => e.email)
            .filter(e => !!e)
            .forEach(e => {
                this.SendEmail(monitor, e, htmlText)
            })
    }

    private async SendEmail(monitor: NotificationInfo, email: string, htmlText?: string) {

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
            const info = await transporter.sendMail(mailOptions);
            console.log("Email sent successfully:", info.response);
        } catch (error) {
            console.error("Error occurred:", error);
        }

    }

    public async SendEmailConfigToAllUser(data: NotificationDevice) {
        const listemail = await prisma.user.findMany({
            where: { receiveNotification: true },
            select: { email: true }
        })
        listemail
            .map(e => e.email)
            .filter(e => !!e)
            .forEach(e => {
                this.SendEmailConfig(data, e)
            })
    }

    public async SendEmailConfig(data: NotificationDevice, email: string) {

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
            subject: `⚠️ Cảnh báo: Kích hoạt cấu hình tự động!`,
            html: `
                <h2 style="color: red;">🔔 Cảnh báo từ hệ thống Green House</h2>
                <p><strong>Thiết bị:</strong> ${data.getDeviceName()}</p>
                <p><strong>Mô tả thiết bị:</strong> ${data.getDeviceDescription() || "Chưa có mô tả"}</p>
                <p><strong>Mô tả cấu hình:</strong> ${data.getConfigDescription() || "Chưa có mô tả"}</p>
                <p><strong>Mô tả điều kiện:</strong> ${data.getConditionDescription() || "Chưa có mô tả"}</p>
                <p><strong>Điều kiện kích hoạt:</strong> giá trị ${data.getOperator()} ${data.getThreshold()}</p>
                <p><strong>Giá trị hiện tại:</strong> ${data.getValue()}</p>
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

    public async SendEmailScheduleToAllUser(data: NotificationSchedule) {
        const listemail = await prisma.user.findMany({
            where: { receiveNotification: true },
            select: { email: true }
        })
        listemail
            .map(e => e.email)
            .filter(e => !!e)
            .forEach(e => {
                this.SendEmailSchedule(data, e)
            })
    }

    public async SendEmailSchedule(data: NotificationSchedule, email: string) {

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
            subject: `⚠️ Cảnh báo: Kích hoạt cấu hình lịch hẹn!`,
            html: `
                <h2 style="color: red;">🔔 Cảnh báo từ hệ thống Green House</h2>
                <p><strong>Thiết bị:</strong> ${data.getDeviceName()}</p>
                <p><strong>Mô tả thiết bị:</strong> ${data.getDeviceDescription() || "Chưa có mô tả"}</p>
                <p><strong>Mô tả cấu hình:</strong> ${data.getConfigDescription() || "Chưa có mô tả"}</p>
                <p><strong>Thời gian bắt đầu:</strong> ${data.getScheduleStart()}</p>
                <p><strong>Thời gian kết thúc:</strong> ${data.getScheduleEnd()}</p>
                <p><strong>Thời gian lặp lại:</strong> ${data.getRepetition()}</p>
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



