import {CellColor, DomainPlacement, PieceColor, PieceType} from "../constants";
import {Piece} from "./Piece";
import {CommonMoves} from "../moves/Moves";
import {LeftUpwardDiagonalMove} from "../moves/diagonalMoves/LeftUpwardDiagonalMove";
import {RightUpwardDiagonalMove} from "../moves/diagonalMoves/RightUpwardDiagonalMove";
import {RightDownwardDiagonalMove} from "../moves/diagonalMoves/RightDownwardDiagonalMove";
import {LeftDownwardDiagonalMove} from "../moves/diagonalMoves/LeftDownwardDiagonalMove";

export class Bishop implements Piece {
    type: PieceType = PieceType.Bishop
    color: PieceColor = PieceColor.ORANGE
    originalCellColor: CellColor = CellColor.WHITE
    domainPlacement: DomainPlacement = DomainPlacement.Left

    constructor(color: PieceColor, originalCellColor: CellColor, domainPlacement: DomainPlacement) {
        this.color = color;
        this.originalCellColor = originalCellColor;
        this.domainPlacement = domainPlacement;
    }

    getAllowedMoves(): Array<CommonMoves> {
        return [
            new LeftUpwardDiagonalMove(),
            new RightUpwardDiagonalMove(),
            new RightDownwardDiagonalMove(),
            new LeftDownwardDiagonalMove(),
        ];
    }
}