import {PieceColor, PieceType} from "../constants";
import {Piece} from "./Piece";
import {Moves} from "../moves/Moves";
import {ForwardMove} from "../moves/verticalMoves/ForwardMove";
import {LeftVerticalMove} from "../moves/verticalMoves/LeftVerticalMove";
import {RightVerticalMove} from "../moves/verticalMoves/RightVerticalMove";
import {PawnKill} from "../moves/PawnKill";

export class Pawn implements Piece {
    type: PieceType = PieceType.Pawn
    color: PieceColor = PieceColor.ORANGE
    hasMovedBefore: boolean = false;

    constructor(color: PieceColor) {
        this.color = color
    }

    getAllowedMoves(): Array<Moves> {
        if (!this.hasMovedBefore) {
            return [new ForwardMove(2), new PawnKill()]
        }
        return [new ForwardMove(1), new LeftVerticalMove(1), new RightVerticalMove(1), new PawnKill()];
    }

    setMovedToTrue() {
        this.hasMovedBefore = true;
    }
}