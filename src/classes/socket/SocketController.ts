import {io, Socket as ClientSocket} from "socket.io-client";
import {
    CREATE_ROOM,
    CREATE_ROOM_ERROR,
    JOIN_ROOM,
    JOIN_ROOM_ERROR, NEW_PLAYER_JOINED, OPTIONS_SELECTED,
    ROOM_CREATED,
    ROOM_JOINED, SHARE_OPTIONS_SELECTED
} from "../../../pages/api/socket/constants";
import {HostSelectedOptions, RoomData} from "../../../pages/api/socket/types";
import {DomainColor} from "../constants";

export class SocketController {
    socket: ClientSocket | null = null
    roomId: string = ''
    isHost: boolean | null = false
    maxPlayerCount: number = 0
    optionsSelectedByHost: HostSelectedOptions | null = null

    setOptionsSelectedByHost(val: HostSelectedOptions | null) {
        this.optionsSelectedByHost = val;
    }

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
        this.maxPlayerCount = data.maxPlayerCount;
        this.isHost = hosting;
        this.roomId = data.roomId;
        return new Promise<boolean>((resolve, reject) => {
            this.socket?.emit(hosting ? CREATE_ROOM : JOIN_ROOM, data);
            this.socket?.on(hosting ? ROOM_CREATED : ROOM_JOINED, () => {
                resolve(true)
            });
            this.socket?.on(hosting ? CREATE_ROOM_ERROR : JOIN_ROOM_ERROR, ({errorMessage}) => {
                this.isHost = false;
                this.roomId = '';
                reject(errorMessage)
            });
        })
    }

    playerJoined(listener: (playersInGame: number) => void) {
        this.socket?.on(NEW_PLAYER_JOINED, ({playersInGame}) => {
            listener(playersInGame);
            if (this.isHost && playersInGame > 1 && this.optionsSelectedByHost) {
                this.socket?.emit(SHARE_OPTIONS_SELECTED, this.optionsSelectedByHost)
            }
        });
    }

    optionsSelection(listener: (colors: Array<DomainColor>, timer: number) => void) {
        this.socket?.on(OPTIONS_SELECTED, ({colors, timer}) => {
            listener(colors, timer);
        });
    }
}