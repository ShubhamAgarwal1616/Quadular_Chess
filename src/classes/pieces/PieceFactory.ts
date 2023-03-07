import {CellColor, PieceColor, PieceType} from "../constants";
import {Bishop} from "./Bishop";
import {Queen} from "./Queen";
import {Knight} from "./Knight";
import {Rook} from "./Rook";
import {Prince} from "./Prince";
import {Pawn} from "./Pawn";
import {King} from "./King";
import {YoungKing} from "./YoungKing";

export class PieceFactory {
    getPieceObject(pieceType: PieceType, color: PieceColor, originalCellColor: CellColor) {
        switch (pieceType) {
            case PieceType.Bishop: return new Bishop(color, originalCellColor)
            case PieceType.Queen: return new Queen(color)
            case PieceType.Knight: return new Knight(color)
            case PieceType.Rook: return new Rook(color)
            case PieceType.Prince: return new Prince(color)
            case PieceType.Pawn: return new Pawn(color)
            case PieceType.King: return new King(color)
            case PieceType.YoungKing: return new YoungKing(color)
        }
    }
}