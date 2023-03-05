import cx from "classnames";
import {Cell} from "../classes/Cell";
import {FC} from "react";
import {DomainColor, ThroneSide} from "../classes/constants";
import styles from "./GradientBackground.module.scss";

interface GradientBackgroundProps {
    cell: Cell;
}

export const GradientBackground: FC<GradientBackgroundProps> = ({cell}) => {
    function getClasses(
        cell: Cell,
        gradientClass: string,
        leftThroneClass: string,
        rightThroneClass: string,
    ) {
        let classes = gradientClass;
        if (cell.throneSides === ThroneSide.Left) {
            classes = `${classes} ${leftThroneClass}`
        } else if (cell.throneSides === ThroneSide.Right) {
            classes = `${classes} ${rightThroneClass}`
        }
        return classes;
    }

    const getGradientClass = (cell: Cell): string => {
        switch (cell.domainColor) {
            case DomainColor.WHITE:
                return getClasses(cell, styles.whiteGradient, styles.leftWhiteThroneSide, styles.rightWhiteThroneSide);
            case DomainColor.YELLOW:
                return getClasses(cell, styles.yellowGradient, styles.leftYellowThroneSide, styles.rightYellowThroneSide);
            case DomainColor.ORANGE:
                return getClasses(cell, styles.orangeGradient, styles.leftOrangeThroneSide, styles.rightOrangeThroneSide);
            case DomainColor.BLACK:
                return getClasses(cell, styles.blackGradient, styles.leftBlackThroneSide, styles.rightBlackThroneSide);
            default:
                return '';
        }
    }

    return (
        <div className={cx(getGradientClass(cell))}/>
    )
}