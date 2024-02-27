import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import cn from 'classnames';

export const Button = ({
    size,
    children,
    handleClick = () => {},
}: ButtonProps): JSX.Element => {
    return (
        <button
            className={cn(styles.button, {
                [styles.buttonLarge]: size == 'large',
                [styles.buttonSmall]: size == 'small',
            })}
            onClick={handleClick}
        >
            <div>{children}</div>
        </button>
    );
};
