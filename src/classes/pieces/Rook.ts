import {PieceColor, PieceType} from "../constants";
import {Piece} from "./Piece";
import {Moves} from "../moves/Moves";

export class Rook implements Piece {
    type: PieceType = PieceType.Rook
    color: PieceColor = PieceColor.ORANGE

    constructor(color: PieceColor) {
        this.color = color
    }

    getAllowedMoves(): Array<Moves> {
        return [];
    }
}