import {CellColor, GradientColor, ThroneSide} from "./constants";
import {Piece} from "./pieces/Piece";

export class Cell {
    row: number;
    col: number;
    color: CellColor = CellColor.INACTIVE;
    gradientColor?: GradientColor
    piece?: Piece;
    partOfThrone: boolean = false;
    throneSides?: ThroneSide;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
        if (row >= 5 && row <= 11 && col >= 5 && col <= 11) {
            this.color = (row + col) % 2 === 1 ? CellColor.BLACK : CellColor.WHITE;
        }
    }

    setPiece(piece: Piece) {
        this.piece = piece
    }

    setGradientColor(color: GradientColor) {
        this.gradientColor = color
        this.color = (this.row + this.col) % 2 === 1 ? CellColor.BLACK : CellColor.WHITE;
    }

    setAsInactiveThroneCell(color: GradientColor, throneSide?: ThroneSide) {
        this.gradientColor = color
        this.partOfThrone = true;
        this.throneSides = throneSide;
    }

    setAsActiveThroneCell(color: GradientColor) {
        this.color = CellColor.WHITE;
        this.setAsInactiveThroneCell(color);
    }
}