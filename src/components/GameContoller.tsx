import {useMemo, useState} from "react";
import {Cell} from "../classes/Cell";
import styles from "./GameController.module.scss";
import {MovesController} from "../classes/moves/MovesController";
import {Piece} from "../classes/pieces/Piece";
import {Player} from "../classes/player/Player";
import {PlayerController} from "../classes/player/PlayerController";
import {DomainColor, GameMode, PieceType, SoundType} from "../classes/constants";
import {GameOptions} from "./gameOptions/GameOptions";
import {BoardController} from "../classes/BoardController";
import {PawnPromotionOptions} from "./gameOptions/PawnPromotionOptions";
import {Board} from "./Board";
import {Info} from "./info/Info";
import {useWindowSize} from "../hooks/useWindowSize";
import {SoundController} from "../classes/SoundController";
import {SocketController} from "../classes/socket/SocketController";
import {GameState} from "../../pages/api/socket/types";

export const GameController = () => {
    const windowWidth = useWindowSize();
    const [newGame, setNewGame] = useState<boolean>(true)
    const [mode, setMode] = useState<GameMode>(GameMode.OFFLINE)
    const [lastMovePos, setLastMovePos] = useState<number[][]>([])
    const [boardState, setBoardState] = useState<Array<Array<Cell>>>([])
    const [domainsInGame, setDomainsInGame] = useState<Array<DomainColor>>([])
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    const [targetCell, setTargetCell] = useState<Cell | null>(null)
    const [validMoves, setValidMoves] = useState<Array<Cell>>([])
    const [playerInTurn, setPlayerInTurn] = useState<Player | null>(null)
    const [playerController, setPlayerController] = useState<PlayerController>(new PlayerController([], 0))
    const [message, setMessage] = useState<string | null>(null);
    const [startGame, setStartGame] = useState<boolean>(false);
    const [boardController, setBoardController] = useState<BoardController>(new BoardController());
    const movesController = useMemo(() => new MovesController(), []);
    const socketController = useMemo(() => new SocketController(), []);
    let infoMessage = '';
    let soundType: SoundType = SoundType.MOVE;

    const getGameState = (lastMovePos: number[][]): GameState => ({
        boardController,
        playerController,
        roomId: socketController.roomId,
        message: infoMessage,
        lastMovePos: lastMovePos,
        soundType,
    });

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
            infoMessage = 'Pawn Promoted'
            setMessage(infoMessage)
            socketController.shareGameState(getGameState(lastMovePos));
        }
    }

    const rotatePlayerTurn = (player: Player, lastMovePos: number[][]) => {
        if (playerController.getActivePlayerCount() === 1) {
            infoMessage = `${playerController.activePlayers[0].name} Wins`;
            soundType = SoundType.WINNING;
            setMessage(infoMessage)
            setPlayerInTurn(null);
            socketController.shareGameState(getGameState(lastMovePos))
            SoundController.playWinningSound();
        } else {
            socketController.shareGameState(getGameState(lastMovePos))
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
                        infoMessage = 'En Passant';
                        setMessage(infoMessage);
                    }
                    soundType = SoundType.CAPTURE;
                    SoundController.playCaptureSound();
                }
            }
            movesController.deleteFromEnPassantMap(playerInTurn?.controlOverPieces);
        }
    }

    function checkKingKill(targetCell: Cell) {
        if (targetCell.piece?.type === PieceType.King && playerController.originalPlayerInGame(targetCell.piece)) {
            if (boardController.canReplaceWithYoungKing(targetCell.piece))
                boardController.replaceWithYoungKing(targetCell.piece);
            else
                playerController.deactivatePlayer(targetCell.piece.color);
        }
    }

    const movePiece = (sourceCell: Cell, targetCell: Cell) => {
        checkForEnPassant(sourceCell, targetCell, sourceCell.piece);
        checkKingKill(targetCell);
        if (playerController.activePlayers.length > 1) {
            soundType = targetCell.piece ? SoundType.CAPTURE : SoundType.MOVE;
            targetCell.piece ? SoundController.playCaptureSound() : SoundController.playMoveSound();
        }
        boardController.movePiece(sourceCell, targetCell);
        if (boardController.checkPrincePromotion(targetCell, domainsInGame, playerInTurn)) {
            infoMessage = 'Prince Promoted';
            setMessage(infoMessage);
        }
        if (boardController.canPromotePawn(targetCell, domainsInGame, playerInTurn)) {
            setTargetCell(targetCell);
        }
    }

    const activeSocket = (): boolean => {
        if (mode === GameMode.ONLINE) return playerInTurn?.name === socketController.forPlayerWithName;
        return true;
    }

    const handleCellClick = (cell: Cell) => {
        if (cell.piece && playerInTurn?.canControlPiece(cell.piece) && activeSocket() && !selectedCell) {
            predictMoves(cell, cell.piece, playerInTurn);
        } else if (selectedCell && !validMoves.includes(cell)) {
           clearSelection()
        } else if (selectedCell && validMoves.includes(cell)) {
            movePiece(selectedCell, cell);
            const lastMovePos = [[selectedCell.row, selectedCell.col], [cell.row, cell.col]];
            setLastMovePos(lastMovePos);
            rotatePlayerTurn(playerController.getNextPlayerInTurn(), lastMovePos);
            clearSelection();
        }
    }

    const setUpBoardAndPlayers = (colors: Array<DomainColor>, timer: number) => {
        setDomainsInGame(colors);
        boardController.setUpBoard(true, colors);
        setBoardState(boardController.board.cells);
        SoundController.playSetUpSound();
        const playerController = new PlayerController(colors, timer);
        setPlayerController(playerController);
        setPlayerInTurn(playerController.activePlayers[0]);
        setNewGame(false);
    }

    const updateGameState = (state: GameState) => {
        SoundController.playSound(state.soundType);
        const newBoardController = boardController.updateStateFromJson(state.boardController);
        const newPlayerController = playerController.updateStateFromJson(state.playerController);
        setPlayerController(newPlayerController);
        if (newPlayerController.activePlayers.length === 1) {
            setPlayerInTurn(null);
        } else {
            setPlayerInTurn(newPlayerController.activePlayers[0]);
        }
        setBoardController(newBoardController)
        setBoardState(newBoardController.board.cells);
        setLastMovePos(state.lastMovePos);
        setMessage(state.message);
    }

    const setUpGame = (colors: Array<DomainColor>, timer: number, mode: GameMode, hosting: boolean) => {
        setMode(mode);
        if(mode === GameMode.OFFLINE) {
            setUpBoardAndPlayers(colors, timer);
            setStartGame(true)
        } else if (mode === GameMode.ONLINE) {
            if (hosting) {
                setUpBoardAndPlayers(colors, timer);
            } else {
                socketController.optionsSelection(setUpBoardAndPlayers);
            }
            socketController.updateGameState(updateGameState)
        }
    }

    const suspendPlayer = (player: Player) => {
        const nextPlayer = playerController.getNextPlayerInTurn();
        playerController.suspendPlayer(player);
        soundType = SoundType.TIMER_EXPIRED;
        SoundController.playTimerExpireSound();
        rotatePlayerTurn(nextPlayer, lastMovePos);
        if (playerController.activePlayers.length > 1) SoundController.playTimerExpireSound();
    }

    const playerJoinedListener = (playersInGame: number) => {
        setMessage(`Players joined: ${playersInGame} \n\n waiting for other players...`);
        if (playersInGame === socketController.maxPlayerCount) {
            setMessage(null);
            setStartGame(true);
        }
    }

    return (
        <div className={styles.gameContainer}>
            {newGame && (
                <GameOptions
                    setUpGame={setUpGame}
                    socketController={socketController}
                    playerJoinedListener={playerJoinedListener}
                />
            )}
            {targetCell && <PawnPromotionOptions piece={targetCell.piece} promotePawn={promotePawn} />}
            <Board
                boardState={boardState}
                selectedCell={selectedCell}
                handleCellClick={handleCellClick}
                validMoves={validMoves}
                playerInTurn={playerInTurn}
                playerController={playerController}
                suspendPlayer={suspendPlayer}
                windowWidth={windowWidth}
                startGame={startGame}
                lastMovePos={lastMovePos}
                promotionInProgress={targetCell !== null}
                activeSocket={activeSocket}
            />
            <Info
                playerController={playerController}
                playerInTurn={playerInTurn}
                message={message}
                setMessage={setMessage}
                suspendPlayer={suspendPlayer}
                displayTimer={windowWidth > 1112}
                startGame={startGame}
                promotionInProgress={targetCell !== null}
            />
        </div>
    )
}