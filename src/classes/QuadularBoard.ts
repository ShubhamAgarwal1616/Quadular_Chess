import {Cell} from "./Cell";
import {
    BlackDomainInitialPos,
    BOARD_SIZE,
    GradientColor,
    OrangeDomainInitialPos,
    PieceColor,
    PieceType,
    ThroneSide,
    WhiteDomainInitialPos,
    YellowDomainInitialPos
} from "./constants";
import {PieceFactory} from "./pieces/PieceFactory";

export class QuadularBoard {
    cells: Array<Array<Cell>> = [];

    constructor() {
        this.initialize();
    }

    private initializeDomain(
        initialPos: {[key in PieceType]: number[][]},
        gradientColor: GradientColor,
        pieceColor: PieceColor,
    ) {
        for (let type in initialPos) {
            const pieceType = type as PieceType;
            initialPos[pieceType].forEach(pos => {
                this.cells[pos[0]][pos[1]].setGradientColor(gradientColor)
                this.cells[pos[0]][pos[1]].setPiece(new PieceFactory().getPieceObject(pieceType, pieceColor))
            })
        }
    }

    private initializeOrangeDomain() {
        this.initializeDomain(OrangeDomainInitialPos, GradientColor.GRADIENT_ORANGE, PieceColor.ORANGE);
        const kingPos = OrangeDomainInitialPos.king[0];
        this.cells[kingPos[0]][kingPos[1]].setAsActiveThroneCell(GradientColor.GRADIENT_ORANGE);
        this.cells[kingPos[0]][kingPos[1] - 1].setAsInactiveThroneCell(GradientColor.GRADIENT_ORANGE, ThroneSide.Left);
        this.cells[kingPos[0]][kingPos[1] + 1].setAsInactiveThroneCell(GradientColor.GRADIENT_ORANGE, ThroneSide.Right);
    }

    private initializeYellowDomain() {
        this.initializeDomain(YellowDomainInitialPos, GradientColor.GRADIENT_YELLOW, PieceColor.YELLOW);
        const kingPos = YellowDomainInitialPos.king[0];
        this.cells[kingPos[0]][kingPos[1]].setAsActiveThroneCell(GradientColor.GRADIENT_YELLOW);
        this.cells[kingPos[0]][kingPos[1] - 1].setAsInactiveThroneCell(GradientColor.GRADIENT_YELLOW, ThroneSide.Right);
        this.cells[kingPos[0]][kingPos[1] + 1].setAsInactiveThroneCell(GradientColor.GRADIENT_YELLOW, ThroneSide.Left);
    }

    private initializeBlackDomain() {
        this.initializeDomain(BlackDomainInitialPos, GradientColor.GRADIENT_BLACK, PieceColor.BLACK);
        const kingPos = BlackDomainInitialPos.king[0];
        this.cells[kingPos[0]][kingPos[1]].setAsActiveThroneCell(GradientColor.GRADIENT_BLACK);
        this.cells[kingPos[0] - 1][kingPos[1]].setAsInactiveThroneCell(GradientColor.GRADIENT_BLACK, ThroneSide.Right);
        this.cells[kingPos[0] + 1][kingPos[1]].setAsInactiveThroneCell(GradientColor.GRADIENT_BLACK, ThroneSide.Left);
    }

    private initializeWhiteDomain() {
        this.initializeDomain(WhiteDomainInitialPos, GradientColor.GRADIENT_WHITE, PieceColor.WHITE);
        const kingPos = WhiteDomainInitialPos.king[0];
        this.cells[kingPos[0]][kingPos[1]].setAsActiveThroneCell(GradientColor.GRADIENT_WHITE);
        this.cells[kingPos[0] - 1][kingPos[1]].setAsInactiveThroneCell(GradientColor.GRADIENT_WHITE, ThroneSide.Left);
        this.cells[kingPos[0] + 1][kingPos[1]].setAsInactiveThroneCell(GradientColor.GRADIENT_WHITE, ThroneSide.Right);
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
}