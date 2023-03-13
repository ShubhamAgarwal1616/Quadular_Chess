import cx from "classnames";
import styles from "./ChessPiece.module.scss";
import {Cell} from "../classes/Cell";
import {PieceColor, PieceType} from "../classes/constants";
import {FC} from "react";
import knight from '../assets/images/knight.png';
import Pawn from '../assets/images/pawn.png';
import Bishop from '../assets/images/bishop.png';
import Rook from '../assets/images/rook.png';
import Queen from '../assets/images/queen.png';
import King from '../assets/images/king.png';
import Prince from '../assets/images/prince.png';
import YoungKing from '../assets/images/youngKing.png';

interface ChessPieceProps {
    cell: Cell;
}

export const ChessPiece: FC<ChessPieceProps> = ({cell}) => {
    const getPiece = (cell: Cell) => {
        switch (cell.piece?.type) {
            case PieceType.Pawn: return <img src={Pawn}  alt='pawn'/>
            case PieceType.Queen: return <img src={Queen}  alt='queen'/>
            case PieceType.Rook: return <img src={Rook}  alt='rook'/>
            case PieceType.Knight: return <img src={knight}  alt='knight'/>
            case PieceType.King: return <img src={King}  alt='king'/>
            case PieceType.Bishop: return <img src={Bishop}  alt='bishop'/>
            case PieceType.Prince: return <img src={Prince}  alt='prince'/>
            case PieceType.YoungKing: return <img src={YoungKing}  alt='youngKing'/>
        }
    }

    const getPieceColorClass = (cell: Cell) => {
        switch (cell.piece?.color) {
            case PieceColor.ORANGE: return styles.orangePiece
            case PieceColor.YELLOW: return styles.yellowPiece
            case PieceColor.BLACK: return styles.blackPiece
            case PieceColor.WHITE: return styles.whitePiece
        }
    }

    return (
        <div className={cx('fas', styles.pieceIcon, getPieceColorClass(cell))}>
            {getPiece(cell)}
        </div>
    )
}