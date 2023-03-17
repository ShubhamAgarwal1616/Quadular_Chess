import {OptionButton} from "./OptionButton";
import {DomainColor} from "../../classes/constants";
import {FC} from "react";
import styles from './ColorOptions.module.scss';
import Pawn from "../../assets/images/pawn.png";
import Image from 'next/image'

interface ColorOptionsProps {
    selectedColors: Array<DomainColor>;
    addDomainColor: (color: DomainColor) => void;
    count: number;
}
export const ColorOptions: FC<ColorOptionsProps> = ({count, selectedColors, addDomainColor}) => {
    const colorOptions = [
        {icon: <Image src={Pawn} className={styles.orange} alt='pawn'/>, val: DomainColor.ORANGE},
        {icon: <Image src={Pawn} className={styles.yellow} alt='pawn'/>, val: DomainColor.YELLOW},
        {icon: <Image src={Pawn} className={styles.white} alt='pawn'/>, val: DomainColor.WHITE},
        {icon: <Image src={Pawn} className={styles.black} alt='pawn'/>,  val: DomainColor.BLACK},
    ]
    return (
        <>
            <h2>{`Select ${count} Colours`}</h2>
            {colorOptions.map(option => (
                <OptionButton
                    key={option.val}
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