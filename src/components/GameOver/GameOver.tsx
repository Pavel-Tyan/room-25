import { useRouter } from 'next/navigation';
import { Button } from '../Button/Button';
import { Popup } from '../Popup/Popup';
import { GameOverProps } from './GameOver.props';
import { Language } from '@/constants/language.constants';
import styles from './GameOver.module.css';

export const GameOver = ({ isVictory, isOpen, language }: GameOverProps): JSX.Element => {
    const router = useRouter();

    let title: string = '';

    if (isVictory) {
        if (language === Language.Russian) {
            title = 'ПОБЕДА';
        } else {
            title = 'VICTORY';
        }
    } else {
        if (language === Language.Russian) {
            title = 'ПРОИГРЫШ';
        } else {
            title = 'DEFEAT';
        }
    }
    return (
        <Popup
            hasCloseButton={false}
            language={language}
            title={title}
            isOpen={isOpen}
            onClose={() => {}}
        >
            <div className={styles.buttonWrapper}>
                <Button
                    size='small'
                    handleClick={() => {
                        router.push('/');
                    }}
                >
                    OK
                </Button>
            </div>
        </Popup>
    );
};
