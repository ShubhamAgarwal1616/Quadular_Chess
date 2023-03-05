import {Moves} from "../Moves";
import {PieceColor} from "../../constants";
import {Cell} from "../../Cell";
import {QuadularBoard} from "../../QuadularBoard";
import {Piece} from "../../pieces/Piece";
import {VerticalMove} from "./VerticalMove";

export class LeftVerticalMove extends VerticalMove implements Moves {
    private static getDeltaToChangePosition(piece: Piece): number[] {
        switch (piece.color) {
            case PieceColor.ORANGE: return [0, -1];
            case PieceColor.WHITE: return [-1, 0];
            case PieceColor.YELLOW: return [0, 1];
            default: return [1, 0];
        }
    }

    getValidMoves(piece: Piece, cell: Cell, board: QuadularBoard): Array<Cell> {
        return this.calculateValidMoves(piece, cell, LeftVerticalMove.getDeltaToChangePosition(piece), board.cells);
    }
}