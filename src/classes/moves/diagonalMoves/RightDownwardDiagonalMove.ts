import {DiagonalMove} from "./DiagonalMove";
import {Moves} from "../Moves";
import {Piece} from "../../pieces/Piece";
import {Cell} from "../../Cell";
import {QuadularBoard} from "../../QuadularBoard";
import {PieceColor} from "../../constants";

export class RightDownwardDiagonalMove extends DiagonalMove implements Moves {
    getValidMoves(piece: Piece, cell: Cell, board: QuadularBoard, piecesInControl: Array<PieceColor>): Array<Cell> {
        const delta = [1, 1];
        return this.findValidMoves(piece, cell, delta, board.cells, piecesInControl);
    }
}