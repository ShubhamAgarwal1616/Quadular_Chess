import {OptionButton} from "./OptionButton";
import {FC} from "react";

interface HostingOptionsProps {
    setHosting: (count: boolean) => void;
}

export const HostingOptions: FC<HostingOptionsProps> = ({setHosting}) => {
    return (
        <>
            <OptionButton textOption handleClick={() => setHosting(true)}>{'Host New Game'}</OptionButton>
            <OptionButton textOption handleClick={() => setHosting(false)}>{'Join a Game'}</OptionButton>
        </>
    )
}