import {Cell} from "./Cell";
import {
    BOARD_SIZE,
    BottomDomainInitialPos,
    DomainColor,
    DomainPlacement,
    LeftDomainInitialPos,
    PieceColor,
    PieceType,
    RightDomainInitialPos,
    ThroneSide,
    TopDomainInitialPos
} from "./constants";
import {PieceFactory} from "./pieces/PieceFactory";
import {Pawn} from "./pieces/Pawn";

export class QuadularBoard {
    cells: Array<Array<Cell>> = [];

    constructor() {
        this.initialize();
    }

    private initializeDomain(
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
                cell.setPiece(new PieceFactory().getPieceObject(pieceType, pieceColor, domainPlacement, cell.color));
            })
        }
    }

    private initializeBottomDomain(domainColor: DomainColor, pieceColor: PieceColor) {
        this.initializeDomain(BottomDomainInitialPos, domainColor, pieceColor, DomainPlacement.Bottom);
        const kingPos = BottomDomainInitialPos.king[0];
        this.cells[kingPos[0]][kingPos[1]].setAsActiveThroneCell(domainColor, DomainPlacement.Bottom);
        this.cells[kingPos[0]][kingPos[1] - 1].setAsInactiveThroneCell(domainColor, DomainPlacement.Bottom, ThroneSide.Left);
        this.cells[kingPos[0]][kingPos[1] + 1].setAsInactiveThroneCell(domainColor, DomainPlacement.Bottom, ThroneSide.Right);
    }

    private initializeTopDomain(domainColor: DomainColor, pieceColor: PieceColor) {
        this.initializeDomain(TopDomainInitialPos, domainColor, pieceColor, DomainPlacement.Top);
        const kingPos = TopDomainInitialPos.king[0];
        this.cells[kingPos[0]][kingPos[1]].setAsActiveThroneCell(domainColor, DomainPlacement.Top);
        this.cells[kingPos[0]][kingPos[1] - 1].setAsInactiveThroneCell(domainColor, DomainPlacement.Top, ThroneSide.Right);
        this.cells[kingPos[0]][kingPos[1] + 1].setAsInactiveThroneCell(domainColor, DomainPlacement.Top, ThroneSide.Left);
    }

    private initializeRightDomain(domainColor: DomainColor, pieceColor: PieceColor) {
        this.initializeDomain(RightDomainInitialPos, domainColor, pieceColor, DomainPlacement.Right);
        const kingPos = RightDomainInitialPos.king[0];
        this.cells[kingPos[0]][kingPos[1]].setAsActiveThroneCell(domainColor, DomainPlacement.Right);
        this.cells[kingPos[0] - 1][kingPos[1]].setAsInactiveThroneCell(domainColor, DomainPlacement.Right, ThroneSide.Right);
        this.cells[kingPos[0] + 1][kingPos[1]].setAsInactiveThroneCell(domainColor, DomainPlacement.Right, ThroneSide.Left);
    }

    private initializeLeftDomain(domainColor: DomainColor, pieceColor: PieceColor) {
        this.initializeDomain(LeftDomainInitialPos, domainColor, pieceColor, DomainPlacement.Left);
        const kingPos = LeftDomainInitialPos.king[0];
        this.cells[kingPos[0]][kingPos[1]].setAsActiveThroneCell(domainColor, DomainPlacement.Left);
        this.cells[kingPos[0] - 1][kingPos[1]].setAsInactiveThroneCell(domainColor, DomainPlacement.Left, ThroneSide.Left);
        this.cells[kingPos[0] + 1][kingPos[1]].setAsInactiveThroneCell(domainColor, DomainPlacement.Left, ThroneSide.Right);
    }

    private initialize() {
        this.cells = [...Array(BOARD_SIZE)].map((_, row) => {
            return [...Array(BOARD_SIZE)].map((_, col) => new Cell(row, col))
        });
        this.initializeBottomDomain(DomainColor.ORANGE, PieceColor.ORANGE);
        this.initializeTopDomain(DomainColor.YELLOW, PieceColor.YELLOW);
        this.initializeRightDomain(DomainColor.BLACK, PieceColor.BLACK);
        this.initializeLeftDomain(DomainColor.WHITE, PieceColor.WHITE);
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