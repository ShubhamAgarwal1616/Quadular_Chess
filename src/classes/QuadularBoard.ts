import {Cell} from "./Cell";
import {
    BOARD_SIZE,
    BottomDomainInitialPos,
    DomainColor,
    DomainPlacement,
    LeftDomainInitialPos,
    PieceColor,
    PieceType,
    RightDomainInitialPos,
    ThroneSide,
    TopDomainInitialPos
} from "./constants";
import {PieceFactory} from "./pieces/PieceFactory";
import {Pawn} from "./pieces/Pawn";
import {Piece} from "./pieces/Piece";

export class QuadularBoard {
    cells: Array<Array<Cell>> = [];
    pieceFactory: PieceFactory = new PieceFactory();

    constructor() {
        this.initializeCells();
    }

    private initializeCells() {
        this.cells = [...Array(BOARD_SIZE)].map((_, row) => {
            return [...Array(BOARD_SIZE)].map((_, col) => new Cell(row, col))
        });
    }

    private initializeDomain(
        withPieces: boolean,
        initialPos: {[key in PieceType]: number[][]},
        gradientColor: DomainColor,
        pieceColor: PieceColor,
        domainPlacement: DomainPlacement,
    ) {
        for (let type in initialPos) {
            const pieceType = type as PieceType;
            initialPos[pieceType].forEach(pos => {
                const cell = this.cells[pos[0]][pos[1]];
                cell.setDomainColor(gradientColor);
                cell.setDomainPlacement(domainPlacement);
                if (withPieces) {
                    cell.setPiece(this.pieceFactory.getPieceObject(pieceType, pieceColor, domainPlacement, cell.color));
                }
            })
        }
    }

    initializeBottomDomain(domainColor: DomainColor, pieceColor: PieceColor, withPieces: boolean) {
        this.initializeDomain(withPieces, BottomDomainInitialPos, domainColor, pieceColor, DomainPlacement.Bottom);
        const kingPos = BottomDomainInitialPos.king[0];
        this.cells[kingPos[0]][kingPos[1]].setAsActiveThroneCell(domainColor, DomainPlacement.Bottom);
        this.cells[kingPos[0]][kingPos[1] - 1].setAsInactiveThroneCell(domainColor, DomainPlacement.Bottom, ThroneSide.Left);
        this.cells[kingPos[0]][kingPos[1] + 1].setAsInactiveThroneCell(domainColor, DomainPlacement.Bottom, ThroneSide.Right);
    }

    initializeTopDomain(domainColor: DomainColor, pieceColor: PieceColor, withPieces: boolean) {
        this.initializeDomain(withPieces, TopDomainInitialPos, domainColor, pieceColor, DomainPlacement.Top);
        const kingPos = TopDomainInitialPos.king[0];
        this.cells[kingPos[0]][kingPos[1]].setAsActiveThroneCell(domainColor, DomainPlacement.Top);
        this.cells[kingPos[0]][kingPos[1] - 1].setAsInactiveThroneCell(domainColor, DomainPlacement.Top, ThroneSide.Right);
        this.cells[kingPos[0]][kingPos[1] + 1].setAsInactiveThroneCell(domainColor, DomainPlacement.Top, ThroneSide.Left);
    }

    initializeRightDomain(domainColor: DomainColor, pieceColor: PieceColor, withPieces: boolean) {
        this.initializeDomain(withPieces, RightDomainInitialPos, domainColor, pieceColor, DomainPlacement.Right);
        const kingPos = RightDomainInitialPos.king[0];
        this.cells[kingPos[0]][kingPos[1]].setAsActiveThroneCell(domainColor, DomainPlacement.Right);
        this.cells[kingPos[0] - 1][kingPos[1]].setAsInactiveThroneCell(domainColor, DomainPlacement.Right, ThroneSide.Right);
        this.cells[kingPos[0] + 1][kingPos[1]].setAsInactiveThroneCell(domainColor, DomainPlacement.Right, ThroneSide.Left);
    }

    initializeLeftDomain(domainColor: DomainColor, pieceColor: PieceColor, withPieces: boolean) {
        this.initializeDomain(withPieces, LeftDomainInitialPos, domainColor, pieceColor, DomainPlacement.Left);
        const kingPos = LeftDomainInitialPos.king[0];
        this.cells[kingPos[0]][kingPos[1]].setAsActiveThroneCell(domainColor, DomainPlacement.Left);
        this.cells[kingPos[0] - 1][kingPos[1]].setAsInactiveThroneCell(domainColor, DomainPlacement.Left, ThroneSide.Left);
        this.cells[kingPos[0] + 1][kingPos[1]].setAsInactiveThroneCell(domainColor, DomainPlacement.Left, ThroneSide.Right);
    }

    movePiece(sourceCell: Cell, targetCell: Cell) {
        // TODO: implement pawn promotion
        if (sourceCell.piece?.type === PieceType.Pawn) {
            (sourceCell.piece as Pawn).setMovedToTrue();
        }
        targetCell.setPiece(sourceCell.piece);
        sourceCell.setPiece(null);
    }

    promotePrince(cell: Cell, piece: Piece) {
        cell.setPiece(this.pieceFactory.getPieceObject(PieceType.YoungKing, piece.color, piece.domainPlacement, cell.color));
    }
}