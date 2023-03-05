import {PieceColor, PieceType} from "../constants";
import {Moves} from "../moves/Moves";

export interface Piece {
    type: PieceType;
    color: PieceColor;
    getAllowedMoves(): Array<Moves>
}