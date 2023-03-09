import {DomainColor, PieceColor} from "../constants";
import {Piece} from "../pieces/Piece";

export class Player {
    originalPieceColor: PieceColor = PieceColor.ORANGE;
    originalDomainColor: DomainColor = DomainColor.ORANGE;
    controlOverPieces: Array<PieceColor> = [];

    constructor(domainColor: DomainColor, color: PieceColor) {
        this.originalPieceColor = color;
        this.originalDomainColor = domainColor;
        this.controlOverPieces.push(color);
    }

    addColorInControl(color: PieceColor) {
        this.controlOverPieces.push(color);
    }

    canControlPiece(piece?: Piece | null): Boolean {
        return !!piece && this.controlOverPieces.includes(piece.color);
    }
}