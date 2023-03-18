import {Socket} from 'socket.io';
import {HostSelectedOptions} from "./types";
import {OPTIONS_SELECTED} from "./constants";

export const ShareOptionsSelected = async (data: HostSelectedOptions, socket: Socket) => {
    socket.to(data.roomId).emit(OPTIONS_SELECTED, data);
}