import {CellColor, DomainPlacement, PieceColor, PieceType} from "../constants";
import {Bishop} from "./Bishop";
import {Queen} from "./Queen";
import {Knight} from "./Knight";
import {Rook} from "./Rook";
import {Prince} from "./Prince";
import {Pawn} from "./Pawn";
import {King} from "./King";
import {YoungKing} from "./YoungKing";

export class PieceFactory {
    getPieceObject(pieceType: PieceType, color: PieceColor, domainPlacement: DomainPlacement, originalCellColor: CellColor) {
        switch (pieceType) {
            case PieceType.Bishop: return new Bishop(color, originalCellColor, domainPlacement)
            case PieceType.Queen: return new Queen(color, domainPlacement)
            case PieceType.Knight: return new Knight(color, domainPlacement)
            case PieceType.Rook: return new Rook(color, domainPlacement)
            case PieceType.Prince: return new Prince(color, domainPlacement)
            case PieceType.Pawn: return new Pawn(color, domainPlacement)
            case PieceType.King: return new King(color, domainPlacement)
            case PieceType.YoungKing: return new YoungKing(color, domainPlacement)
        }
    }
}