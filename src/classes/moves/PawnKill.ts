import {Moves} from "./Moves";
import {Piece} from "../pieces/Piece";
import {Cell} from "../Cell";
import {QuadularBoard} from "../QuadularBoard";
import {DomainPlacement} from "../constants";
import {getActivatedThroneCellPos} from "./helpers";

export class PawnKill implements Moves {

    private static getNormalKillCells(piece: Piece, cell: Cell, cells: Array<Array<Cell>>): Array<Cell> {
        let positions: Array<Cell> = [];
        switch (piece.domainPlacement) {
            case DomainPlacement.Bottom:
                positions = [cells[cell.row - 1][cell.col - 1], cells[cell.row - 1][cell.col + 1]];
                break;
            case DomainPlacement.Left:
                positions = [cells[cell.row + 1][cell.col + 1], cells[cell.row - 1][cell.col + 1]];
                break;
            case DomainPlacement.Top:
                positions = [cells[cell.row + 1][cell.col + 1], cells[cell.row + 1][cell.col - 1]];
                break;
            default:
                positions = [cells[cell.row - 1][cell.col - 1], cells[cell.row + 1][cell.col - 1]];
        }
        // while coming out of throne pawn can kill the piece on mid-row square as well
        if (cell.partOfThrone) {
            if (piece.domainPlacement === DomainPlacement.Bottom || piece.domainPlacement === DomainPlacement.Top)
                positions.push(cells[cell.row][cell.col - 1], cells[cell.row][cell.col + 1])
            else
                positions.push(cells[cell.row - 1][cell.col], cells[cell.row + 1][cell.col])
        }
        return positions;
    }

    private static getDomainKillCells(piece: Piece, cell: Cell, cells: Array<Array<Cell>>): Array<Cell> {
        switch (piece.domainPlacement) {
            case DomainPlacement.Top: return [cells[cell.row - 1][cell.col - 1], cells[cell.row - 1][cell.col + 1]];
            case DomainPlacement.Right: return [cells[cell.row + 1][cell.col + 1], cells[cell.row - 1][cell.col + 1]];
            case DomainPlacement.Bottom: return [cells[cell.row + 1][cell.col + 1], cells[cell.row + 1][cell.col - 1]];
            default: return [cells[cell.row - 1][cell.col - 1], cells[cell.row + 1][cell.col - 1]];
        }
    }

    private static getActivatedThroneCell(cell: Cell, cells: Array<Array<Cell>>): Cell {
        const kingPos = getActivatedThroneCellPos(cell);
        return cells[kingPos[0]][kingPos[1]];
    }

    private filterValidNormalKills(piece: Piece, positions: Array<Cell>, cells: Array<Array<Cell>>): Array<Cell> {
        const validPositions = positions.map(cell => cell.partOfThrone ? PawnKill.getActivatedThroneCell(cell, cells) : cell)
        /* TODO: check !playerControlledColors.includes(cell.piece.color) instead of cell.piece.color !== piece.color for king kill */
        return validPositions.filter(cell => cell.piece && cell.piece.color !== piece.color)
    }

    private filterValidDomainKills(piece: Piece, curCell: Cell, positions: Array<Cell>): Array<Cell> {
        // domain kill is special move for pawn and only valid while entering an opponents domain
        if (!curCell.domainColor) {
            /* TODO: check domain color valid in 2-3 players in below condition */
            /* TODO: check !playerControlledColors.includes(cell.piece.color) instead of cell.piece.color !== piece.color for king kill */
            return positions.filter(cell => cell.piece && cell.piece.color !== piece.color && cell.domainColor)
        }
        return [];
    }

    getValidMoves(piece: Piece, cell: Cell, board: QuadularBoard): Array<Cell> {
        let normalKills = PawnKill.getNormalKillCells(piece, cell, board.cells);
        let domainKills = PawnKill.getDomainKillCells(piece, cell, board.cells);
        return this.filterValidNormalKills(piece, normalKills, board.cells).concat(this.filterValidDomainKills(piece, cell, domainKills));
    }
}