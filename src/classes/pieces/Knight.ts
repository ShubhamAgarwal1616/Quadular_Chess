import {PieceColor, PieceType} from "../constants";
import {Piece} from "./Piece";

export class Knight implements Piece {
    type: PieceType = PieceType.Knight
    color: PieceColor = PieceColor.ORANGE

    constructor(color: PieceColor) {
        this.color = color
    }
}