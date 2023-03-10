import {FC} from "react";
import winnerImage from '../../assets/images/winner.gif';
import styles from './Message.module.scss';

interface MessageProps {
    message: string;
    setMessage: (val: string | null) => void;
}
export const Message: FC<MessageProps> = ({message, setMessage}) => {
    if (!message.toLowerCase().includes('wins')) {
        setTimeout(() => {
            setMessage(null);
        }, 3000)
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>{message}</h2>
            {message.toLowerCase().includes('wins') && (
                <img src={winnerImage}/>
            )}
        </div>
    )
}