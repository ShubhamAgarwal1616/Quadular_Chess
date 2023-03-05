import {Cell} from "../classes/Cell";
import {FC} from "react";
import styles from "./BoardCell.module.scss";
import cx from "classnames";
import {CellColor, DomainColor, PieceColor, ThroneSide} from "../classes/constants";
import {GradientBackground} from "./GradientBackground";
import {ChessPiece} from "./ChessPiece";
import {Piece} from "../classes/pieces/Piece";

interface CellProps {
    cell: Cell;
    selectedCell: Cell | null;
    handleCellClick: (cell: Cell) => void;
    validMoves: Array<Cell>;
}
export const BoardCell: FC<CellProps> = ({cell, selectedCell, handleCellClick, validMoves}) => {
    const getThroneSidesClass = (cell: Cell): string => {
        if(cell.domainColor === DomainColor.YELLOW) {
            return cell.throneSides === ThroneSide.Left ? styles.leftBottomThrone : styles.rightBottomThrone;
        }
        else if(cell.domainColor === DomainColor.BLACK) {
            return cell.throneSides === ThroneSide.Right ? styles.leftBottomThrone : styles.leftTopThrone;
        }
        else if(cell.domainColor === DomainColor.ORANGE) {
            return cell.throneSides === ThroneSide.Right ? styles.leftTopThrone : styles.rightTopThrone;
        }
        return cell.throneSides === ThroneSide.Right ? styles.rightTopThrone : styles.rightBottomThrone;
    }

    const getActivatedClass = (piece?: Piece | null): string => {
        switch (piece?.color) {
            case PieceColor.ORANGE: return styles.activatedOrangeCells;
            case PieceColor.WHITE: return styles.activatedWhiteCells;
            case PieceColor.YELLOW: return styles.activatedYellowCells;
            case PieceColor.BLACK: return styles.activatedBlackCells;
            default: return '';
        }
    }

    return (
        <button
            disabled={cell.color === CellColor.INACTIVE}
            onClick={() => handleCellClick(cell)}
            className={cx(styles.boardCell, {
                [styles.black]: cell.color === CellColor.BLACK,
                [styles.white]: cell.color === CellColor.WHITE || (cell.partOfThrone && !cell.throneSides),
                [getThroneSidesClass(cell)]: cell.throneSides,
                [getActivatedClass(selectedCell?.piece)]: cell === selectedCell || validMoves.includes(cell)
        })}>
            {cell.domainColor && (
                <GradientBackground cell={cell} />
            )}
            {cell.piece && (
                <ChessPiece cell={cell} />
            )}
        </button>
    )
}
