import {FC, ReactNode} from "react";
import styles from "./OptionButton.module.scss";
import cx from "classnames";

interface OptionButtonProps {
    children: ReactNode;
    handleClick: () => void;
    className?: string;
    disabled?: boolean;
}
export const OptionButton: FC<OptionButtonProps> = ({children, handleClick, className, disabled}) => {
    return (
        <button disabled={disabled} onClick={handleClick} className={cx(styles.option, className)}>
            {children}
        </button>
    )
}