import {Cell} from "../Cell";
import {
    BlackDomainInitialPos,
    DomainColor,
    OrangeDomainInitialPos,
    WhiteDomainInitialPos,
    YellowDomainInitialPos
} from "../constants";

export function getActivatedThroneCellPos (cell: Cell): [number, number] {
    switch (cell.domainColor) {
        case DomainColor.ORANGE: return OrangeDomainInitialPos.king[0];
        case DomainColor.YELLOW: return YellowDomainInitialPos.king[0];
        case DomainColor.BLACK: return BlackDomainInitialPos.king[0];
        default: return WhiteDomainInitialPos.king[0];
    }
}