import {OptionButton} from "./OptionButton";
import {FC} from "react";

interface PlayerCountOptionsProps {
    setPlayerCount: (count: number) => void;
}

export const PlayerCountOptions: FC<PlayerCountOptionsProps> = ({setPlayerCount}) => {
    const playerCountOptions = [2, 3, 4];
    return (
        <>
            <h2>Select Total Players</h2>
            {playerCountOptions.map(option => (
                <OptionButton key={option} handleClick={() => setPlayerCount(option)}>{option}</OptionButton>
            ))}
        </>
    )
}