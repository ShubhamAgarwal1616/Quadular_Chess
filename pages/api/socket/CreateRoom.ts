import {Server, Socket} from 'socket.io';
import {RoomData} from "./types";
import {CREATE_ROOM_ERROR, MAP_PLAYER_TO_SOCKET, NEW_PLAYER_JOINED, ROOM_CREATED} from "./constants";
import {playerCountMap} from "./PlayerCountMap";

export const CreateRoom = async (data: RoomData, io: Server, socket: Socket) => {
    const roomAlreadyExists = io.sockets.adapter.rooms.has(data.roomId);

    if (roomAlreadyExists) {
        socket.emit(CREATE_ROOM_ERROR, {
            errorMessage: 'Room already exists with this Id, Please provide a different Id',
        });
    } else {
        await socket.join(data.roomId)
        playerCountMap.set(data.roomId, data.maxPlayerCount);
        socket.emit(ROOM_CREATED, data.maxPlayerCount);
        socket.emit(NEW_PLAYER_JOINED, {playersInGame: 1});
        socket.emit(MAP_PLAYER_TO_SOCKET, 'Player 1')
    }
}