import {DomainPlacement, PieceColor, PieceType} from "../constants";
import {Piece} from "./Piece";
import {CommonMoves, EnPassantMove as EnPassantMoveInterface} from "../moves/Moves";
import {ForwardMove} from "../moves/verticalMoves/ForwardMove";
import {LeftVerticalMove} from "../moves/verticalMoves/LeftVerticalMove";
import {RightVerticalMove} from "../moves/verticalMoves/RightVerticalMove";
import {PawnKill} from "../moves/PawnKill";
import {EnPassantMove} from "../moves/EnPasaantMove";

export class Pawn implements Piece {
    type: PieceType = PieceType.Pawn
    color: PieceColor = PieceColor.ORANGE
    hasMovedBefore: boolean = false
    domainPlacement: DomainPlacement = DomainPlacement.Left

    constructor(color: PieceColor, domainPlacement: DomainPlacement) {
        this.color = color;
        this.domainPlacement = domainPlacement;
    }

    getAllowedMoves(): Array<CommonMoves | EnPassantMoveInterface> {
        if (!this.hasMovedBefore) {
            return [new ForwardMove(2), new PawnKill()]
        }
        return [
            new ForwardMove(1),
            new LeftVerticalMove(1),
            new RightVerticalMove(1),
            new PawnKill(),
            new EnPassantMove(),
        ];
    }

    setMovedToTrue() {
        this.hasMovedBefore = true;
    }
}