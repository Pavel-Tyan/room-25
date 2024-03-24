import { Language } from '@/constants/language.constants';
import { Popup } from '../Popup/Popup';
import styles from './FinishGame.module.css';
import { FinishGameProps } from './FinishGame.props';
import { Button } from '../Button/Button';
import { useRouter } from 'next/navigation';

export const FinishGame = ({
    language,
    isOpen,
    onClose,
}: FinishGameProps): JSX.Element => {
    let title: string;
    let text: string;
    if (language === Language.Russian) {
        title = 'ПОДТВЕРДИТЕ ДЕЙСТВИЕ';
        text = 'ВЫ УВЕРЕНЫ, ЧТО ХОТИТЕ ЗАВЕРШИТЬ ИГРУ?';
    } else {
        title = 'CONFIRM';
        text = 'ARE YOU SURE YOU WANT TO FINISH THE GAME?';
    }

    const router = useRouter();

    return (
        <Popup
            hasCloseButton={true}
            language={language}
            title={title}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className={styles.finishGameWrapper}>
                <p className={styles.finishGameText}>{text}</p>
                <div className={styles.buttonsWrapper}>
                    <Button
                        size='small'
                        handleClick={() => {
                            router.push('/');
                        }}
                    >
                        {language === Language.Russian && 'ДА, ЗАВЕРШИТЬ ИГРУ'}
                        {language === Language.English && 'YES, FINISH THE GAME'}
                    </Button>
                    <Button size='small' handleClick={onClose}>
                        {language === Language.Russian && 'НЕТ, ПРОДОЛЖИТЬ ИГРУ'}
                        {language === Language.English && 'NO, CONTINUE THE GAME'}
                    </Button>
                </div>
            </div>
        </Popup>
    );
};
