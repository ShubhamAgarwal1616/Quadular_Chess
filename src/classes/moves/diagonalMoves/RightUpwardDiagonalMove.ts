import {DiagonalMove} from "./DiagonalMove";
import {Moves} from "../Moves";
import {Piece} from "../../pieces/Piece";
import {Cell} from "../../Cell";
import {QuadularBoard} from "../../QuadularBoard";

export class RightUpwardDiagonalMove extends DiagonalMove implements Moves {
    getValidMoves(piece: Piece, cell: Cell, board: QuadularBoard): Array<Cell> {
        const delta = [-1, -1];
        return this.findValidMoves(piece, cell, delta, board.cells);
    }
}