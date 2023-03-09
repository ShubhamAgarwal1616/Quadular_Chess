import {DomainPlacement, PieceColor, PieceType} from "../constants";
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

export class Queen implements Piece {
    type: PieceType = PieceType.Queen
    color: PieceColor = PieceColor.ORANGE
    domainPlacement: DomainPlacement = DomainPlacement.Left

    constructor(color: PieceColor, domainPlacement: DomainPlacement) {
        this.color = color;
        this.domainPlacement = domainPlacement;
    }

    getAllowedMoves(): Array<Moves> {
        return [
            new LeftUpwardDiagonalMove(),
            new RightUpwardDiagonalMove(),
            new RightDownwardDiagonalMove(),
            new LeftDownwardDiagonalMove(),
            new ForwardMove(),
            new LeftVerticalMove(),
            new RightVerticalMove(),
            new BackwardMove(),
        ];
    }
}