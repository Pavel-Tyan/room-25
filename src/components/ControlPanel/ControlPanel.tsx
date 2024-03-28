import { ArrowButton } from '../ArrowButton/ArrowButton';
import { ControlPanelProps } from './ControlPanel.props';
import styles from './ControlPanel.module.css';
import { Language } from '@/constants/language.constants';

export const ControlPanel = ({ language }: ControlPanelProps): JSX.Element => {
    return (
        <div className={styles.controlPanelWrapper}>
            {language === Language.Russian && (
                <h1 className={styles.controlPanelTitle}>СДВИНУТЬ</h1>
            )}
            {language === Language.English && (
                <h1 className={styles.controlPanelTitle}>SHIFT</h1>
            )}
            <div className={styles.controlPanelsButtons}>
                <ArrowButton direction='horizontal' language={language} />
                <ArrowButton direction='vertical' language={language} />
            </div>
        </div>
    );
};
