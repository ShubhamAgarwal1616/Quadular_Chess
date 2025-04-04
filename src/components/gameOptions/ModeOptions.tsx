import {OptionButton} from "./OptionButton";
import {FC} from "react";
import {GameMode} from "../../classes/constants";

interface ModeOptionsProps {
    setMode: (mode: GameMode) => void;
    errorMessage: string | null;
}

export const ModeOptions: FC<ModeOptionsProps> = ({setMode, errorMessage}) => {
    return (
        <>
            <h2>Select Mode</h2>
            <OptionButton textOption handleClick={() => setMode(GameMode.ONLINE)}>{'Remote'}</OptionButton>
            <OptionButton textOption handleClick={() => setMode(GameMode.OFFLINE)}>{'NearBy'}</OptionButton>
            {errorMessage && <div>{errorMessage}</div>}
        </>
    )
}