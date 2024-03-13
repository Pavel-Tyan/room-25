import { Language } from '@/constants/language.constants';
import { RoundCounterProps } from './RoundCounter.props';
import styles from './RoundCounter.module.css';

export const RoundCounter = ({
    language,
    roundsLeft,
}: RoundCounterProps): JSX.Element => {
    return (
        <div className={styles.counterWrapper}>
            <p className={styles.counterText}>
                {language === Language.Russian && 'Осталось раундов'}
                {language === Language.English && 'Rounds left'}
            </p>
            <div className={styles.counter}>{roundsLeft}</div>
        </div>
    );
};
