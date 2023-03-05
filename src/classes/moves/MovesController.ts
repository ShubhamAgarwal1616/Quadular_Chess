import {QuadularBoard} from "../QuadularBoard";
import {Cell} from "../Cell";
import {Piece} from "../pieces/Piece";

export class MovesController {
    getValidMoves(piece: Piece, cell: Cell, board: QuadularBoard): Array<Cell> {
        let validMoves: Array<Cell> = [];
        piece.getAllowedMoves().forEach(moves => {
            validMoves = validMoves.concat(moves.getValidMoves(piece, cell, board));
        })
        return validMoves;
    }
}