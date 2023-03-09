import {DomainColor, PieceColor} from "./constants";

export const getPieceColorForDomain = (domain: DomainColor): PieceColor => {
    switch (domain) {
        case DomainColor.BLACK: return PieceColor.BLACK;
        case DomainColor.ORANGE: return PieceColor.ORANGE;
        case DomainColor.YELLOW: return PieceColor.YELLOW;
        default: return PieceColor.WHITE;
    }
}
