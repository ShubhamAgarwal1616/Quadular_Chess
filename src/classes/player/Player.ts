import {DomainColor, PieceColor} from "../constants";
import {Piece} from "../pieces/Piece";

export class Player {
    name: string = '';
    originalPieceColor: PieceColor = PieceColor.ORANGE;
    originalDomainColor: DomainColor = DomainColor.ORANGE;
    controlOverPieces: Array<PieceColor> = [];

    constructor(name: string, domainColor: DomainColor, color: PieceColor) {
        this.name = name;
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