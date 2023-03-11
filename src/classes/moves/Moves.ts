import {Cell} from "../Cell";
import {QuadularBoard} from "../QuadularBoard";
import {Piece} from "../pieces/Piece";
import {DomainColor, PieceColor} from "../constants";
import {MapValue} from "./MovesController";

export interface CommonMoves {
    getValidMoves(
        piece: Piece,
        cell: Cell,
        board: QuadularBoard,
        piecesInControl: Array<PieceColor>,
        domainsInGame?: Array<DomainColor>,
    ): Array<Cell>
}

export interface EnPassantMove {
    getEnPassantMoves(
        piece: Piece,
        enPassantMap: Map<Piece, Array<MapValue>>,
        board: QuadularBoard,
        piecesInControl: Array<PieceColor>
    ): Array<Cell>
}