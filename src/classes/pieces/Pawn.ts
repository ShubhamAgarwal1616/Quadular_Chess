import {PieceColor, PieceType} from "../constants";
import {Piece} from "./Piece";

export class Pawn implements Piece {
    type: PieceType = PieceType.Pawn
    color: PieceColor = PieceColor.ORANGE

    constructor(color: PieceColor) {
        this.color = color
    }
}