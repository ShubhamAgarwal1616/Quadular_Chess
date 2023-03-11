import {DiagonalMove} from "./DiagonalMove";
import {CommonMoves} from "../Moves";
import {Piece} from "../../pieces/Piece";
import {Cell} from "../../Cell";
import {QuadularBoard} from "../../QuadularBoard";
import {PieceColor} from "../../constants";

export class LeftUpwardDiagonalMove extends DiagonalMove implements CommonMoves {
    getValidMoves(piece: Piece, cell: Cell, board: QuadularBoard, piecesInControl: Array<PieceColor>): Array<Cell> {
        const delta = [-1, 1];
        return this.findValidMoves(piece, cell, delta, board.cells, piecesInControl);
    }
}