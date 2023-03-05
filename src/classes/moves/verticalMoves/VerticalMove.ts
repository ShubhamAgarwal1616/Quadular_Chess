import {BOARD_SIZE, CellColor, PieceType} from "../../constants";
import {Cell} from "../../Cell";
import {Piece} from "../../pieces/Piece";

export abstract class VerticalMove {
    limit: number = BOARD_SIZE;

    constructor(limit?: number) {
        this.limit = limit ? limit : BOARD_SIZE;
    }

    private static getDistance(cell1: Cell, cell2: Cell): number {
        return Math.abs(cell1.row - cell2.row + cell1.col - cell2.col);
    }

    private isEmptyValidCell(cell: Cell, nextCell: Cell): boolean {
        return !nextCell.piece && nextCell.color !== CellColor.INACTIVE && !nextCell.partOfThrone && VerticalMove.getDistance(cell, nextCell) <= this.limit;
    }

    private canCapturePiece(cell: Cell, nextCell: Cell, piece: Piece): boolean | null | undefined {
        return VerticalMove.getDistance(cell, nextCell) <= this.limit && nextCell.piece && piece.type !== PieceType.Pawn && nextCell.piece.color !== piece.color;
    }

    protected calculateValidMoves(piece: Piece, cell: Cell, delta: number[], cells: Array<Array<Cell>>) {
        const validPositions: Array<Cell> = []
        let nextCell = cells[cell.row + delta[0]][cell.col + delta[1]];
        while (this.isEmptyValidCell(cell, nextCell)) {
            validPositions.push(nextCell);
            nextCell = cells[nextCell.row + delta[0]][nextCell.col + delta[1]];
        }
        if (this.canCapturePiece(cell, nextCell, piece)) {
            validPositions.push(nextCell);
        }
        // TODO: moves for IN and OUT of throne
        return validPositions;
    }
}