import {Cell} from "../Cell";
import {
    BottomDomainInitialPos,
    DomainPlacement,
    LeftDomainInitialPos,
    RightDomainInitialPos,
    TopDomainInitialPos
} from "../constants";

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