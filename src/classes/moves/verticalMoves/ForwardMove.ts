import {Moves} from "../Moves";
import {PieceColor} from "../../constants";
import {Cell} from "../../Cell";
import {QuadularBoard} from "../../QuadularBoard";
import {Piece} from "../../pieces/Piece";
import {VerticalMove} from "./VerticalMove";

export class ForwardMove extends VerticalMove implements Moves {
    private static getDeltaToChangePosition(piece: Piece): number[] {
        switch (piece.color) {
            case PieceColor.ORANGE: return [-1, 0];
            case PieceColor.WHITE: return [0, 1];
            case PieceColor.YELLOW: return [1, 0];
            default: return [0, -1];
        }
    }

    getValidMoves(piece: Piece, cell: Cell, board: QuadularBoard): Array<Cell> {
        return this.findValidMoves(piece, cell, ForwardMove.getDeltaToChangePosition(piece), board.cells);
    }
}