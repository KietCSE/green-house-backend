import { Server, Socket } from 'socket.io';

export class SocketManager {

    private static io: Server

    constructor(io: Server) {
        SocketManager.io = io
    }

    public setupEventListener(): void {
        console.log("Initializing socket")
        SocketManager.io.on('connection', (socket: Socket) => {
            console.log(`Client ${socket.id} connected, total clients: ${SocketManager.io.engine.clientsCount}`);

            socket.on('message', (message: string) => {
                console.log(`Received message from client ${socket.id}: ${message}`);
                SocketManager.io.emit('message', message);
            });

            socket.on('disconnect', () => {
                console.log(`Client ${socket.id} disconnected`);
            })
        })
    }

    public static broadcaseData(data: string) {
        if (SocketManager.io) {
            SocketManager.io.emit('message', data);
        }
        else {
            console.error("Socket.IO server is not initialized.");
        }
    }
}