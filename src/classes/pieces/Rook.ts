import {PieceColor, PieceType} from "../constants";
import {Piece} from "./Piece";
import {Moves} from "../moves/Moves";
import {ForwardMove} from "../moves/verticalMoves/ForwardMove";
import {LeftVerticalMove} from "../moves/verticalMoves/LeftVerticalMove";
import {RightVerticalMove} from "../moves/verticalMoves/RightVerticalMove";
import {BackwardMove} from "../moves/verticalMoves/BackwardMove";

export class Rook implements Piece {
    type: PieceType = PieceType.Rook
    color: PieceColor = PieceColor.ORANGE

    constructor(color: PieceColor) {
        this.color = color
    }

    getAllowedMoves(): Array<Moves> {
        return [new ForwardMove(), new LeftVerticalMove(), new RightVerticalMove(), new BackwardMove()];
    }
}