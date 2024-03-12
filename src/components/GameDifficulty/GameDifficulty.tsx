import {
    buttonsTitlesEnglish,
    buttonsTitlesRussian,
    gameDifficultyTitleEnglish,
    gameDifficultyTitleRussian,
} from '@/constants/gameDifficulty.constants';
import { Popup } from '../Popup/Popup';
import { GameDifficultyProps } from './GameDifficulty.props';
import { Languages } from '@/constants/language.constants';
import { Button } from '../Button/Button';
import styles from './GameDifficulty.module.css';

export const GameDifficulty = ({
    language,
    isOpen,
    onClose,
}: GameDifficultyProps): JSX.Element => {
    let buttonsTitles: string[];
    let popupTitle: string;

    if (language === Languages.Russian) {
        buttonsTitles = buttonsTitlesRussian;
        popupTitle = gameDifficultyTitleRussian;
    } else {
        buttonsTitles = buttonsTitlesEnglish;
        popupTitle = gameDifficultyTitleEnglish;
    }

    return (
        <Popup isOpen={isOpen} onClose={onClose} language={language} title={popupTitle}>
            <div className={styles.buttonsWrapper}>
                {buttonsTitles.map((title) => (
                    <Button key={title} size='large'>
                        {title}
                    </Button>
                ))}
            </div>
        </Popup>
    );
};
