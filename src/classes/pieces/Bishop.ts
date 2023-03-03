import {PieceColor, PieceType} from "../constants";
import {Piece} from "./Piece";

export class Bishop implements Piece {
    type: PieceType = PieceType.Bishop
    color: PieceColor = PieceColor.ORANGE

    constructor(color: PieceColor) {
        this.color = color
    }
}