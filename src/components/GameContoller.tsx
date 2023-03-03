import {useEffect, useState} from "react";
import {QuadularBoard} from "../classes/QuadularBoard";
import {Cell} from "../classes/Cell";
import {BoardCell} from "./BoardCell";
import styles from "./GameController.module.scss";

export const GameController = () => {
    const [board, setBoard] = useState<QuadularBoard | null>(null)
    const [boardState, setBoardState] = useState<Array<Array<Cell>>>([])

    useEffect(() => {
        const board = new QuadularBoard();
        setBoard(board);
        setBoardState(board.cells)
    }, [])

    return (
        <div className={styles.board}>
            {boardState.map(row => {
                return row.map(cell => <BoardCell cell={cell} />)
            })}
        </div>
    )
}