import {FC} from "react";
import winnerImage from '../../assets/images/winner.gif';
import styles from './Message.module.scss';
import Image from 'next/image'

interface MessageProps {
    message: string;
    setMessage: (val: string | null) => void;
    startGame: boolean;
}
export const Message: FC<MessageProps> = ({message, setMessage, startGame}) => {
    if (!message.toLowerCase().includes('wins') && startGame) {
        setTimeout(() => {
            setMessage(null);
        }, 3000)
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>{message}</h2>
            {message.toLowerCase().includes('wins') && (
                <Image src={winnerImage} alt='winner'/>
            )}
        </div>
    )
}