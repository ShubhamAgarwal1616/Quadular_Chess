import {Moves} from "./Moves";
import {Piece} from "../pieces/Piece";
import {Cell} from "../Cell";
import {QuadularBoard} from "../QuadularBoard";
import {PieceColor} from "../constants";

export class PawnKill implements Moves {

    private static getNormalKillCells(piece: Piece, cell: Cell, cells: Array<Array<Cell>>): Array<Cell> {
        switch (piece.color) {
            case PieceColor.ORANGE: return [cells[cell.row - 1][cell.col - 1], cells[cell.row - 1][cell.col + 1]];
            case PieceColor.WHITE: return [cells[cell.row + 1][cell.col + 1], cells[cell.row - 1][cell.col + 1]];
            case PieceColor.YELLOW: return [cells[cell.row + 1][cell.col + 1], cells[cell.row + 1][cell.col - 1]];
            default: return [cells[cell.row - 1][cell.col - 1], cells[cell.row + 1][cell.col - 1]];
        }
    }

    private static getDomainKillCells(piece: Piece, cell: Cell, cells: Array<Array<Cell>>): Array<Cell> {
        switch (piece.color) {
            case PieceColor.YELLOW: return [cells[cell.row - 1][cell.col - 1], cells[cell.row - 1][cell.col + 1]];
            case PieceColor.BLACK: return [cells[cell.row + 1][cell.col + 1], cells[cell.row - 1][cell.col + 1]];
            case PieceColor.ORANGE: return [cells[cell.row + 1][cell.col + 1], cells[cell.row + 1][cell.col - 1]];
            default: return [cells[cell.row - 1][cell.col - 1], cells[cell.row + 1][cell.col - 1]];
        }
    }

    private filterValidNormalKills(piece: Piece, cells: Array<Cell>) {
        return cells.filter(cell => cell.piece &&  cell.piece.color !== piece.color)
    }

    private filterValidDomainKills(piece: Piece, cells: Array<Cell>) {
        return cells.filter(cell => cell.piece &&  cell.piece.color !== piece.color && cell.domainColor)
    }

    getValidMoves(piece: Piece, cell: Cell, board: QuadularBoard): Array<Cell> {
        let normalKills = PawnKill.getNormalKillCells(piece, cell, board.cells);
        let domainKills = PawnKill.getDomainKillCells(piece, cell, board.cells);
        return this.filterValidNormalKills(piece, normalKills).concat(this.filterValidDomainKills(piece, domainKills));
    }
}