import {Cell} from "./Cell";
import {
    BOARD_SIZE,
    BottomDomainInitialPos,
    DomainColor,
    DomainPlacement,
    LeftDomainInitialPos, MAX_PLAYER_COUNT,
    PieceColor,
    PieceType,
    RightDomainInitialPos,
    ThroneSide,
    TopDomainInitialPos
} from "./constants";
import {PieceFactory} from "./pieces/PieceFactory";
import {Pawn} from "./pieces/Pawn";
import {getPieceColorForDomain} from "./helpers";

export class QuadularBoard {
    cells: Array<Array<Cell>> = [];

    constructor() {
        this.setUpBoard(false, []);
    }

    private initializeDomain(
        withPieces: boolean,
        initialPos: {[key in PieceType]: number[][]},
        gradientColor: DomainColor,
        pieceColor: PieceColor,
        domainPlacement: DomainPlacement,
    ) {
        for (let type in initialPos) {
            const pieceType = type as PieceType;
            initialPos[pieceType].forEach(pos => {
                const cell = this.cells[pos[0]][pos[1]];
                cell.setDomainColor(gradientColor);
                cell.setDomainPlacement(domainPlacement);
                if (withPieces) {
                    cell.setPiece(new PieceFactory().getPieceObject(pieceType, pieceColor, domainPlacement, cell.color));
                }
            })
        }
    }

    private initializeBottomDomain(domainColor: DomainColor, pieceColor: PieceColor, withPieces: boolean) {
        this.initializeDomain(withPieces, BottomDomainInitialPos, domainColor, pieceColor, DomainPlacement.Bottom);
        const kingPos = BottomDomainInitialPos.king[0];
        this.cells[kingPos[0]][kingPos[1]].setAsActiveThroneCell(domainColor, DomainPlacement.Bottom);
        this.cells[kingPos[0]][kingPos[1] - 1].setAsInactiveThroneCell(domainColor, DomainPlacement.Bottom, ThroneSide.Left);
        this.cells[kingPos[0]][kingPos[1] + 1].setAsInactiveThroneCell(domainColor, DomainPlacement.Bottom, ThroneSide.Right);
    }

    private initializeTopDomain(domainColor: DomainColor, pieceColor: PieceColor, withPieces: boolean) {
        this.initializeDomain(withPieces, TopDomainInitialPos, domainColor, pieceColor, DomainPlacement.Top);
        const kingPos = TopDomainInitialPos.king[0];
        this.cells[kingPos[0]][kingPos[1]].setAsActiveThroneCell(domainColor, DomainPlacement.Top);
        this.cells[kingPos[0]][kingPos[1] - 1].setAsInactiveThroneCell(domainColor, DomainPlacement.Top, ThroneSide.Right);
        this.cells[kingPos[0]][kingPos[1] + 1].setAsInactiveThroneCell(domainColor, DomainPlacement.Top, ThroneSide.Left);
    }

    private initializeRightDomain(domainColor: DomainColor, pieceColor: PieceColor, withPieces: boolean) {
        this.initializeDomain(withPieces, RightDomainInitialPos, domainColor, pieceColor, DomainPlacement.Right);
        const kingPos = RightDomainInitialPos.king[0];
        this.cells[kingPos[0]][kingPos[1]].setAsActiveThroneCell(domainColor, DomainPlacement.Right);
        this.cells[kingPos[0] - 1][kingPos[1]].setAsInactiveThroneCell(domainColor, DomainPlacement.Right, ThroneSide.Right);
        this.cells[kingPos[0] + 1][kingPos[1]].setAsInactiveThroneCell(domainColor, DomainPlacement.Right, ThroneSide.Left);
    }

    private initializeLeftDomain(domainColor: DomainColor, pieceColor: PieceColor, withPieces: boolean) {
        this.initializeDomain(withPieces, LeftDomainInitialPos, domainColor, pieceColor, DomainPlacement.Left);
        const kingPos = LeftDomainInitialPos.king[0];
        this.cells[kingPos[0]][kingPos[1]].setAsActiveThroneCell(domainColor, DomainPlacement.Left);
        this.cells[kingPos[0] - 1][kingPos[1]].setAsInactiveThroneCell(domainColor, DomainPlacement.Left, ThroneSide.Left);
        this.cells[kingPos[0] + 1][kingPos[1]].setAsInactiveThroneCell(domainColor, DomainPlacement.Left, ThroneSide.Right);
    }

    private activateDomain(domainColor: DomainColor, placement: DomainPlacement, withPieces: boolean) {
        const pieceColor = getPieceColorForDomain(domainColor);
        switch (placement) {
            case DomainPlacement.Bottom: return this.initializeBottomDomain(domainColor, pieceColor, withPieces);
            case DomainPlacement.Left: return this.initializeLeftDomain(domainColor, pieceColor, withPieces);
            case DomainPlacement.Top: return this.initializeTopDomain(domainColor, pieceColor, withPieces);
            default: return this.initializeRightDomain(domainColor, pieceColor, withPieces);
        }
    }

    private getDomainPlacementsBasedOnCount(count: number): Array<DomainPlacement> {
        switch (count) {
            case 2: return [DomainPlacement.Bottom, DomainPlacement.Top];
            case 3: return [DomainPlacement.Bottom, DomainPlacement.Left, DomainPlacement.Right];
            default: return [DomainPlacement.Bottom, DomainPlacement.Left, DomainPlacement.Top, DomainPlacement.Right];
        }
    }

    setUpBoard(withPieces: boolean, domainsInGame: Array<DomainColor>) {
        this.cells = [...Array(BOARD_SIZE)].map((_, row) => {
            return [...Array(BOARD_SIZE)].map((_, col) => new Cell(row, col))
        });
        const allDomainColors = [DomainColor.ORANGE, DomainColor.WHITE, DomainColor.YELLOW, DomainColor.BLACK];
        const placements = this.getDomainPlacementsBasedOnCount(domainsInGame.length);
        domainsInGame.forEach((domainColor, index) => {
            this.activateDomain(domainColor, placements[index], true);
        })
        const domainsNotInGame = allDomainColors.filter(color => !domainsInGame.includes(color))
        const remainingPlacements = this.getDomainPlacementsBasedOnCount(MAX_PLAYER_COUNT)
            .filter(placement => !placements.includes(placement))
        domainsNotInGame.forEach((domainColor, index) => {
            this.activateDomain(domainColor, remainingPlacements[index], false);
        })
    }

    movePiece(sourceCell: Cell, targetCell: Cell) {
        // TODO: implement pawn promotion
        if (sourceCell.piece?.type === PieceType.Pawn) {
            (sourceCell.piece as Pawn).setMovedToTrue();
        }
        targetCell.setPiece(sourceCell.piece);
        sourceCell.setPiece(null);
    }
}