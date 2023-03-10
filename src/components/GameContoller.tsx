import {useMemo, useState} from "react";
import {Cell} from "../classes/Cell";
import styles from "./GameController.module.scss";
import {MovesController} from "../classes/moves/MovesController";
import {Piece} from "../classes/pieces/Piece";
import {Player} from "../classes/player/Player";
import {PlayerController} from "../classes/player/PlayerController";
import {DomainColor, PieceType} from "../classes/constants";
import {GameOptions} from "./gameOptions/GameOptions";
import {BoardController} from "../classes/BoardController";
import {PawnPromotionOptions} from "./gameOptions/PawnPromotionOptions";
import {Board} from "./Board";
import {Message} from "./Message";

export const GameController = () => {
    const [newGame, setNewGame] = useState<boolean>(true)
    const [boardState, setBoardState] = useState<Array<Array<Cell>>>([])
    const [domainsInGame, setDomainsInGame] = useState<Array<DomainColor>>([])
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    const [targetCell, setTargetCell] = useState<Cell | null>(null)
    const [validMoves, setValidMoves] = useState<Array<Cell>>([])
    const [playerInTurn, setPlayerInTurn] = useState<Player | null>(null)
    const [playerController, setPlayerController] = useState<PlayerController>(new PlayerController([]))
    const [message, setMessage] = useState<string | null>(null);
    const boardController = useMemo(() => new BoardController(), []);

    const clearSelection = () => {
        setValidMoves([]);
        setSelectedCell(null);
    }

    function predictMoves(cell: Cell, piece: Piece, player: Player) {
        const validMoves = new MovesController().getValidMoves(piece, cell, boardController.board, player.controlOverPieces, domainsInGame);
        setValidMoves(validMoves);
        setSelectedCell(cell);
    }

    const promotePawn = (type: PieceType) => {
        if (targetCell) {
            boardController.promotePawn(targetCell, type);
            setTargetCell(null);
        }
    }

    const rotatePlayerTurn = () => {
        if (playerController.getActivePlayerCount() === 1) {
            setMessage(`${playerInTurn?.name} Wins`)
            setPlayerInTurn(null);
        } else {
            setPlayerInTurn(playerController.getNextPlayerInTurn());
        }
    }

    const movePiece = (sourceCell: Cell, targetCell: Cell) => {
        if (targetCell.piece?.type === PieceType.King && playerController.originalPlayerInGame(targetCell.piece)) {
            if (boardController.canReplaceWithYoungKing(targetCell.piece))
                boardController.replaceWithYoungKing(targetCell.piece);
            else
                playerController.deactivatePlayer(targetCell.piece.color);
        }
        boardController.movePiece(sourceCell, targetCell);
        boardController.checkPrincePromotion(targetCell, domainsInGame, playerInTurn) && setMessage('Prince Promoted');
        if (boardController.canPromotePawn(targetCell, domainsInGame, playerInTurn)) {
            setTargetCell(targetCell);
        }
    }

    const handleCellClick = (cell: Cell) => {
        if (cell.piece && playerInTurn?.canControlPiece(cell.piece)  && !selectedCell) {
            predictMoves(cell, cell.piece, playerInTurn);
        } else if (selectedCell && !validMoves.includes(cell)) {
           clearSelection()
        } else if (selectedCell && validMoves.includes(cell)) {
            movePiece(selectedCell, cell);
            rotatePlayerTurn();
            clearSelection();
        }
    }

    const setUpGame = (colors: Array<DomainColor>) => {
        setDomainsInGame(colors);
        boardController.setUpBoard(true, colors);
        setBoardState(boardController.board.cells);
        const playerController = new PlayerController(colors);
        setPlayerController(playerController);
        setPlayerInTurn(playerController.activePlayers[0]);
        setNewGame(false);
    }

    return (
        <div className={styles.gameContainer}>
            {newGame && <GameOptions setUpGame={setUpGame} />}
            {targetCell && <PawnPromotionOptions piece={targetCell.piece} promotePawn={promotePawn} />}
            <Board
                boardState={boardState}
                selectedCell={selectedCell}
                handleCellClick={handleCellClick}
                validMoves={validMoves}
                playerInTurn={playerInTurn}
            />
            {message && <Message message={message} setMessage={setMessage} />}
        </div>
    )
}