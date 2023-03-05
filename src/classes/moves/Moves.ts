import {Cell} from "../Cell";
import {QuadularBoard} from "../QuadularBoard";
import {Piece} from "../pieces/Piece";

export interface Moves {
    getValidMoves(piece: Piece, cell: Cell, board: QuadularBoard): Array<Cell>
}