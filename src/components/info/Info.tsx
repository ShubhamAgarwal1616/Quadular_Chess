import styles from './Info.module.scss';
import {Player} from "../../classes/player/Player";
import {PlayerController} from "../../classes/player/PlayerController";
import {FC} from "react";
import {Message} from "./Message";
import {TimerDisplay} from "./TimerDisplay";

interface InfoProps {
    playerController: PlayerController;
    playerInTurn: Player | null;
    message?: string | null;
    setMessage?: (val: string | null) => void;
    suspendPlayer: (player: Player) => void;
    displayTimer: boolean;
    startGame: boolean;
    promotionInProgress: boolean;
}

export const Info: FC<InfoProps> = ({
        playerController,
        playerInTurn,
        setMessage,
        message,
        suspendPlayer,
        displayTimer,
        startGame,
        promotionInProgress,
    }) => {
    const getTimerClass = (idx: number): string => {
        if (setMessage) return '';
        switch (idx) {
            case 0: return styles.timer_1;
            case 1: return styles.timer_2;
            case 2: return styles.timer_3;
            default: return styles.timer_4;
        }
    }

    return (
        <div className={styles.container}>
            {displayTimer && (
                <div className={styles.timers}>
                    {playerController.initialPlayers.map((player, idx) => (
                        <TimerDisplay
                            key={player.name}
                            player={player}
                            playerInTurn={playerInTurn}
                            suspendPlayer={suspendPlayer}
                            inactive={!playerController.activePlayers.includes(player)}
                            className={getTimerClass(idx)}
                            startGame={startGame}
                            promotionInProgress={promotionInProgress}
                        />
                    ))}
                </div>
            )}
            {message && setMessage && <Message startGame={startGame} message={message} setMessage={setMessage} />}
        </div>
    )
}