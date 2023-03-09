import {BOARD_SIZE, CellColor, DOMAIN_SIZE, DomainColor, DomainPlacement, ThroneSide} from "./constants";
import {Piece} from "./pieces/Piece";
import {dom} from "@fortawesome/fontawesome-svg-core";

export class Cell {
    row: number;
    col: number;
    color: CellColor = CellColor.INACTIVE;
    domainColor?: DomainColor
    piece?: Piece | null;
    partOfThrone: boolean = false;
    throneSides?: ThroneSide;
    domainPlacement?: DomainPlacement;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
        if (row >= DOMAIN_SIZE && row < (BOARD_SIZE - DOMAIN_SIZE) && col >= DOMAIN_SIZE && col < (BOARD_SIZE - DOMAIN_SIZE)) {
            this.color = (row + col) % 2 === 1 ? CellColor.BLACK : CellColor.WHITE;
        }
    }

    setPiece(piece?: Piece | null) {
        this.piece = piece
    }

    setDomainColor(color: DomainColor) {
        this.domainColor = color
        this.color = (this.row + this.col) % 2 === 1 ? CellColor.BLACK : CellColor.WHITE;
    }

    setDomainPlacement(domainPlacement: DomainPlacement) {
        this.domainPlacement = domainPlacement;
    }

    setAsInactiveThroneCell(color: DomainColor, domainPlacement: DomainPlacement, throneSide?: ThroneSide) {
        this.domainColor = color
        this.partOfThrone = true;
        this.throneSides = throneSide;
        this.domainPlacement = domainPlacement;
    }

    setAsActiveThroneCell(color: DomainColor, domainPlacement: DomainPlacement) {
        this.color = CellColor.WHITE;
        this.setAsInactiveThroneCell(color, domainPlacement);
    }
}