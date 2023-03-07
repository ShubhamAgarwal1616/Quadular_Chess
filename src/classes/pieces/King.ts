import {PieceColor, PieceType} from "../constants";
import {Piece} from "./Piece";
import {Moves} from "../moves/Moves";
import {LeftUpwardDiagonalMove} from "../moves/diagonalMoves/LeftUpwardDiagonalMove";
import {RightUpwardDiagonalMove} from "../moves/diagonalMoves/RightUpwardDiagonalMove";
import {RightDownwardDiagonalMove} from "../moves/diagonalMoves/RightDownwardDiagonalMove";
import {LeftDownwardDiagonalMove} from "../moves/diagonalMoves/LeftDownwardDiagonalMove";
import {ForwardMove} from "../moves/verticalMoves/ForwardMove";
import {LeftVerticalMove} from "../moves/verticalMoves/LeftVerticalMove";
import {RightVerticalMove} from "../moves/verticalMoves/RightVerticalMove";
import {BackwardMove} from "../moves/verticalMoves/BackwardMove";

export class King implements Piece {
    type: PieceType = PieceType.King
    color: PieceColor = PieceColor.ORANGE

    constructor(color: PieceColor) {
        this.color = color
    }

    getAllowedMoves(): Array<Moves> {
        return [
            new LeftUpwardDiagonalMove(1),
            new RightUpwardDiagonalMove(1),
            new RightDownwardDiagonalMove(1),
            new LeftDownwardDiagonalMove(1),
            new ForwardMove(1),
            new LeftVerticalMove(1),
            new RightVerticalMove(1),
            new BackwardMove(1),
        ];
    }
}