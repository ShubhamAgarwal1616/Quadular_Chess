import {FC, ReactNode} from "react";
import styles from "./OptionButton.module.scss";
import cx from "classnames";

interface OptionButtonProps {
    children: ReactNode;
    handleClick: () => void;
    className?: string;
    disabled?: boolean;
    textOption?: boolean;
}
export const OptionButton: FC<OptionButtonProps> = ({
        children,
        handleClick,
        className,
        disabled,
        textOption,
    }) => {
    const buttonClass = textOption ? styles.optionText : styles.option;
    return (
        <button disabled={disabled} onClick={handleClick} className={cx(buttonClass, className)}>
            {children}
        </button>
    )
}