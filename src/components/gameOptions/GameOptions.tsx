import styles from './GameOptions.module.scss';
import {FC, useState} from "react";
import {DomainColor, GameMode, MinRoomIdLength} from "../../classes/constants";
import {PlayerCountOptions} from "./PlayerCountOptions";
import {ColorOptions} from "./ColorOptions";
import {TimerOptions} from "./TimerOptions";
import {SocketController} from "../../classes/socket/SocketController";
import {HostingOptions} from "./HostingOptions";
import {ModeOptions} from "./ModeOptions";
import {JoinRoomScreen} from "./JoinRoomScreen";

interface GameOptionsProps {
    setUpGame: (colors: Array<DomainColor>, timer: number) => void;
    socketController: SocketController;
}

export const GameOptions: FC<GameOptionsProps> = ({setUpGame, socketController}) => {
    const [playerCount, setPlayerCount] = useState<number>(0)
    const [colors, setColors] = useState<Array<DomainColor>>([])
    const [timer, setTimer] = useState<number>(0);
    const [mode, setMode] = useState<GameMode | null>(null)
    const [hosting, setHosting] = useState<boolean | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const allDomainColors = [DomainColor.ORANGE, DomainColor.WHITE, DomainColor.YELLOW, DomainColor.BLACK];
    const selectPlayerCount = (count: number) => {
        setPlayerCount(count);
        if (count === 4)
            setColors(allDomainColors);
    }

    const addDomainColor = (color: DomainColor) => {
        const newColors = [...colors, color];
        setColors(newColors);
    }

    const setGameMode = (val: GameMode) => {
        if (val === GameMode.ONLINE) {
            socketController.connect().then(() => {
                setMode(val);
                setErrorMessage(null);
            }).catch(() => {
                setErrorMessage('Error occurred while connecting to server');
            })
        } else {
            setMode(val);
        }
    }

    const setTimerOption = (val: number) => {
        if (mode === GameMode.OFFLINE) {
            setUpGame(colors, val);
        } else {
            setTimer(val);
        }
    }

    const joinRoom = (roomId: string) => {
        if (roomId.trim().length < MinRoomIdLength) {
            setErrorMessage('Room Id should have minimum six characters');
        } else {
            setErrorMessage(null);
            socketController.joinRoom({roomId, maxPlayerCount: playerCount}, hosting).then(() => {
                //TODO: verify this
                hosting ? setUpGame(colors, timer) : setUpGame(allDomainColors, 0);
            }).catch((message) => {
                setErrorMessage(message)
            })
        }
    }

    const displayOfflineOptions = mode === GameMode.OFFLINE || hosting;
    const displayOnlineOptions = mode === GameMode.ONLINE;
    const displayJoinRoomScreen = timer > 0 || (mode === GameMode.ONLINE && hosting === false);

    return (
        <div className={styles.backdrop}>
            <h1 className={styles.heading}>Quadular</h1>
            {!playerCount && <PlayerCountOptions setPlayerCount={selectPlayerCount} />}
            {playerCount > 0 && !mode && <ModeOptions  setMode={setGameMode} errorMessage={errorMessage} />}
            {displayOnlineOptions && hosting === null && <HostingOptions  setHosting={setHosting}/>}
            {colors.length < playerCount && displayOfflineOptions && (
                <ColorOptions count={playerCount} selectedColors={colors} addDomainColor={addDomainColor} />
            )}
            {colors.length === playerCount && displayOfflineOptions && playerCount > 0 && timer === 0 && (
                <TimerOptions setTimer={setTimerOption} />
            )}
            {displayJoinRoomScreen && <JoinRoomScreen joinRoom={joinRoom} hosting={hosting} errorMessage={errorMessage} />}
        </div>
    )
}