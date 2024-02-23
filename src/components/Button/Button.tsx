import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import cn from 'classnames';

export const Button = ({ size, children, className }: ButtonProps): JSX.Element => {
    return (
        <button
            className={cn(styles.button, className, {
                [styles.large]: size == 'large',
                [styles.small]: size == 'small',
            })}
        >
            <div>{children}</div>
        </button>
    );
};
