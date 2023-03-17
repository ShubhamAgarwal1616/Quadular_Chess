import {OptionButton} from "./OptionButton";
import styles from "./PawnPromotionOptions.module.scss";
import {PieceColor, PieceType} from "../../classes/constants";
import {Piece} from "../../classes/pieces/Piece";
import {FC} from "react";
import knight from "../../assets/images/knight.png";
import Bishop from "../../assets/images/bishop.png";
import Queen from "../../assets/images/queen.png";
import Image from 'next/image'

interface PawnPromotionOptionsProps {
    piece?: Piece | null;
    promotePawn: (type: PieceType) => void;
}

export const PawnPromotionOptions: FC<PawnPromotionOptionsProps> = ({piece, promotePawn}) => {
    const getColorClass = () => {
        switch (piece?.color) {
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

    return (
        <div className={styles.backdrop}>
            <h2>Promote To:</h2>
            {promotionOptions.map(option => (
                <OptionButton key={option.val} handleClick={() => promotePawn(option.val)}>
                    {option.icon}
                </OptionButton>
            ))}
        </div>
    )
}