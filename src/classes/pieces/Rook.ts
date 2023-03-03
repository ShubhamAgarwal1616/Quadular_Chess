import {PieceColor, PieceType} from "../constants";
import {Piece} from "./Piece";

export class Rook implements Piece {
    type: PieceType = PieceType.Rook
    color: PieceColor = PieceColor.ORANGE

    constructor(color: PieceColor) {
        this.color = color
    }
}