import {DomainPlacement, PieceColor, PieceType} from "../constants";
import {Piece} from "./Piece";
import {CommonMoves} from "../moves/Moves";
import {ForwardMove} from "../moves/verticalMoves/ForwardMove";
import {LeftVerticalMove} from "../moves/verticalMoves/LeftVerticalMove";
import {RightVerticalMove} from "../moves/verticalMoves/RightVerticalMove";
import {BackwardMove} from "../moves/verticalMoves/BackwardMove";

export class Rook implements Piece {
    type: PieceType = PieceType.Rook
    color: PieceColor = PieceColor.ORANGE
    domainPlacement: DomainPlacement = DomainPlacement.Left

    constructor(color: PieceColor, domainPlacement: DomainPlacement) {
        this.color = color;
        this.domainPlacement = domainPlacement;
    }

    getAllowedMoves(): Array<CommonMoves> {
        return [new ForwardMove(), new LeftVerticalMove(), new RightVerticalMove(), new BackwardMove()];
    }
}