import {QuadularBoard} from "./QuadularBoard";
import {DomainColor, DomainPlacement, MAX_PLAYER_COUNT} from "./constants";
import {getPieceColorForDomain} from "./helpers";
import {Cell} from "./Cell";

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

    movePiece(sourceCell: Cell, targetCell: Cell) {
        this.board.movePiece(sourceCell, targetCell)
    }
}