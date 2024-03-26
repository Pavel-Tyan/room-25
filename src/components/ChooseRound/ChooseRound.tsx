import { Language } from '@/constants/language.constants';
import { Htag } from '../Htag/Htag';
import { Popup } from '../Popup/Popup';
import { ChooseRoundProps } from './ChooseRound.props';
import { Button } from '../Button/Button';
import styles from './ChooseRound.module.css';

export const ChooseRound = ({
    language,
    isOpen,
    setRoundNumber,
    closePopup,
}: ChooseRoundProps): JSX.Element => {
    const chooseFirstRound = () => {
        setRoundNumber(1);
        closePopup();
    };

    const chooseSecondRound = () => {
        setRoundNumber(2);
        closePopup();
    };
    return (
        <Popup
            language={language}
            hasCloseButton={false}
            isOpen={isOpen}
            title={
                language === Language.Russian
                    ? `ВЫБОР РАУНДА ДЛЯ ДЕЙСТВИЯ`
                    : `CHOOSE ROUND FOR ACTION`
            }
        >
            <div className={styles.chooseRoundWrapper}>
                <Htag tag='h3'>
                    {language === Language.Russian &&
                        'Использовать действие в этом раунде?'}
                    {language === Language.English && 'Use action in this round?'}
                </Htag>
                <Button size='large' handleClick={chooseFirstRound}>
                    {language === Language.Russian && 'ДА'}
                    {language === Language.English && 'YES'}
                </Button>
                <Button size='large' handleClick={chooseSecondRound}>
                    {language === Language.Russian && 'НЕТ'}
                    {language === Language.English && 'NO'}
                </Button>
            </div>
        </Popup>
    );
};
