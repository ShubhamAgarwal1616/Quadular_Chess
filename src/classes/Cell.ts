import {BOARD_SIZE, CellColor, DOMAIN_SIZE, DomainColor, DomainPlacement, ThroneSide} from "./constants";
import {Piece} from "./pieces/Piece";
import {PieceFactory} from "./pieces/PieceFactory";
import {Bishop} from "./pieces/Bishop";
import {Pawn} from "./pieces/Pawn";

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

    static updateStateFromJson(json: Cell): Cell {
        const cell = new Cell(json.row, json.col);
        cell.color = json.color;
        cell.domainPlacement = json.domainPlacement;
        cell.domainColor = json.domainColor;
        cell.partOfThrone = json.partOfThrone;
        cell.throneSides = json.throneSides;
        if (json.piece) {
            cell.piece = new PieceFactory().getPieceObject(json.piece.type, json.piece.color, json.piece.domainPlacement, cell.color);
            if (cell.piece instanceof Bishop) {
                cell.piece.updateStateFromJson(json.piece as Bishop);
            }
            else if (cell.piece instanceof Pawn) {
                cell.piece.updateStateFromJson(json.piece as Pawn);
            }
        }
        return cell;
    }
}