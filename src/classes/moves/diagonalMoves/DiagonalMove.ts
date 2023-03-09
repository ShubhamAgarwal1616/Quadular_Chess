import {Piece} from "../../pieces/Piece";
import {Cell} from "../../Cell";
import {BOARD_SIZE, CellColor, DomainPlacement, PieceType} from "../../constants";
import {getActivatedThroneCellPos} from "../moveHelpers";
import {Bishop} from "../../pieces/Bishop";

export abstract class DiagonalMove {
    limit: number = BOARD_SIZE;

    constructor(limit?: number) {
        this.limit = limit ? limit : BOARD_SIZE;
    }

    private static getDistance(cell1: Cell, cell2: Cell): number {
        return (Math.abs(cell1.row - cell2.row) + Math.abs(cell1.col - cell2.col)) / 2;
    }

    private isValidMove(piece: Piece, cell: Cell, nextCell: Cell): boolean {
        /* TODO: check !playerControlledColors.includes(cell.piece.color) instead of cell.piece.color !== piece.color for king kill */
        return (!nextCell.piece || nextCell.piece.color !== piece.color) && nextCell.color !== CellColor.INACTIVE && !nextCell.partOfThrone && DiagonalMove.getDistance(cell, nextCell) <= this.limit;
    }

    private static checkForThroneIn(nextCell: Cell, piece: Piece, cells: Array<Array<Cell>>): boolean | null | undefined {
        const kingPos = getActivatedThroneCellPos(nextCell);
        const pieceOnThrone = cells[kingPos[0]][kingPos[1]].piece;
        /* TODO: check !playerControlledColors.includes(cell.piece.color) instead of cell.piece.color !== piece.color for king kill */
        return piece.type === PieceType.King || (pieceOnThrone && pieceOnThrone.color !== piece.color);
    }

    private validThroneMove(cell: Cell, nextCell: Cell, piece: Piece, cells: Array<Array<Cell>>): boolean | null | undefined {
        return DiagonalMove.getDistance(cell, nextCell) <= this.limit &&
            nextCell.partOfThrone &&
            DiagonalMove.checkForThroneIn(nextCell, piece, cells);
    }

    private calculateValidMoves(piece: Piece, cell: Cell, delta: number[], cells: Array<Array<Cell>>): Array<Cell> {
        const validPositions: Array<Cell> = []
        let nextCell = cells[cell.row + delta[0]][cell.col + delta[1]];
        while (this.isValidMove(piece, cell, nextCell)) {
            validPositions.push(nextCell);
            if (nextCell.piece) break;
            nextCell = cells[nextCell.row + delta[0]][nextCell.col + delta[1]];
        }
        if (this.validThroneMove(cell, nextCell, piece, cells)) {
            const kingPos = getActivatedThroneCellPos(nextCell);
            validPositions.push(cells[kingPos[0]][kingPos[1]]);
        }
        return validPositions;
    }

    getCellInFrontOfThrone(cell: Cell, cells: Array<Array<Cell>>): Cell {
        switch (cell.domainPlacement) {
            case DomainPlacement.Top: return cells[cell.row + 1][cell.col];
            case DomainPlacement.Bottom: return cells[cell.row - 1][cell.col];
            case DomainPlacement.Right: return cells[cell.row][cell.col - 1];
            default: return cells[cell.row][cell.col + 1];
        }
    }

    calculateMoveFromFrontCell(piece: Piece, cell: Cell, delta: number[], cells: Array<Array<Cell>>): Array<Cell> {
        if (cell.piece) {
            if (cell.piece.color === piece.color) return [];
            else return [cell];
        }
        return [cell].concat(this.calculateValidMoves(piece, cell, delta, cells))
    }

    protected findValidMoves(piece: Piece, cell: Cell, delta: number[], cells: Array<Array<Cell>>): Array<Cell> {
        if (cell.partOfThrone) {
            const fontCell = this.getCellInFrontOfThrone(cell, cells);
            if (piece instanceof Bishop && piece.originalCellColor === CellColor.WHITE) {
                return this.calculateMoveFromFrontCell(piece, fontCell, delta, cells)
            } else if (piece.type !== PieceType.Bishop) {
                const validPositions = this.calculateValidMoves(piece, cell, delta, cells)
                this.limit = this.limit - 1;
                return validPositions.concat(this.calculateMoveFromFrontCell(piece, fontCell, delta, cells));
            }
        }
        return this.calculateValidMoves(piece, cell, delta, cells)
    }
}