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
import {Info} from "./info/Info";

export const GameController = () => {
    const [newGame, setNewGame] = useState<boolean>(true)
    const [boardState, setBoardState] = useState<Array<Array<Cell>>>([])
    const [domainsInGame, setDomainsInGame] = useState<Array<DomainColor>>([])
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    const [targetCell, setTargetCell] = useState<Cell | null>(null)
    const [validMoves, setValidMoves] = useState<Array<Cell>>([])
    const [playerInTurn, setPlayerInTurn] = useState<Player | null>(null)
    const [playerController, setPlayerController] = useState<PlayerController>(new PlayerController([], 0))
    const [message, setMessage] = useState<string | null>(null);
    const boardController = useMemo(() => new BoardController(), []);
    const movesController = useMemo(() => new MovesController(), []);

    const clearSelection = () => {
        setValidMoves([]);
        setSelectedCell(null);
    }

    function predictMoves(cell: Cell, piece: Piece, player: Player) {
        const validMoves = movesController.getValidMoves(piece, cell, boardController.board, player.controlOverPieces, domainsInGame);
        setValidMoves(validMoves);
        setSelectedCell(cell);
    }

    const promotePawn = (type: PieceType) => {
        if (targetCell) {
            boardController.promotePawn(targetCell, type);
            setTargetCell(null);
        }
    }

    const rotatePlayerTurn = (player: Player) => {
        if (playerController.getActivePlayerCount() === 1) {
            setMessage(`${playerController.activePlayers[0].name} Wins`)
            setPlayerInTurn(null);
        } else {
            setPlayerInTurn(player);
        }
    }

    const checkForEnPassant = (sourceCell: Cell, targetCell: Cell, piece?: Piece | null) => {
        if (piece) {
            if (piece.type === PieceType.Pawn) {
                if (boardController.canBeEnPassant(piece, sourceCell, targetCell)) {
                    movesController.setInEnPassantMap(piece, targetCell, boardController.board.cells, playerInTurn?.controlOverPieces)
                } else if (boardController.isPlayingEnPassant(piece, sourceCell, targetCell)) {
                    const cell = movesController.getPiecePositionBeingEnPassant(piece, targetCell, boardController.board.cells);
                    if (cell) {
                        cell.setPiece(null);
                        setMessage('En Passant');
                    }
                }
            }
            movesController.deleteFromEnPassantMap(playerInTurn?.controlOverPieces);
        }
    }

    const movePiece = (sourceCell: Cell, targetCell: Cell) => {
        checkForEnPassant(sourceCell, targetCell, sourceCell.piece);
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
            rotatePlayerTurn(playerController.getNextPlayerInTurn());
            clearSelection();
        }
    }

    const setUpGame = (colors: Array<DomainColor>, timer: number) => {
        setDomainsInGame(colors);
        boardController.setUpBoard(true, colors);
        setBoardState(boardController.board.cells);
        const playerController = new PlayerController(colors, timer);
        setPlayerController(playerController);
        setPlayerInTurn(playerController.activePlayers[0]);
        setNewGame(false);
    }

    const suspendPlayer = (player: Player) => {
        const nextPlayer = playerController.getNextPlayerInTurn();
        playerController.suspendPlayer(player);
        setMessage(`${player.name} timer expired`);
        rotatePlayerTurn(nextPlayer);
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
            <Info
                playerController={playerController}
                playerInTurn={playerInTurn}
                message={message}
                setMessage={setMessage}
                suspendPlayer={suspendPlayer}
            />
        </div>
    )
}