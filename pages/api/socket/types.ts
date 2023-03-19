import {Server as HTTPServer} from "http";
import {Server} from "socket.io";
import {Socket as NetSocket} from "net";
import {NextApiResponse} from "next";
import {DomainColor, SoundType} from "../../../src/classes/constants";
import {BoardController} from "../../../src/classes/BoardController";
import {PlayerController} from "../../../src/classes/player/PlayerController";
import {Player} from "../../../src/classes/player/Player";

interface SocketServer extends HTTPServer {
    io?: Server | undefined
}

interface SocketWithIO extends NetSocket {
    server: SocketServer
}

export interface NextApiResponseWithSocket extends NextApiResponse {
    socket: SocketWithIO
}

export interface RoomData {
    roomId: string;
    maxPlayerCount: number;
}

export interface HostSelectedOptions {
    roomId: string;
    colors: Array<DomainColor>,
    timer: number,
}

export interface GameState {
    boardController: BoardController;
    playerController: PlayerController;
    roomId: string;
    message: string | null,
    lastMovePos: number[][],
    soundType: SoundType,
}
