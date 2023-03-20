import {OptionButton} from "./OptionButton";
import styles from "./PawnPromotionOptions.module.scss";
import {GameMode, PieceColor, PieceType} from "../../classes/constants";
import {Piece} from "../../classes/pieces/Piece";
import {FC} from "react";
import knight from "../../assets/images/knight.png";
import Bishop from "../../assets/images/bishop.png";
import Queen from "../../assets/images/queen.png";
import Image from 'next/image'
import {SocketController} from "../../classes/socket/SocketController";
import {PlayerController} from "../../classes/player/PlayerController";

interface PawnPromotionOptionsProps {
    piece: Piece;
    promotePawn: (type: PieceType) => void;
    socketController: SocketController;
    mode: GameMode;
    playerController: PlayerController;
}

export const PawnPromotionOptions: FC<PawnPromotionOptionsProps> = ({
        piece,
        promotePawn,
        socketController,
        mode,
        playerController
    }) => {
    const getColorClass = () => {
        switch (piece.color) {
            case PieceColor.ORANGE: return styles.orange;
            case PieceColor.WHITE: return styles.white;
            case PieceColor.YELLOW: return styles.yellow;
            default: return styles.black;
        }
    }

    const promotionOptions = [
        {icon: <Image src={knight} className={getColorClass()} alt='knight'/>, val: PieceType.Knight},
        {icon: <Image src={Bishop} className={getColorClass()} alt='bishop'/>, val: PieceType.Bishop},
        {icon: <Image src={Queen} className={getColorClass()} alt='queen'/>, val: PieceType.Queen},
    ]

    const disableButton = (): boolean => {
        if (mode === GameMode.OFFLINE) return false;
        const player = playerController.getPlayerInControl(piece);
        return player?.name !== socketController.forPlayerWithName;
    }

    return (
        <div className={styles.backdrop}>
            <h2>Promote To:</h2>
            {promotionOptions.map(option => (
                <OptionButton disabled={disableButton()} key={option.val} handleClick={() => promotePawn(option.val)}>
                    {option.icon}
                </OptionButton>
            ))}
        </div>
    )
}