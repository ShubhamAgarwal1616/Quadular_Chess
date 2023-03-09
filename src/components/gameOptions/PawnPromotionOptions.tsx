import {OptionButton} from "./OptionButton";
import styles from "./PawnPromotionOptions.module.scss";
import cx from "classnames";
import {PieceColor, PieceType} from "../../classes/constants";
import {Piece} from "../../classes/pieces/Piece";
import {FC} from "react";

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
        {icon: <span className={cx(getColorClass())}>&#9822;</span>, val: PieceType.Knight},
        {icon: <span className={cx('fas', styles.fasIcon, getColorClass())}>&#xf43a;</span>, val: PieceType.Bishop},
        {icon: <span className={cx(getColorClass())}>&#9819;</span>, val: PieceType.Queen},
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