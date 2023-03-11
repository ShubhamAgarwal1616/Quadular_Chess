import {EnPassantMove as EnPassantMoveInterface} from "./Moves";
import {Cell} from "../Cell";
import {Piece} from "../pieces/Piece";
import {PieceColor} from "../constants";
import {MapValue} from "./MovesController";
import {getBackCellInDomainDirection} from "./moveHelpers";
import {QuadularBoard} from "../QuadularBoard";

export class EnPassantMove implements EnPassantMoveInterface {
    getEnPassantMoves(
        piece: Piece,
        enPassantMap: Map<Piece, Array<MapValue>>,
        board: QuadularBoard,
        piecesInControl: Array<PieceColor>
    ): Array<Cell> {
        const enPassantCells = enPassantMap.get(piece)?.filter(value => {
            return value.cell.piece && value.piece === value.cell.piece && !piecesInControl.includes(value.cell.piece.color);
        });
        return enPassantCells?.map(value => getBackCellInDomainDirection(value.cell, board.cells, value.piece.domainPlacement)) ?? [];
    }

}