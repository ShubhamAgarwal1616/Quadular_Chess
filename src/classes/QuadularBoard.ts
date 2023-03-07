import {Cell} from "./Cell";
import {
    BlackDomainInitialPos,
    BOARD_SIZE,
    DomainColor,
    OrangeDomainInitialPos,
    PieceColor,
    PieceType,
    ThroneSide,
    WhiteDomainInitialPos,
    YellowDomainInitialPos
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
    ) {
        for (let type in initialPos) {
            const pieceType = type as PieceType;
            initialPos[pieceType].forEach(pos => {
                const cell = this.cells[pos[0]][pos[1]];
                cell.setDomainColor(gradientColor);
                cell.setPiece(new PieceFactory().getPieceObject(pieceType, pieceColor, cell.color));
            })
        }
    }

    private initializeOrangeDomain() {
        this.initializeDomain(OrangeDomainInitialPos, DomainColor.ORANGE, PieceColor.ORANGE);
        const kingPos = OrangeDomainInitialPos.king[0];
        this.cells[kingPos[0]][kingPos[1]].setAsActiveThroneCell(DomainColor.ORANGE);
        this.cells[kingPos[0]][kingPos[1] - 1].setAsInactiveThroneCell(DomainColor.ORANGE, ThroneSide.Left);
        this.cells[kingPos[0]][kingPos[1] + 1].setAsInactiveThroneCell(DomainColor.ORANGE, ThroneSide.Right);
    }

    private initializeYellowDomain() {
        this.initializeDomain(YellowDomainInitialPos, DomainColor.YELLOW, PieceColor.YELLOW);
        const kingPos = YellowDomainInitialPos.king[0];
        this.cells[kingPos[0]][kingPos[1]].setAsActiveThroneCell(DomainColor.YELLOW);
        this.cells[kingPos[0]][kingPos[1] - 1].setAsInactiveThroneCell(DomainColor.YELLOW, ThroneSide.Right);
        this.cells[kingPos[0]][kingPos[1] + 1].setAsInactiveThroneCell(DomainColor.YELLOW, ThroneSide.Left);
    }

    private initializeBlackDomain() {
        this.initializeDomain(BlackDomainInitialPos, DomainColor.BLACK, PieceColor.BLACK);
        const kingPos = BlackDomainInitialPos.king[0];
        this.cells[kingPos[0]][kingPos[1]].setAsActiveThroneCell(DomainColor.BLACK);
        this.cells[kingPos[0] - 1][kingPos[1]].setAsInactiveThroneCell(DomainColor.BLACK, ThroneSide.Right);
        this.cells[kingPos[0] + 1][kingPos[1]].setAsInactiveThroneCell(DomainColor.BLACK, ThroneSide.Left);
    }

    private initializeWhiteDomain() {
        this.initializeDomain(WhiteDomainInitialPos, DomainColor.WHITE, PieceColor.WHITE);
        const kingPos = WhiteDomainInitialPos.king[0];
        this.cells[kingPos[0]][kingPos[1]].setAsActiveThroneCell(DomainColor.WHITE);
        this.cells[kingPos[0] - 1][kingPos[1]].setAsInactiveThroneCell(DomainColor.WHITE, ThroneSide.Left);
        this.cells[kingPos[0] + 1][kingPos[1]].setAsInactiveThroneCell(DomainColor.WHITE, ThroneSide.Right);
    }

    private initialize() {
        this.cells = [...Array(BOARD_SIZE)].map((_, row) => {
            return [...Array(BOARD_SIZE)].map((_, col) => new Cell(row, col))
        });
        this.initializeOrangeDomain();
        this.initializeYellowDomain();
        this.initializeBlackDomain();
        this.initializeWhiteDomain();
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