import {DomainColor, PieceColor} from "../constants";
import {Piece} from "../pieces/Piece";
import {Timer} from "./Timer";

export class Player {
    name: string = '';
    originalPieceColor: PieceColor = PieceColor.ORANGE;
    originalDomainColor: DomainColor = DomainColor.ORANGE;
    controlOverPieces: Array<PieceColor> = [];
    timer: Timer = new Timer(0);

    constructor(name: string, domainColor: DomainColor, color: PieceColor, timeInMinutes: number) {
        this.name = name;
        this.originalPieceColor = color;
        this.originalDomainColor = domainColor;
        this.controlOverPieces.push(color);
        this.timer = new Timer(timeInMinutes * 60);
    }

    addColorInControl(color: PieceColor) {
        this.controlOverPieces.push(color);
    }

    canControlPiece(piece?: Piece | null): Boolean {
        return !!piece && this.controlOverPieces.includes(piece.color);
    }
}