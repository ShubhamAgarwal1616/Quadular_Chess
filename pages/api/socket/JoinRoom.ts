import {Server, Socket} from 'socket.io';
import {JOIN_ROOM_ERROR, MAP_PLAYER_TO_SOCKET, NEW_PLAYER_JOINED, ROOM_JOINED} from "./constants";
import {playerCountMap} from "./PlayerCountMap";

export const JoinRoom = async (roomId: string, io: Server, socket: Socket) => {
    if (!io.sockets.adapter.rooms.has(roomId)) {
        socket.emit(JOIN_ROOM_ERROR, {
            errorMessage: 'Room does not exists',
        });
    } else {
        const playersConnected = io.sockets.adapter.rooms.get(roomId);
        const socketRooms = Array.from(socket.rooms.values()).filter(id => id != socket.id);
        const maxPlayerCount: number = playerCountMap.get(roomId) ?? 0;
        if (socketRooms.length > 0 || playersConnected && playersConnected.size >= maxPlayerCount) {
            socket.emit(JOIN_ROOM_ERROR, {
                errorMessage: 'Room is full, please choose another room to play',
            });
        } else {
            await socket.join(roomId)
            socket.emit(MAP_PLAYER_TO_SOCKET, `Player ${playersConnected?.size}`)
            socket.emit(ROOM_JOINED, maxPlayerCount);
            io.to(roomId).emit(NEW_PLAYER_JOINED, {playersInGame: playersConnected?.size});
        }
    }
}