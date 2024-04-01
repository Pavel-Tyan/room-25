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
    let popupTitle: string;

    if (language === Language.Russian) {
        popupTitle = 'УРОВЕНЬ СЛОЖНОСТИ';
    } else {
        popupTitle = 'GAME DIFFICULTY';
    }

    const router = useRouter();

    const dispatch = useDispatch();

    return (
        <Popup
            hasCloseButton={true}
            isOpen={isOpen}
            onClose={onClose}
            language={language}
            title={popupTitle}
        >
            <div className={styles.buttonsWrapper}>
                <Button
                    size='large'
                    handleClick={() => {
                        router.push('/tutorial');
                    }}
                >
                    {language === Language.Russian && 'ОБУЧЕНИЕ'}
                    {language === Language.English && 'TUTORIAL'}
                </Button>

                <Button
                    size='large'
                    handleClick={() => {
                        dispatch(setRoomsBeginnerMode());
                        router.push('/game');
                    }}
                >
                    {language === Language.Russian && 'НОВИЧЕК'}
                    {language === Language.English && 'BEGINNER'}
                </Button>

                <Button
                    size='large'
                    handleClick={() => {
                        dispatch(setRoomsExpertMode());
                        router.push('/game');
                    }}
                >
                    {language === Language.Russian && 'ЭКСПЕРТ'}
                    {language === Language.English && 'EXPERT'}
                </Button>

                <Button
                    size='large'
                    handleClick={() => {
                        router.push('/custom');
                    }}
                >
                    {language === Language.Russian && 'КАСТОМНЫЙ РЕЖИМ'}
                    {language === Language.English && 'CUSTOM'}
                </Button>
            </div>
        </Popup>
    );
};
