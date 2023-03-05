import {PieceColor, PieceType} from "../constants";
import {Piece} from "./Piece";
import {Moves} from "../moves/Moves";

export class Prince implements Piece {
    type: PieceType = PieceType.Prince
    color: PieceColor = PieceColor.ORANGE

    constructor(color: PieceColor) {
        this.color = color
    }

    getAllowedMoves(): Array<Moves> {
        return [];
    }
}