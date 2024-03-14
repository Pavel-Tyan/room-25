import { CardProps } from './Card.props';
import styles from './Card.module.css';
import cn from 'classnames';

export const Card = ({ children, color }: CardProps): JSX.Element => {
    return (
        <div className={styles.tileFirstBackground}>
            <div
                className={cn(styles.tileSecondBackground, {
                    [styles.tileSecondBackgroundBlack]: color == 'black',
                    [styles.tileSecondBackgroundWhite]: color == 'white',
                })}
            >
                {children}
            </div>
        </div>
    );
};
