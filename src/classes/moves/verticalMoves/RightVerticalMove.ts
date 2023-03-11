import {CommonMoves} from "../Moves";
import {DomainPlacement, PieceColor} from "../../constants";
import {Cell} from "../../Cell";
import {QuadularBoard} from "../../QuadularBoard";
import {Piece} from "../../pieces/Piece";
import {VerticalMove} from "./VerticalMove";

export class RightVerticalMove extends VerticalMove implements CommonMoves {
    private static getDeltaToChangePosition(piece: Piece): number[] {
        switch (piece.domainPlacement) {
            case DomainPlacement.Bottom: return [0, 1];
            case DomainPlacement.Left: return [1, 0];
            case DomainPlacement.Top: return [0, -1];
            default: return [-1, 0];
        }
    }

    getValidMoves(piece: Piece, cell: Cell, board: QuadularBoard, piecesInControl: Array<PieceColor>): Array<Cell> {
        return this.findValidMoves(piece, cell, RightVerticalMove.getDeltaToChangePosition(piece), board.cells, piecesInControl);
    }
}