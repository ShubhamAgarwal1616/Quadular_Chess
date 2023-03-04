import {Cell} from "../classes/Cell";
import {FC} from "react";
import styles from "./BoardCell.module.scss";
import cx from "classnames";
import {CellColor, PieceColor, PieceType} from "../classes/constants";
import {GradientBackground} from "./GradientBackground";

interface CellProps {
    cell: Cell;
}
export const BoardCell: FC<CellProps> = ({cell}) => {
    const getPiece = (cell: Cell) => {
        switch (cell.piece?.type) {
            case PieceType.Pawn: return <>&#9823;</>
            case PieceType.Queen: return <>&#9819;</>
            case PieceType.Rook: return <>&#9820;</>
            case PieceType.Knight: return <>&#9822;</>
            case PieceType.King: return <>&#9818;</>
            case PieceType.Bishop: return <span className={styles.fasIcon}>&#xf43a;</span>
            case PieceType.Prince: return <span className={styles.fasIcon}>&#xf445;</span>
            // case PieceType.YoungKing: return <>&#xf43f;</>
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
        <button
            disabled={cell.color === CellColor.INACTIVE}
            onClick={() => {console.log('button clicked', cell.row, cell.col)}}
            className={cx(styles.boardCell, {
                [styles.black]: cell.color === CellColor.BLACK,
                [styles.white]: cell.color === CellColor.WHITE && !cell.partOfThrone,
        })}>
            {cell.gradientColor && (
                <GradientBackground cell={cell} />
            )}
            {cell.piece && (
                <div className={cx('fas', styles.pieceIcon, getPieceColorClass(cell))}>
                    {getPiece(cell)}
                </div>
            )}
        </button>
    )
}
