import {Cell} from "../Cell";
import {
    BlackDomainInitialPos,
    DomainColor,
    OrangeDomainInitialPos,
    WhiteDomainInitialPos,
    YellowDomainInitialPos
} from "../constants";

export function getActivatedThroneCellPos(cell: Cell): [number, number] {
    switch (cell.domainColor) {
        case DomainColor.ORANGE:
            return OrangeDomainInitialPos.king[0];
        case DomainColor.YELLOW:
            return YellowDomainInitialPos.king[0];
        case DomainColor.BLACK:
            return BlackDomainInitialPos.king[0];
        default:
            return WhiteDomainInitialPos.king[0];
    }
}

export function getAdjacentCellsInDomainDirection(nextCell: Cell, cells: Array<Array<Cell>>): Array<Cell> {
    const cellsFacingThrone = [nextCell];
    if (nextCell.domainColor === DomainColor.ORANGE || nextCell.domainColor === DomainColor.YELLOW)
        cellsFacingThrone.push(cells[nextCell.row][nextCell.col - 1], cells[nextCell.row][nextCell.col + 1])
    else
        cellsFacingThrone.push(cells[nextCell.row - 1][nextCell.col], cells[nextCell.row + 1][nextCell.col])
    return cellsFacingThrone;
}