import {io, Socket as ClientSocket} from "socket.io-client";
import {
    CREATE_ROOM,
    CREATE_ROOM_ERROR,
    JOIN_ROOM,
    JOIN_ROOM_ERROR, MAP_PLAYER_TO_SOCKET, NEW_PLAYER_JOINED, OPTIONS_SELECTED,
    ROOM_CREATED,
    ROOM_JOINED, SHARE_GAME_STATE, SHARE_OPTIONS_SELECTED, UPDATE_GAME_STATE
} from "../../../pages/api/socket/constants";
import {GameState, HostSelectedOptions, RoomData} from "../../../pages/api/socket/types";
import {DomainColor} from "../constants";

export class SocketController {
    socket: ClientSocket | null = null
    roomId: string = ''
    isHost: boolean | null = false
    maxPlayerCount: number = 0
    optionsSelectedByHost: HostSelectedOptions | null = null
    forPlayerWithName: string | null = null;

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
                this.socket.on(MAP_PLAYER_TO_SOCKET, (name) => this.forPlayerWithName = name)
            }).catch(() => {
                reject('Connection failed')
            })
        })
    }

    joinRoom(data: RoomData, hosting: boolean | null): Promise<boolean> {
        this.isHost = hosting;
        this.roomId = data.roomId;
        return new Promise<boolean>((resolve, reject) => {
            this.socket?.emit(hosting ? CREATE_ROOM : JOIN_ROOM, data);
            this.socket?.on(hosting ? ROOM_CREATED : ROOM_JOINED, (playerCount) => {
                this.maxPlayerCount = playerCount;
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

    shareGameState(data: GameState) {
        this.socket?.emit(SHARE_GAME_STATE, data);
    }

    updateGameState(listener: (state: GameState) => void) {
        this.socket?.on(UPDATE_GAME_STATE, (state: GameState) => {
            listener(state);
        });
    }
}