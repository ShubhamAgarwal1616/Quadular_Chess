import styles from './Info.module.scss';
import {Player} from "../../classes/player/Player";
import {PlayerController} from "../../classes/player/PlayerController";
import {FC} from "react";
import {Message} from "./Message";
import {TimerDisplay} from "./TimerDisplay";

interface InfoProps {
    playerController: PlayerController;
    playerInTurn: Player | null;
    message: string | null;
    setMessage: (val: string | null) => void;
    suspendPlayer: (player: Player) => void;
}

export const Info: FC<InfoProps> = ({playerController, playerInTurn, setMessage, message, suspendPlayer}) => {
    return (
        <div className={styles.container}>
            <div className={styles.timers}>
                {playerController.initialPlayers.map(player => (
                    <TimerDisplay
                        key={player.name}
                        player={player}
                        playerInTurn={playerInTurn}
                        suspendPlayer={suspendPlayer}
                        inactive={!playerController.activePlayers.includes(player)}
                    />
                ))}
            </div>
            {message && <Message message={message} setMessage={setMessage} />}
        </div>
    )
}