import { PlayersSelectionProps } from './PlayersSelection.props';
import styles from './PlayersSelection.module.css';
import { Language } from '@/constants/language.constants';

export const PlayersSelection = ({
    canPlayerBeChoosen,
    language,
}: PlayersSelectionProps) => {
    let hasAvailablePlayers: boolean = false;

    for (let i = 0; i < canPlayerBeChoosen.length; i++) {
        if (canPlayerBeChoosen[i]) {
            hasAvailablePlayers = true;
            break;
        }
    }

    return (
        <>
            {hasAvailablePlayers && (
                <div className={styles.playersSelectionWrapper}>
                    {language === Language.Russian && (
                        <h1 className={styles.playersSelectionTitle}>
                            ВЫТОЛКНУТЬ ИГРОКА
                        </h1>
                    )}
                    {language === Language.English && (
                        <h1 className={styles.playersSelectionTitle}>PUSH PLAYER</h1>
                    )}
                    <div className={styles.playersSelectionInfo}>
                        {canPlayerBeChoosen[0] && (
                            <button className={styles.playerNumberButton}>{1}</button>
                        )}
                        {canPlayerBeChoosen[1] && (
                            <button className={styles.playerNumberButton}>{2}</button>
                        )}
                        {canPlayerBeChoosen[2] && (
                            <button className={styles.playerNumberButton}>{3}</button>
                        )}
                        {canPlayerBeChoosen[3] && (
                            <button className={styles.playerNumberButton}>{4}</button>
                        )}
                        {canPlayerBeChoosen[4] && (
                            <button className={styles.playerNumberButton}>{5}</button>
                        )}
                        {canPlayerBeChoosen[5] && (
                            <button className={styles.playerNumberButton}>{6}</button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
