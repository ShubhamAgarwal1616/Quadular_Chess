import {PieceColor, PieceType} from "../constants";
import {Piece} from "./Piece";

export class Queen implements Piece {
    type: PieceType = PieceType.Queen
    color: PieceColor = PieceColor.ORANGE

    constructor(color: PieceColor) {
        this.color = color
    }
}