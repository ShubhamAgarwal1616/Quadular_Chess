import {QuadularBoard} from "../QuadularBoard";
import {Cell} from "../Cell";
import {Piece} from "../pieces/Piece";
import {DomainColor, PieceColor, PieceType} from "../constants";
import {getAdjacentCellsInDomainDirection, getBackCellInDomainDirection} from "./moveHelpers";

export interface MapValue {
    piece: Piece;
    cell: Cell;
}

export class MovesController {
    enPassantMap: Map<Piece, Array<MapValue>> = new Map<Piece, Array<MapValue>>();

    getValidMoves(
        piece: Piece,
        cell: Cell,
        board: QuadularBoard,
        piecesInControl: Array<PieceColor>,
        domainsInGame: Array<DomainColor>,
    ): Array<Cell> {
        let validMoves: Array<Cell> = [];
        piece.getAllowedMoves().forEach(move => {
            if ("getValidMoves" in move) {
                validMoves = validMoves.concat(move.getValidMoves(piece, cell, board, piecesInControl, domainsInGame));
            } else {
                validMoves = validMoves.concat(move.getEnPassantMoves(piece, this.enPassantMap, board, piecesInControl));
            }
        })
        return validMoves;
    }

    private getPiecesForEnPassant(piece: Piece, cell: Cell, cells: Array<Array<Cell>>, allyPiecesColors: PieceColor[]): Piece[] {
        const pieces: Piece[] = [];
        const adjacentCells = getAdjacentCellsInDomainDirection(cell, cells, piece.domainPlacement, true);
        adjacentCells.forEach(cell => {
            if (cell.piece && cell.piece.type === PieceType.Pawn && !allyPiecesColors.includes(cell.piece.color)) {
                pieces.push(cell.piece);
            }
        })
        return pieces;
    }

    setInEnPassantMap(pawnPiece: Piece, targetCell: Cell, cells: Array<Array<Cell>>, allyPiecesColors: PieceColor[] = []) {
        const value: MapValue = {piece: pawnPiece, cell: targetCell};
        this.getPiecesForEnPassant(pawnPiece, targetCell, cells, allyPiecesColors).forEach(piece => {
            if (this.enPassantMap.has(piece)) {
                this.enPassantMap.get(piece)?.push(value);
            } else {
                this.enPassantMap.set(piece, [value]);
            }
        })
    }

    deleteFromEnPassantMap(piecesInControl: Array<PieceColor> = []) {
        const keysToBeCleared: Piece[] = [];
        this.enPassantMap.forEach((_, key) => {
            if (piecesInControl.includes(key.color)) {
                keysToBeCleared.push(key);
            }
        })
        keysToBeCleared.forEach(key => this.enPassantMap.delete(key));
    }

    getPiecePositionBeingEnPassant(piece: Piece, targetCell: Cell, cells: Array<Array<Cell>>): Cell | undefined {
        const mapValue = this.enPassantMap.get(piece) ?? [];
        return mapValue.find(val => getBackCellInDomainDirection(val.cell, cells, val.piece.domainPlacement) === targetCell)?.cell;
    }
}