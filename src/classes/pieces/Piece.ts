import {DomainPlacement, PieceColor, PieceType} from "../constants";
import {CommonMoves, EnPassantMove} from "../moves/Moves";

export interface Piece {
    type: PieceType;
    color: PieceColor;
    domainPlacement: DomainPlacement;
    getAllowedMoves(): Array<CommonMoves | EnPassantMove>
}