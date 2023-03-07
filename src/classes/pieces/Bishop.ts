import {CellColor, PieceColor, PieceType} from "../constants";
import {Piece} from "./Piece";
import {Moves} from "../moves/Moves";
import {LeftUpwardDiagonalMove} from "../moves/diagonalMoves/LeftUpwardDiagonalMove";
import {RightUpwardDiagonalMove} from "../moves/diagonalMoves/RightUpwardDiagonalMove";
import {RightDownwardDiagonalMove} from "../moves/diagonalMoves/RightDownwardDiagonalMove";
import {LeftDownwardDiagonalMove} from "../moves/diagonalMoves/LeftDownwardDiagonalMove";

export class Bishop implements Piece {
    type: PieceType = PieceType.Bishop
    color: PieceColor = PieceColor.ORANGE
    originalCellColor: CellColor = CellColor.WHITE

    constructor(color: PieceColor, originalCellColor: CellColor) {
        this.color = color;
        this.originalCellColor = originalCellColor;
    }

    getAllowedMoves(): Array<Moves> {
        return [
            new LeftUpwardDiagonalMove(),
            new RightUpwardDiagonalMove(),
            new RightDownwardDiagonalMove(),
            new LeftDownwardDiagonalMove(),
        ];
    }
}