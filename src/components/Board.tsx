import {Cell} from "../classes/Cell";
import {Player} from "../classes/player/Player";
import {FC} from "react";
import styles from "./Board.module.scss";
import {BoardCell} from "./BoardCell";
import {Info} from "./info/Info";
import {PlayerController} from "../classes/player/PlayerController";

interface BoardProps {
    boardState: Array<Array<Cell>>;
    selectedCell: Cell | null;
    handleCellClick: (cell: Cell) => void;
    validMoves: Array<Cell>;
    playerInTurn: Player | null;
    playerController: PlayerController;
    suspendPlayer: (player: Player) => void;
    windowWidth: number;
}

export const Board: FC<BoardProps> = ({
        boardState,
        selectedCell,
        handleCellClick,
        validMoves,
        playerInTurn,
        playerController,
        suspendPlayer,
        windowWidth,
    }) => {
    return (
        <div className={styles.boardContainer}>
            {windowWidth <= 1112 && (
                <Info
                    playerController={playerController}
                    playerInTurn={playerInTurn}
                    suspendPlayer={suspendPlayer}
                    displayTimer={windowWidth <= 1112}
                />
            )}
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
        </div>
    )
}