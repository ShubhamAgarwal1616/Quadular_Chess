import {Cell} from "../classes/Cell";
import {FC} from "react";
import styles from "./BoardCell.module.scss";
import cx from "classnames";
import {CellColor, DomainPlacement, PieceColor, ThroneSide} from "../classes/constants";
import {GradientBackground} from "./GradientBackground";
import {ChessPiece} from "./ChessPiece";
import {Piece} from "../classes/pieces/Piece";
import {Player} from "../classes/player/Player";

interface CellProps {
    cell: Cell;
    selectedCell: Cell | null;
    handleCellClick: (cell: Cell) => void;
    validMoves: Array<Cell>;
    playerInTurn: Player | null;
    startGame: boolean;
    lastMovePos: number[][];
    activeSocket: () => boolean;
}
export const BoardCell: FC<CellProps> = ({
        cell,
        selectedCell,
        handleCellClick,
        validMoves,
        playerInTurn,
        startGame,
        lastMovePos,
        activeSocket,
    }) => {
    const getThroneSidesClass = (cell: Cell): string => {
        if(cell.domainPlacement === DomainPlacement.Top) {
            return cell.throneSides === ThroneSide.Left ? styles.leftBottomThrone : styles.rightBottomThrone;
        }
        else if(cell.domainPlacement === DomainPlacement.Right) {
            return cell.throneSides === ThroneSide.Right ? styles.leftBottomThrone : styles.leftTopThrone;
        }
        else if(cell.domainPlacement === DomainPlacement.Bottom) {
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

    const belongsToLastMove = (): boolean => lastMovePos.some(pos => pos[0] === cell.row && pos[1] === cell.col);

    return (
        <button
            disabled={cell.color === CellColor.INACTIVE || !startGame && !activeSocket()}
            onClick={() => handleCellClick(cell)}
            className={cx(styles.boardCell, {
                [styles.black]: cell.color === CellColor.BLACK,
                [styles.white]: cell.color === CellColor.WHITE || (cell.partOfThrone && !cell.throneSides),
                [getThroneSidesClass(cell)]: cell.throneSides,
                [getActivatedClass(selectedCell?.piece)]: cell === selectedCell || validMoves.includes(cell),
                [styles.activePieces]: startGame && !selectedCell && playerInTurn?.canControlPiece(cell.piece) && activeSocket(),
        })}>
            {(cell.domainColor || belongsToLastMove()) && (
                <GradientBackground cell={cell} lastMovePos={belongsToLastMove()} />
            )}
            {cell.piece && (
                <ChessPiece cell={cell} />
            )}
        </button>
    )
}
