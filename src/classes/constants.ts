export const BOARD_SIZE = 17;
export const DOMAIN_SIZE = 5;

export const enum ThroneSide {
    Left = 'left',
    Right = 'right',
    Top = 'top',
}

export enum PieceType {
    Pawn = 'pawn',
    Queen = 'queen',
    Bishop = 'bishop',
    Knight = 'knight',
    Rook = 'rook',
    Prince = 'prince',
    King = 'king',
    // YoungKing = 'youngKing',
}

export const OrangeDomainInitialPos: {[key in PieceType]: number[][]} = {
    pawn: [[12, 6],[12, 7],[12, 8],[12, 9],[12, 10]],
    rook: [[13, 6], [13,10]],
    knight: [[13, 7], [13,9]],
    bishop: [[13, 8], [14,8]],
    queen: [[14, 7]],
    prince: [[14, 9]],
    king: [[15, 8]],
}

export const YellowDomainInitialPos: {[key in PieceType]: number[][]} = {
    pawn: [[4, 6],[4, 7],[4,8],[4,9],[4,10]],
    rook: [[3, 6], [3,10]],
    knight: [[3, 7], [3,9]],
    bishop: [[3, 8], [2,8]],
    queen: [[2, 9]],
    prince: [[2, 7]],
    king: [[1, 8]],
}

export const BlackDomainInitialPos: {[key in PieceType]: number[][]} = {
    pawn: [[10, 12],[9, 12],[8, 12],[7, 12],[6,12]],
    rook: [[10, 13], [6, 13]],
    knight: [[9, 13], [7, 13]],
    bishop: [[8, 13], [8, 14]],
    queen: [[9, 14]],
    prince: [[7, 14]],
    king: [[8, 15]],
}

export const WhiteDomainInitialPos: {[key in PieceType]: number[][]} = {
    pawn: [[10, 4],[9, 4],[8, 4],[7, 4],[6, 4]],
    rook: [[10, 3], [6, 3]],
    knight: [[9, 3], [7, 3]],
    bishop: [[8, 3], [8, 2]],
    queen: [[7, 2]],
    prince: [[9, 2]],
    king: [[8, 1]],
}

export enum CellColor {
    BLACK = 'black',
    WHITE = 'white',
    INACTIVE = 'grey',
}

export enum GradientColor {
    GRADIENT_ORANGE = 'gradient_orange',
    GRADIENT_YELLOW = 'gradient_yellow',
    GRADIENT_BLACK = 'gradient_black',
    GRADIENT_WHITE = 'gradient_white',
}

export enum PieceColor {
    BLACK = 'black',
    WHITE = 'white',
    ORANGE = 'orange',
    YELLOW = 'yellow',
}