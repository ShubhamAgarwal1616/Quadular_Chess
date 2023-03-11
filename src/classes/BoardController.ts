import {QuadularBoard} from "./QuadularBoard";
import {DomainColor, DomainPlacement, MAX_PLAYER_COUNT, PieceType} from "./constants";
import {getPieceColorForDomain} from "./helpers";
import {Cell} from "./Cell";
import {Player} from "./player/Player";
import {Piece} from "./pieces/Piece";
import {Pawn} from "./pieces/Pawn";

export class BoardController {
    board: QuadularBoard = new QuadularBoard();

    private activateDomain(domainColor: DomainColor, placement: DomainPlacement, withPieces: boolean) {
        const pieceColor = getPieceColorForDomain(domainColor);
        switch (placement) {
            case DomainPlacement.Bottom: return this.board.initializeBottomDomain(domainColor, pieceColor, withPieces);
            case DomainPlacement.Left: return this.board.initializeLeftDomain(domainColor, pieceColor, withPieces);
            case DomainPlacement.Top: return this.board.initializeTopDomain(domainColor, pieceColor, withPieces);
            default: return this.board.initializeRightDomain(domainColor, pieceColor, withPieces);
        }
    }

    private static getDomainPlacementsBasedOnCount(count: number): Array<DomainPlacement> {
        switch (count) {
            case 2: return [DomainPlacement.Bottom, DomainPlacement.Top];
            case 3: return [DomainPlacement.Bottom, DomainPlacement.Left, DomainPlacement.Right];
            default: return [DomainPlacement.Bottom, DomainPlacement.Left, DomainPlacement.Top, DomainPlacement.Right];
        }
    }

    setUpBoard(withPieces: boolean, domainsInGame: Array<DomainColor>) {
        const placements = this.setUpActiveDomains(domainsInGame);
        this.setUpInactiveDomains(domainsInGame, placements);
    }

    private setUpInactiveDomains(domainsInGame: Array<DomainColor>, placements: Array<DomainPlacement>) {
        const allDomainColors = [DomainColor.ORANGE, DomainColor.WHITE, DomainColor.YELLOW, DomainColor.BLACK];
        const domainsNotInGame = allDomainColors.filter(color => !domainsInGame.includes(color))
        const remainingPlacements = BoardController.getDomainPlacementsBasedOnCount(MAX_PLAYER_COUNT)
            .filter(placement => !placements.includes(placement))
        domainsNotInGame.forEach((domainColor, index) => {
            this.activateDomain(domainColor, remainingPlacements[index], false);
        })
    }

    private setUpActiveDomains(domainsInGame: Array<DomainColor>) {
        const placements = BoardController.getDomainPlacementsBasedOnCount(domainsInGame.length);
        domainsInGame.forEach((domainColor, index) => {
            this.activateDomain(domainColor, placements[index], true);
        })
        return placements;
    }

    private static canApplyPromotion(cell: Cell, domainsInGame: Array<DomainColor>, player?: Player | null): boolean | null | undefined {
        return cell.domainColor && domainsInGame.includes(cell.domainColor) && cell.piece &&
            player?.originalDomainColor !== cell.domainColor && cell.piece.color === player?.originalPieceColor
    }

    getVerticalDistance(sourceCell: Cell, targetCell: Cell): number {
        return Math.abs(sourceCell.row - targetCell.row + sourceCell.col - targetCell.col);
    }

    checkPrincePromotion(cell: Cell, domainsInGame: Array<DomainColor>, player?: Player | null): boolean | undefined{
        if (cell.piece?.type === PieceType.Prince && BoardController.canApplyPromotion(cell, domainsInGame, player)) {
            this.board.promotePrince(cell, cell.piece);
            return true;
        }
    }

    canPromotePawn(cell: Cell, domainsInGame: Array<DomainColor>, player?: Player | null): boolean | null | undefined {
        return cell.piece?.type === PieceType.Pawn && BoardController.canApplyPromotion(cell, domainsInGame, player)
    }

    canReplaceWithYoungKing(piece: Piece) {
        return this.board.getYoungKingCellForReplacement(piece);
    }

    replaceWithYoungKing(piece: Piece) {
        this.board.getYoungKingCellForReplacement(piece)?.setPiece(piece);
    }

    movePiece(sourceCell: Cell, targetCell: Cell) {
        this.board.movePiece(sourceCell, targetCell)
        // TODO: implement king killing
    }

    promotePawn(cell: Cell, type: PieceType) {
        cell.piece && this.board.promotePawn(cell, cell.piece, type);
    }

    canBeEnPassant(piece: Piece, sourceCell: Cell, targetCell: Cell) {
        return piece instanceof Pawn && !piece.hasMovedBefore && this.getVerticalDistance(sourceCell, targetCell) === 2;
    }

    isPlayingEnPassant(piece: Piece, sourceCell: Cell, targetCell: Cell) {
        return piece.type === PieceType.Pawn && !targetCell.piece &&
            sourceCell.row !== targetCell.row && sourceCell.col !== targetCell.col
    }
}