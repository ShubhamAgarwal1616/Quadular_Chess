import {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../../classes/player/Player";
import styles from './TimerDisplay.module.scss';
import cx from "classnames";

interface TimerProps {
    player: Player;
    playerInTurn: Player | null;
    suspendPlayer: (player: Player) => void;
    inactive: boolean;
    className: string;
    startGame: boolean;
    promotionInProgress: boolean;
}

export const TimerDisplay: FC<TimerProps> = ({
        player,
        playerInTurn,
        suspendPlayer,
        inactive,
        className,
        startGame,
        promotionInProgress,
    }) => {
    const ref = useRef<NodeJS.Timer | null>(null);
    const [timer, setTimer] = useState('00:00');

    const setTime = () => {
        const minutes = Math.floor(player.timer.timerInSeconds / 60);
        const seconds = player.timer.timerInSeconds % 60;
        setTimer(`${minutes}:${seconds}`);
    }

    const updateTime = () => {
        if (player === playerInTurn) {
            player.timer.decrementTime();
            if (player.timer.timerInSeconds === 0) {
                suspendPlayer(player);
                ref.current && clearInterval(ref.current);
            }
            setTime();
        }
    }

    useEffect(() => {
        setTime();
    }, [])

    useEffect(() => {
        if (playerInTurn && playerInTurn.timer.timerInSeconds > 0 && startGame && !promotionInProgress) {
            ref.current = setInterval(() => {
                updateTime();
            }, 1000);
        }
        if (player !== playerInTurn && ref.current) {
            clearInterval(ref.current);
        }
        return () => {
            ref.current && clearInterval(ref.current)
        };
    }, [player, playerInTurn, startGame, promotionInProgress]);

    return (
        <div className={cx(styles.timerInfo, className, {
            [styles.activeTimer]: player === playerInTurn,
            [styles.inActiveTimer]: inactive,
        })}>
            <h2>{player.name}</h2>
            <h2>{timer}</h2>
        </div>
    )
}
