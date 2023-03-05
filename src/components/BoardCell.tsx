import {Cell} from "../classes/Cell";
import {FC} from "react";
import styles from "./BoardCell.module.scss";
import cx from "classnames";
import {CellColor, GradientColor, ThroneSide} from "../classes/constants";
import {GradientBackground} from "./GradientBackground";
import {ChessPiece} from "./ChessPiece";

interface CellProps {
    cell: Cell;
}
export const BoardCell: FC<CellProps> = ({cell}) => {
    const getThroneSidesClass = (cell: Cell): string => {
        if(cell.gradientColor === GradientColor.GRADIENT_YELLOW) {
            return cell.throneSides === ThroneSide.Left ? styles.leftBottomThrone : styles.rightBottomThrone;
        }
        else if(cell.gradientColor === GradientColor.GRADIENT_BLACK) {
            return cell.throneSides === ThroneSide.Right ? styles.leftBottomThrone : styles.leftTopThrone;
        }
        else if(cell.gradientColor === GradientColor.GRADIENT_ORANGE) {
            return cell.throneSides === ThroneSide.Right ? styles.leftTopThrone : styles.rightTopThrone;
        }
        return cell.throneSides === ThroneSide.Right ? styles.rightTopThrone : styles.rightBottomThrone;
    }

    return (
        <button
            disabled={cell.color === CellColor.INACTIVE}
            onClick={() => {console.log('button clicked', cell.row, cell.col)}}
            className={cx(styles.boardCell, {
                [styles.black]: cell.color === CellColor.BLACK,
                [styles.white]: cell.color === CellColor.WHITE || (cell.partOfThrone && !cell.throneSides),
                [getThroneSidesClass(cell)]: cell.throneSides,
        })}>
            {cell.gradientColor && (
                <GradientBackground cell={cell} />
            )}
            {cell.piece && (
                <ChessPiece cell={cell} />
            )}
        </button>
    )
}
