import {Server as HTTPServer} from "http";
import {Server} from "socket.io";
import {Socket as NetSocket} from "net";
import {NextApiResponse} from "next";

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