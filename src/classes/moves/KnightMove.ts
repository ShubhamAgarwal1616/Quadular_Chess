import {Moves} from "./Moves";
import {Piece} from "../pieces/Piece";
import {Cell} from "../Cell";
import {QuadularBoard} from "../QuadularBoard";
import {BOARD_SIZE, CellColor} from "../constants";
import {getActivatedThroneCellPos, getAdjacentCellsInDomainDirection} from "./helpers";

export class KnightMove implements Moves {
    private static isInsideBoard(pos: number[]): boolean {
        return pos[0] >= 0 && pos[1] >= 0 && pos[0] < BOARD_SIZE && pos[1] < BOARD_SIZE;
    }

    // needed to avoid diagonal cells from active throne cell while coming out of throne
    private static isDiagonalNeighbourCell(originalCell: Cell, cell: Cell): boolean {
        const delta = [[1, 1], [-1 , -1], [1, -1], [-1, 1]];
        return delta.some(d => originalCell.row + d[0] === cell.row && originalCell.col + d[1] === cell.col);
    }

    private static isValidCell(piece: Piece, originalCell: Cell, cell: Cell): boolean {
        /* TODO: check !playerControlledColors.includes(cell.piece.color) instead of cell.piece.color !== piece.color for king kill */
        if (cell.partOfThrone) {
            return !!cell.piece && cell.piece.color !== piece.color;
        }
        return (!cell.piece || cell.piece.color !== piece.color) && cell.color !== CellColor.INACTIVE &&
            !this.isDiagonalNeighbourCell(originalCell, cell)
    }

    getValidCells(piece: Piece, originalCell: Cell, possibleCells: Array<Cell>, cells: Array<Array<Cell>>): Array<Cell> {
        const mappedCells = possibleCells.map(cell => {
            if (cell.partOfThrone) {
                const kingPos = getActivatedThroneCellPos(cell);
                return cells[kingPos[0]][kingPos[1]];
            } else {
                return cell;
            }
        })
        return mappedCells.filter(cell => KnightMove.isValidCell(piece, originalCell, cell));
    }

    private getPossibleCells(deltaPositions: number[][], cell: Cell, board: QuadularBoard) {
        return deltaPositions.map(pos => [cell.row + pos[0], cell.col + pos[1]])
            .filter(KnightMove.isInsideBoard)
            .map(pos => board.cells[pos[0]][pos[1]]);
    }

    getValidMoves(piece: Piece, cell: Cell, board: QuadularBoard): Array<Cell> {
        const deltaPositions = [[1, -2], [-1, -2], [1, 2], [-1, 2], [-2, 1], [-2, -1], [2, 1], [2, -1]];
        let possibleCells: Cell[] = [];
        if (cell.partOfThrone) {
            getAdjacentCellsInDomainDirection(cell, board.cells).forEach(throneCell => {
                possibleCells = possibleCells.concat(this.getPossibleCells(deltaPositions, throneCell, board));
            })
        } else {
            possibleCells = this.getPossibleCells(deltaPositions, cell, board);
        }
        return this.getValidCells(piece, cell, possibleCells, board.cells);
    }
}