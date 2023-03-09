import {Cell} from "../classes/Cell";
import {Player} from "../classes/player/Player";
import {FC} from "react";
import styles from "./Board.module.scss";
import {BoardCell} from "./BoardCell";

interface BoardProps {
    boardState: Array<Array<Cell>>;
    selectedCell: Cell | null;
    handleCellClick: (cell: Cell) => void;
    validMoves: Array<Cell>;
    playerInTurn: Player | null;
}

export const Board: FC<BoardProps> = ({boardState, selectedCell, handleCellClick, validMoves, playerInTurn}) => {
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
                        playerInTurn={playerInTurn}
                    />
                ))
            })}
        </div>
    )
}