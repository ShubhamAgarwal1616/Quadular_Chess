import {QuadularBoard} from "../QuadularBoard";
import {Cell} from "../Cell";
import {Piece} from "../pieces/Piece";
import {DomainColor, PieceColor} from "../constants";

export class MovesController {
    getValidMoves(
        piece: Piece,
        cell: Cell,
        board: QuadularBoard,
        piecesInControl: Array<PieceColor>,
        domainsInGame: Array<DomainColor>,
    ): Array<Cell> {
        let validMoves: Array<Cell> = [];
        piece.getAllowedMoves().forEach(moves => {
            validMoves = validMoves.concat(moves.getValidMoves(piece, cell, board, piecesInControl, domainsInGame));
        })
        return validMoves;
    }
}