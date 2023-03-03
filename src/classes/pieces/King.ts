import {PieceColor, PieceType} from "../constants";
import {Piece} from "./Piece";

export class King implements Piece {
    type: PieceType = PieceType.King
    color: PieceColor = PieceColor.ORANGE

    constructor(color: PieceColor) {
        this.color = color
    }
}