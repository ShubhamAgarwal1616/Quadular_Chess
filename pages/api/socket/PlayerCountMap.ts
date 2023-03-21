import {Server} from "socket.io";

export const playerCountMap: Map<string, number> = new Map<string, number>();

export const updatePlayerCountMap = (io: Server) => {
    const roomsToClear: string[] = [];
    playerCountMap.forEach((_, key) => {
        if(!io.sockets.adapter.rooms.has(key)) {
            roomsToClear.push(key);
        }
    })
    roomsToClear.forEach(room => playerCountMap.delete(room));
}