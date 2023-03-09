import {BOARD_SIZE, CellColor, PieceType} from "../../constants";
import {Cell} from "../../Cell";
import {Piece} from "../../pieces/Piece";
import {getActivatedThroneCellPos, getAdjacentCellsInDomainDirection} from "../moveHelpers";

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
        /* TODO: check !playerControlledColors.includes(cell.piece.color) instead of cell.piece.color !== piece.color for king kill */
        return VerticalMove.getDistance(cell, nextCell) <= this.limit && nextCell.piece && piece.type !== PieceType.Pawn && nextCell.piece.color !== piece.color;
    }

    private static checkForThroneIn(nextCell: Cell, piece: Piece, cells: Array<Array<Cell>>): boolean | null | undefined {
        const kingPos = getActivatedThroneCellPos(nextCell);
        const pieceOnThrone = cells[kingPos[0]][kingPos[1]].piece;
        // console.log('testing', kingPos, pieceOnThrone, nextCell);
        /* TODO: check !playerControlledColors.includes(cell.piece.color) instead of cell.piece.color !== piece.color for king kill */
        return piece.type === PieceType.King || (pieceOnThrone && pieceOnThrone.color !== piece.color);
    }

    private validThroneMove(cell: Cell, nextCell: Cell, piece: Piece, cells: Array<Array<Cell>>): boolean | null | undefined {
        return piece.type !== PieceType.Pawn &&
            VerticalMove.getDistance(cell, nextCell) <= this.limit &&
            nextCell.partOfThrone &&
            VerticalMove.checkForThroneIn(nextCell, piece, cells);
    }

    private calculateValidMoves(piece: Piece, cell: Cell, delta: number[], cells: Array<Array<Cell>>): Array<Cell> {
        const validPositions: Array<Cell> = []
        let nextCell = cells[cell.row + delta[0]][cell.col + delta[1]];
        while (this.isEmptyValidCell(cell, nextCell)) {
            validPositions.push(nextCell);
            nextCell = cells[nextCell.row + delta[0]][nextCell.col + delta[1]];
        }
        if (this.canCapturePiece(cell, nextCell, piece)) {
            validPositions.push(nextCell);
        }
        if (this.validThroneMove(cell, nextCell, piece, cells)) {
            const kingPos = getActivatedThroneCellPos(nextCell);
            validPositions.push(cells[kingPos[0]][kingPos[1]]);
        }
        return validPositions;
    }

    private getMovesForOtherPieces(emptyCells: Array<Cell>, piece: Piece, delta: number[], cells: Array<Array<Cell>>): Array<Cell> {
        let possiblePos: Array<Cell> = [];
        this.limit = this.limit - 1;
        emptyCells.forEach(cell => {
            possiblePos = possiblePos.concat(this.calculateValidMoves(piece, cell, delta, cells))
        })
        return possiblePos;
    }

    protected findValidMoves(piece: Piece, cell: Cell, delta: number[], cells: Array<Array<Cell>>): Array<Cell> {
        if (cell.partOfThrone) {
            let nextCell = cells[cell.row + delta[0]][cell.col + delta[1]];
            if (nextCell.domainColor && nextCell.color !== CellColor.INACTIVE) {
                const cellsFacingThrone = getAdjacentCellsInDomainDirection(nextCell, cells);
                const emptyCells = cellsFacingThrone.filter(cell => !cell.piece);
                if(piece.type === PieceType.Pawn) return emptyCells;
                else return cellsFacingThrone.concat(this.getMovesForOtherPieces(emptyCells, piece, delta, cells));
            } else {
                return [];
            }
        } else {
            return this.calculateValidMoves(piece, cell, delta, cells)
        }
    }
}