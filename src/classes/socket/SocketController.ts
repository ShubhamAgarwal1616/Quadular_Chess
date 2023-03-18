import { io, Socket as ClientSocket } from "socket.io-client";
import {CREATE_ROOM, CREATE_ROOM_ERROR, JOIN_ROOM, JOIN_ROOM_ERROR, ROOM_CREATED, ROOM_JOINED} from "./SocketConstants";
import {RoomData} from "./types";

export class SocketController {
    socket: ClientSocket | null = null
    roomId: string = ''

    connect(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            fetch('/api/socket/init').then(() => {
                this.socket = io()
                if (!this.socket) {
                    return reject('Connection failed')
                }
                this.socket.on('connect', () => {
                    return resolve()
                })
                this.socket.on('connect_error', () => {
                    return reject('Connection failed')
                })
            }).catch(() => {
                reject('Connection failed')
            })
        })
    }

    joinRoom(data: RoomData, hosting: boolean | null): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.socket?.emit(hosting ? CREATE_ROOM : JOIN_ROOM, data);
            this.socket?.on(hosting ? ROOM_CREATED : ROOM_JOINED, () => {
                this.roomId = data.roomId
                resolve(true)
            });
            this.socket?.on(hosting ? CREATE_ROOM_ERROR : JOIN_ROOM_ERROR, ({ errorMessage }) => reject(errorMessage));
        })
    }
}