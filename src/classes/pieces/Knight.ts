import {DomainPlacement, PieceColor, PieceType} from "../constants";
import {Piece} from "./Piece";
import {Moves} from "../moves/Moves";
import {KnightMove} from "../moves/KnightMove";

export class Knight implements Piece {
    type: PieceType = PieceType.Knight
    color: PieceColor = PieceColor.ORANGE
    domainPlacement: DomainPlacement = DomainPlacement.Left

    constructor(color: PieceColor, domainPlacement: DomainPlacement) {
        this.color = color;
        this.domainPlacement = domainPlacement;
    }

    getAllowedMoves(): Array<Moves> {
        return [new KnightMove()];
    }
}