import {Cell} from "../Cell";
import {
    BottomDomainInitialPos,
    DomainPlacement,
    LeftDomainInitialPos, PieceColor, PieceType,
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

export function getAdjacentCellsInDomainDirection(nextCell: Cell, cells: Array<Array<Cell>>): Array<Cell> {
    const cellsFacingThrone = [nextCell];
    if (nextCell.domainPlacement === DomainPlacement.Bottom || nextCell.domainPlacement === DomainPlacement.Top)
        cellsFacingThrone.push(cells[nextCell.row][nextCell.col - 1], cells[nextCell.row][nextCell.col + 1])
    else
        cellsFacingThrone.push(cells[nextCell.row - 1][nextCell.col], cells[nextCell.row + 1][nextCell.col])
    return cellsFacingThrone;
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