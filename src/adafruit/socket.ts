import { Server, Socket } from 'socket.io';

export class SocketManager {

    private io: Server
    private static instance: SocketManager

    constructor(io: Server) {
        this.io = io
        SocketManager.instance = this
    }

    public static getInstance(): SocketManager {
        if (!SocketManager.instance) {
            Error("Socket.IO server is not initialized.")
        }
        return SocketManager.instance
    }

    public setupEventListener(): void {
        console.log("Initializing socket")
        if (!this.io) {
            throw Error("Socket.IO server is not initialized.");
        }
        this.io.on('connection', (socket: Socket) => {
            console.log(`Client ${socket.id} connected, total clients: ${this.io.engine.clientsCount}`);

            socket.on('message', (message: string) => {
                console.log(`Received message from client ${socket.id}: ${message}`);
                this.io.emit('message', message);
            });

            socket.on('disconnect', () => {
                console.log(`Client ${socket.id} disconnected`);
            })
        })
    }

    public broadcaseData(data: string) {
        if (this.io) {
            this.io.emit('message', data);
        }
        else {
            console.error("Socket.IO server is not initialized.");
        }
    }
}