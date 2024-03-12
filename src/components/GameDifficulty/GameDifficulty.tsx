import {
    buttonsTitlesEnglish,
    buttonsTitlesRussian,
    gameDifficultyTitleEnglish,
    gameDifficultyTitleRussian,
} from '@/constants/gameDifficulty.constants';
import { Popup } from '../Popup/Popup';
import { GameDifficultyProps } from './GameDifficulty.props';
import { Language } from '@/constants/language.constants';
import { Button } from '../Button/Button';
import styles from './GameDifficulty.module.css';
import { useDispatch } from 'react-redux';
import { setRoomsBeginnerMode, setRoomsExpertMode } from '@/redux/gameRoomsSlice';
import { useRouter } from 'next/navigation';

export const GameDifficulty = ({
    language,
    isOpen,
    onClose,
}: GameDifficultyProps): JSX.Element => {
    let buttonsTitles: string[];
    let popupTitle: string;

    if (language === Language.Russian) {
        buttonsTitles = buttonsTitlesRussian;
        popupTitle = gameDifficultyTitleRussian;
    } else {
        buttonsTitles = buttonsTitlesEnglish;
        popupTitle = gameDifficultyTitleEnglish;
    }

    const router = useRouter();

    const dispatch = useDispatch();

    const clickHandlers: (() => void)[] = [
        () => {
            dispatch(setRoomsBeginnerMode());
            router.push('/game');
        },
        () => {
            dispatch(setRoomsExpertMode());
            router.push('/game');
        },
        // Остальные режимы
        () => {
            router.push('/game');
        },
        () => {
            router.push('/game');
        },
    ];

    return (
        <Popup isOpen={isOpen} onClose={onClose} language={language} title={popupTitle}>
            <div className={styles.buttonsWrapper}>
                {buttonsTitles.map((title, index) => (
                    <Button key={title} size='large' handleClick={clickHandlers[index]}>
                        {title}
                    </Button>
                ))}
            </div>
        </Popup>
    );
};
