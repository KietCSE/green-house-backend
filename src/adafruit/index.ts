import mqtt, { MqttClient } from 'mqtt';
import config from '../config/load-config';

const AIO_USERNAME: string = config.AIO_USERNAME
const AIO_KEY: string = config.AIO_KEY
const AIO_FEED_ID: string = config.AIO_FEED_ID

// Tạo kết nối MQTT
const client: MqttClient = mqtt.connect({
    host: 'io.adafruit.com',
    port: 1883,
    username: AIO_USERNAME,
    password: AIO_KEY,
});

// Xử lý sự kiện khi kết nối thành công
client.on('connect', () => {
    console.log('Kết nối thành công...');
    client.subscribe(`${AIO_USERNAME}/feeds/${AIO_FEED_ID}`, (err) => {
        if (!err) {
            console.log('Subscribe thành công...');
        } else {
            console.error('Subscribe thất bại:', err);
        }
    });
});

// Xử lý sự kiện khi nhận được dữ liệu
client.on('message', (topic: string, message: Buffer) => {
    console.log(`Nhận dữ liệu từ ${topic}: ${message.toString()}`);
});

// Xử lý sự kiện khi mất kết nối
client.on('close', () => {
    console.log('Ngắt kết nối...');
    process.exit(1);
});

// Xử lý sự kiện khi có lỗi
client.on('error', (err: Error) => {
    console.error('Có lỗi xảy ra:', err);
    process.exit(1);
});

// Gửi dữ liệu ngẫu nhiên mỗi 5 giây
setInterval(() => {
    const value: number = Math.floor(Math.random() * 101); // Tạo giá trị ngẫu nhiên từ 0 đến 100
    console.log('Cập nhật:', value);
    client.publish(`${AIO_USERNAME}/feeds/bbc-temp`, value.toString(), (err) => {
        if (err) {
            console.error('Gửi dữ liệu thất bại:', err);
        }
    });
}, 5000);
