import cx from "classnames";
import styles from "./ChessPiece.module.scss";
import {Cell} from "../classes/Cell";
import {PieceColor, PieceType} from "../classes/constants";
import {FC} from "react";

interface ChessPieceProps {
    cell: Cell;
}

export const ChessPiece: FC<ChessPieceProps> = ({cell}) => {
    const getPiece = (cell: Cell) => {
        switch (cell.piece?.type) {
            case PieceType.Pawn: return <>&#9823;</>
            case PieceType.Queen: return <>&#9819;</>
            case PieceType.Rook: return <>&#9820;</>
            case PieceType.Knight: return <>&#9822;</>
            case PieceType.King: return <>&#9818;</>
            case PieceType.Bishop: return <span className={styles.fasIcon}>&#xf43a;</span>
            case PieceType.Prince: return <span className={styles.fasIcon}>&#xf445;</span>
            case PieceType.YoungKing: return <span className={styles.fasIcon}>&#xf43f;</span>
        }
    }

    const getPieceColorClass = (cell: Cell) => {
        switch (cell.piece?.color) {
            case PieceColor.ORANGE: return styles.orangePiece
            case PieceColor.YELLOW: return styles.yellowPiece
            case PieceColor.BLACK: return styles.blackPiece
            case PieceColor.WHITE: return styles.whitePiece
        }
    }

    return (
        <div className={cx('fas', styles.pieceIcon, getPieceColorClass(cell))}>
            {getPiece(cell)}
        </div>
    )
}