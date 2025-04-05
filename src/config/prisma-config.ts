import { PrismaClient } from '@prisma/client';


// hien thi thong tin can thiet khi query du lieu
const prisma = new PrismaClient({
    // log: ['query', 'info', 'warn', 'error']
});


export async function connectDB() {
    try {
        await prisma.$connect();
        console.log('Kết nối database thành công!');
    } catch (error) {
        console.error('Lỗi kết nối database:', error);
    }
}


export default prisma;



