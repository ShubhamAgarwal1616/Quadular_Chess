import {Cell} from "../Cell";
import {
    BottomDomainInitialPos,
    DomainPlacement,
    LeftDomainInitialPos,
    PieceColor,
    PieceType,
    RightDomainInitialPos,
    TopDomainInitialPos
} from "../constants";
import {Piece} from "../pieces/Piece";

export function getActivatedThroneCellPos(cell: Cell): [number, number] {
    switch (cell.domainPlacement) {
        case DomainPlacement.Bottom:
            return BottomDomainInitialPos.king[0];
        case DomainPlacement.Top:
            return TopDomainInitialPos.king[0];
        case DomainPlacement.Right:
            return RightDomainInitialPos.king[0];
        default:
            return LeftDomainInitialPos.king[0];
    }
}

export function getAdjacentCellsInDomainDirection(
    nextCell: Cell,
    cells: Array<Array<Cell>>,
    domainPlacement?: DomainPlacement,
    notIncludeCurCell?: boolean,
): Array<Cell> {
    const placement = domainPlacement ?? nextCell.domainPlacement;
    const adjacentCells = notIncludeCurCell ? [] : [nextCell];
    if (placement === DomainPlacement.Bottom || placement === DomainPlacement.Top)
        adjacentCells.push(cells[nextCell.row][nextCell.col - 1], cells[nextCell.row][nextCell.col + 1])
    else
        adjacentCells.push(cells[nextCell.row - 1][nextCell.col], cells[nextCell.row + 1][nextCell.col])
    return adjacentCells;
}

export function checkForThroneIn(
    nextCell: Cell,
    piece: Piece,
    cells: Array<Array<Cell>>,
    piecesInControl: Array<PieceColor>,
): boolean | null | undefined {
    const kingPos = getActivatedThroneCellPos(nextCell);
    const pieceOnThrone = cells[kingPos[0]][kingPos[1]].piece;
    return piece.type === PieceType.King || (pieceOnThrone && !piecesInControl.includes(pieceOnThrone.color));
}

export function getBackCellInDomainDirection(cell: Cell, cells: Array<Array<Cell>>, placement: DomainPlacement,): Cell {
    switch (placement) {
        case DomainPlacement.Top: return cells[cell.row - 1][cell.col];
        case DomainPlacement.Bottom: return cells[cell.row + 1][cell.col];
        case DomainPlacement.Left: return cells[cell.row][cell.col - 1];
        default: return cells[cell.row][cell.col + 1];
    }
}