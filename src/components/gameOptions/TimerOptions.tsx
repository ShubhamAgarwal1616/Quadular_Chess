import {OptionButton} from "./OptionButton";
import {FC} from "react";
import styles from './TimerOptions.module.scss';
import {TimerOptionsInMinutes} from "../../classes/constants";

interface TimerOptionsProps {
    setTimer: (count: number) => void;
}

export const TimerOptions: FC<TimerOptionsProps> = ({setTimer}) => {
    return (
        <>
            <h2>Select Minutes Per Player</h2>
            <div className={styles.timerOptionsContainer}>
                {TimerOptionsInMinutes.map(option => (
                    <OptionButton
                        key={option}
                        handleClick={() => setTimer(option)}
                        className={styles.optionButton}
                    >
                        {option}
                    </OptionButton>
                ))}
            </div>
        </>
    )
}