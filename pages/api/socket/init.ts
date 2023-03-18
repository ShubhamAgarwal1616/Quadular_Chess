import {Server} from 'socket.io'
import {NextApiRequest} from "next";
import {CREATE_ROOM, JOIN_ROOM} from "./constants";
import {JoinRoom} from "./JoinRoom";
import {RoomData, NextApiResponseWithSocket} from "./types";
import {CreateRoom} from "./CreateRoom";

const SocketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
    if (res.socket.server.io) {
        console.log('Socket is already running');
    } else {
        console.log('Socket is initializing');
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on('connection', (socket) => {
            console.log('connection completed for socket ', socket.id)

            socket.on(CREATE_ROOM, (data: RoomData) => CreateRoom(data, io, socket))
            socket.on(JOIN_ROOM, (data: RoomData) => JoinRoom(data, io, socket))
            socket.on('disconnect', () => console.log('socket disconnected', socket.id))
        })
    }
    res.end()
}

export default SocketHandler