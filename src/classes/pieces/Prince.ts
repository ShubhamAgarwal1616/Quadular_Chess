import {DomainPlacement, PieceColor, PieceType} from "../constants";
import {Piece} from "./Piece";
import {CommonMoves} from "../moves/Moves";
import {LeftUpwardDiagonalMove} from "../moves/diagonalMoves/LeftUpwardDiagonalMove";
import {RightUpwardDiagonalMove} from "../moves/diagonalMoves/RightUpwardDiagonalMove";
import {RightDownwardDiagonalMove} from "../moves/diagonalMoves/RightDownwardDiagonalMove";
import {LeftDownwardDiagonalMove} from "../moves/diagonalMoves/LeftDownwardDiagonalMove";
import {ForwardMove} from "../moves/verticalMoves/ForwardMove";
import {LeftVerticalMove} from "../moves/verticalMoves/LeftVerticalMove";
import {RightVerticalMove} from "../moves/verticalMoves/RightVerticalMove";
import {BackwardMove} from "../moves/verticalMoves/BackwardMove";

export class Prince implements Piece {
    type: PieceType = PieceType.Prince
    color: PieceColor = PieceColor.ORANGE
    domainPlacement: DomainPlacement = DomainPlacement.Left

    constructor(color: PieceColor, domainPlacement: DomainPlacement) {
        this.color = color;
        this.domainPlacement = domainPlacement;
    }

    getAllowedMoves(): Array<CommonMoves> {
        return [
            new LeftUpwardDiagonalMove(2),
            new RightUpwardDiagonalMove(2),
            new RightDownwardDiagonalMove(2),
            new LeftDownwardDiagonalMove(2),
            new ForwardMove(2),
            new LeftVerticalMove(2),
            new RightVerticalMove(2),
            new BackwardMove(2),
        ];
    }
}