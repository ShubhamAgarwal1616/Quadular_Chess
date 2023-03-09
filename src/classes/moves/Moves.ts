import {Cell} from "../Cell";
import {QuadularBoard} from "../QuadularBoard";
import {Piece} from "../pieces/Piece";
import {DomainColor, PieceColor} from "../constants";

export interface Moves {
    getValidMoves(
        piece: Piece,
        cell: Cell,
        board: QuadularBoard,
        piecesInControl: Array<PieceColor>,
        domainsInGame?: Array<DomainColor>,
    ): Array<Cell>
}