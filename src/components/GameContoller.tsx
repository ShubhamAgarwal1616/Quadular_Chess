import {useEffect, useState} from "react";
import {QuadularBoard} from "../classes/QuadularBoard";
import {Cell} from "../classes/Cell";
import {BoardCell} from "./BoardCell";
import styles from "./GameController.module.scss";
import {MovesController} from "../classes/moves/MovesController";

export const GameController = () => {
    const [board, setBoard] = useState<QuadularBoard>(new QuadularBoard())
    const [boardState, setBoardState] = useState<Array<Array<Cell>>>([])
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    const [validMoves, setValidMoves] = useState<Array<Cell>>([])

    const handleCellClick = (cell: Cell) => {
        if (cell.piece && !selectedCell) {
            const validMoves = new MovesController().getValidMoves(cell.piece, cell, board);
            setValidMoves(validMoves);
            setSelectedCell(cell);
        } else if (selectedCell && !validMoves.includes(cell)) {
            setValidMoves([]);
            setSelectedCell(null);
        } else if (selectedCell && validMoves.includes(cell)) {
            board.movePiece(selectedCell, cell);
            setValidMoves([]);
            setSelectedCell(null);
        }
    }

    useEffect(() => {
        setBoardState(board.cells)
    }, [board])

    return (
        <div className={styles.board}>
            {boardState.map(row => {
                return row.map(cell => (
                    <BoardCell
                        key={`${cell.row}-${cell.col}`}
                        cell={cell}
                        selectedCell={selectedCell}
                        handleCellClick={handleCellClick}
                        validMoves={validMoves}
                    />
                ))
            })}
        </div>
    )
}