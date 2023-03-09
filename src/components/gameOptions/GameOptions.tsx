import styles from './GameOptions.module.scss';
import {FC, useState} from "react";
import {DomainColor} from "../../classes/constants";
import {PlayerCountOptions} from "./PlayerCountOptions";
import {ColorOptions} from "./ColorOptions";

interface GameOptionsProps {
    setUpGame: (colors: Array<DomainColor>) => void;
}

export const GameOptions: FC<GameOptionsProps> = ({setUpGame}) => {
    const [playerCount, setPlayerCount] = useState<number>(0)
    const [colors, setColors] = useState<Array<DomainColor>>([])

    const selectPlayerCount = (count: number) => {
        if (count === 4) setUpGame([DomainColor.ORANGE, DomainColor.WHITE, DomainColor.YELLOW, DomainColor.BLACK]);
        setPlayerCount(count);
    }

    const addDomainColor = (color: DomainColor) => {
        const newColors = [...colors, color];
        setColors(newColors);
        if (newColors.length === playerCount) {
            setUpGame(newColors);
        }
    }

    return (
        <div className={styles.backdrop}>
            <h1 className={styles.heading}>Quadular</h1>
            {!playerCount && <PlayerCountOptions setPlayerCount={selectPlayerCount} />}
            {playerCount > 0 && <ColorOptions selectedColors={colors} addDomainColor={addDomainColor} />}
        </div>
    )
}