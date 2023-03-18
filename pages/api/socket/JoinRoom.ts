import {Server, Socket} from 'socket.io';
import {RoomData} from "./types";
import {JOIN_ROOM_ERROR, ROOM_JOINED} from "./constants";

export const JoinRoom = async (data: RoomData, io: Server, socket: Socket) => {
    if (!io.sockets.adapter.rooms.has(data.roomId)) {
        socket.emit(JOIN_ROOM_ERROR, {
            errorMessage: 'Room does not exists',
        });
    } else {
        const playersConnected = io.sockets.adapter.rooms.get(data.roomId);
        const socketRooms = Array.from(socket.rooms.values()).filter(id => id != socket.id);

        if (socketRooms.length > 0 || playersConnected && playersConnected.size === data.maxPlayerCount) {
            socket.emit(JOIN_ROOM_ERROR, {
                errorMessage: 'Room is full, please choose another room to play',
            });
        } else {
            await socket.join(data.roomId)
            socket.emit(ROOM_JOINED);
        }
    }
}