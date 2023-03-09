import {useState} from "react";
import {QuadularBoard} from "../classes/QuadularBoard";
import {Cell} from "../classes/Cell";
import {BoardCell} from "./BoardCell";
import styles from "./GameController.module.scss";
import {MovesController} from "../classes/moves/MovesController";
import {Piece} from "../classes/pieces/Piece";
import {Player} from "../classes/player/Player";
import {PlayerController} from "../classes/player/PlayerController";
import {DomainColor} from "../classes/constants";
import {GameOptions} from "./gameOptions/GameOptions";

export const GameController = () => {
    const [newGame, setNewGame] = useState<boolean>(true)
    const [board, setBoard] = useState<QuadularBoard>(new QuadularBoard())
    const [boardState, setBoardState] = useState<Array<Array<Cell>>>([])
    const [domainsInGame, setDomainsInGame] = useState<Array<DomainColor>>([])
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    const [validMoves, setValidMoves] = useState<Array<Cell>>([])
    const [playerInTurn, setPlayerInTurn] = useState<Player | null>(null)
    const [playerController, setPlayerController] = useState<PlayerController>(new PlayerController([]))

    const clearSelection = () => {
        setValidMoves([]);
        setSelectedCell(null);
    }

    function predictMoves(cell: Cell, piece: Piece) {
        const validMoves = new MovesController().getValidMoves(piece, cell, board);
        setValidMoves(validMoves);
        setSelectedCell(cell);
    }

    const handleCellClick = (cell: Cell) => {
        if (cell.piece && playerInTurn?.canControlPiece(cell.piece)  && !selectedCell) {
            predictMoves(cell, cell.piece);
        } else if (selectedCell && !validMoves.includes(cell)) {
           clearSelection()
        } else if (selectedCell && validMoves.includes(cell)) {
            board.movePiece(selectedCell, cell);
            setPlayerInTurn(playerController.getNextPlayerInTurn());
            clearSelection()
        }
    }

    const setUpGame = (colors: Array<DomainColor>) => {
        setDomainsInGame(colors);
        board.setUpBoard(true, colors);
        setBoardState(board.cells);
        const playerController = new PlayerController(colors);
        setPlayerController(playerController);
        setPlayerInTurn(playerController.activePlayers[0]);
        setNewGame(false);
    }

    return (
        <div className={styles.gameContainer}>
            {newGame && <GameOptions setUpGame={setUpGame} />}
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