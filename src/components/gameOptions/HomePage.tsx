import {OptionButton} from "./OptionButton";
import {FC, useState} from "react";
import {Rules} from "./Rules";

interface HomePageProps {
    setPlayGame: (val: boolean) => void;
}

export const HomePage: FC<HomePageProps> = ({setPlayGame}) => {
    const [showRules, setShowRules] = useState(false);
    return (
        <>
            {!showRules ? (
                <>
                    <OptionButton textOption handleClick={() => setPlayGame(true)}>{'Play'}</OptionButton>
                    <OptionButton textOption handleClick={() => setShowRules(true)}>{'Rules'}</OptionButton>
                </>
            ) : (
                <Rules setShowRules={setShowRules} />
            )}
        </>
    )
}