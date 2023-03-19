import cx from "classnames";
import {Cell} from "../classes/Cell";
import {FC} from "react";
import {DomainColor, DomainPlacement, ThroneSide} from "../classes/constants";
import styles from "./GradientBackground.module.scss";

interface GradientBackgroundProps {
    cell: Cell;
    lastMovePos: boolean;
}

export const GradientBackground: FC<GradientBackgroundProps> = ({cell, lastMovePos}) => {
    const getCssColor = (): string => {
        switch (cell.domainColor) {
            case DomainColor.YELLOW: return '--yellowGradient';
            case DomainColor.WHITE: return '--whiteGradient';
            case DomainColor.ORANGE: return '--orangeGradient';
            default: return '--blackGradient';
        }
    }

    const getDegree = (): string => {
        switch (cell.domainPlacement) {
            case DomainPlacement.Left: return cell.throneSides === ThroneSide.Left ? '135deg' : '225deg';
            case DomainPlacement.Top: return cell.throneSides === ThroneSide.Left ? '45deg' : '135deg';
            case DomainPlacement.Bottom: return cell.throneSides === ThroneSide.Left ? '225deg' : '315deg';
            default: return cell.throneSides === ThroneSide.Left ? '315deg' : '45deg';
        }
    }

    const getStyles = () => {
        return cell.throneSides ? {
            backgroundColor: 'transparent',
            backgroundImage: `-webkit-linear-gradient(${getDegree()}, var(${getCssColor()}) 50%, rgba(0, 0, 0, 0.0) 50%)`,
        } : {};
    }

    const getGradientClass = (): string => {
        switch (cell.domainColor) {
            case DomainColor.WHITE: return styles.whiteGradient;
            case DomainColor.YELLOW: return styles.yellowGradient;
            case DomainColor.ORANGE: return styles.orangeGradient;
            default: return styles.blackGradient;
        }
    }

    return (
        <div className={cx(getGradientClass(), {
            [styles.lastMoveGradient]: lastMovePos,
        })} style={getStyles()}/>
    )
}