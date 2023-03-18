import {Socket} from 'socket.io';
import {GameState} from "./types";
import {UPDATE_GAME_STATE} from "./constants";

export const ShareGameState = async (data: GameState, socket: Socket) => {
    socket.to(data.roomId).emit(UPDATE_GAME_STATE, data);
}