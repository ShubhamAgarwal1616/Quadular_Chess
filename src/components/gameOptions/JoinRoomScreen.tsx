import {FC, useState} from "react";
import {OptionButton} from "./OptionButton";
import styles from './JoinRoomScreen.module.scss';

interface JoinRoomScreenProps {
    joinRoom: (roomId: string) => void;
    hosting: boolean | null;
    errorMessage: string | null;
}

export const JoinRoomScreen: FC<JoinRoomScreenProps> = ({hosting, joinRoom, errorMessage}) => {
    const [roomId, setRoomId] = useState<string>('')
    return (
        <div className={styles.container}>
            <h2>Enter room id to join:</h2>
            <input
                className={styles.roomIdInput}
                type='text'
                onChange={(e) => setRoomId(e.currentTarget.value)}
            />
            <OptionButton textOption handleClick={() => joinRoom(roomId)} className={styles.submitButton}>
                {hosting ? 'Create Room' : 'Join Room'}
            </OptionButton>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    )
}