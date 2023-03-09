import {OptionButton} from "./OptionButton";
import {DomainColor} from "../../classes/constants";
import {FC} from "react";
import styles from './ColorOptions.module.scss';
import cx from "classnames";

interface ColorOptionsProps {
    selectedColors: Array<DomainColor>;
    addDomainColor: (color: DomainColor) => void;
}
export const ColorOptions: FC<ColorOptionsProps> = ({selectedColors, addDomainColor}) => {
    const colorOptions = [
        {icon: <span className={cx('fas', styles.orange)}>&#xf43f;</span>, val: DomainColor.ORANGE},
        {icon: <span className={cx('fas', styles.yellow)}>&#xf43f;</span>, val: DomainColor.YELLOW},
        {icon: <span className={cx('fas', styles.white)}>&#xf43f;</span>, val: DomainColor.WHITE},
        {icon: <span className={cx('fas', styles.black)}>&#xf43f;</span>,  val: DomainColor.BLACK},
    ]
    return (
        <>
            <h2>Select Colours</h2>
            {colorOptions.map(option => (
                <OptionButton
                    handleClick={() => addDomainColor(option.val)}
                    className={selectedColors.includes(option.val) ? styles.selected : ''}
                    disabled={selectedColors.includes(option.val)}
                >
                    {option.icon}
                </OptionButton>
            ))}
        </>
    )
}