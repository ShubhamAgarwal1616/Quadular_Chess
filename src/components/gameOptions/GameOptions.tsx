import styles from './GameOptions.module.scss';
import {FC, useState} from "react";
import {DomainColor} from "../../classes/constants";
import {PlayerCountOptions} from "./PlayerCountOptions";
import {ColorOptions} from "./ColorOptions";
import {TimerOptions} from "./TimerOptions";

interface GameOptionsProps {
    setUpGame: (colors: Array<DomainColor>, timer: number) => void;
}

export const GameOptions: FC<GameOptionsProps> = ({setUpGame}) => {
    const [playerCount, setPlayerCount] = useState<number>(0)
    const [colors, setColors] = useState<Array<DomainColor>>([])

    const selectPlayerCount = (count: number) => {
        setPlayerCount(count);
        if (count === 4)
            setColors([DomainColor.ORANGE, DomainColor.WHITE, DomainColor.YELLOW, DomainColor.BLACK]);
    }

    const addDomainColor = (color: DomainColor) => {
        const newColors = [...colors, color];
        setColors(newColors);
    }

    const setTimer = (timer: number) => {
        setUpGame(colors, timer);
    }

    return (
        <div className={styles.backdrop}>
            <h1 className={styles.heading}>Quadular</h1>
            {!playerCount && <PlayerCountOptions setPlayerCount={selectPlayerCount} />}
            {colors.length < playerCount && <ColorOptions count={playerCount} selectedColors={colors} addDomainColor={addDomainColor} />}
            {colors.length === playerCount && playerCount > 0 && <TimerOptions setTimer={setTimer} />}
        </div>
    )
}