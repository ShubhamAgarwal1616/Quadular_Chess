import {PieceColor, PieceType} from "../constants";
import {Piece} from "./Piece";

export class YoungKing implements Piece {
    type: PieceType = PieceType.YoungKing
    color: PieceColor = PieceColor.ORANGE

    constructor(color: PieceColor) {
        this.color = color
    }
}