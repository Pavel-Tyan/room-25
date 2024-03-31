import { useRouter } from 'next/navigation';
import { Button } from '../Button/Button';
import { Popup } from '../Popup/Popup';
import { GameOverProps } from './GameOver.props';
import { Language } from '@/constants/language.constants';
import styles from './GameOver.module.css';
import { Htag } from '../Htag/Htag';

export const GameOver = ({ isVictory, isOpen, language }: GameOverProps): JSX.Element => {
    const router = useRouter();

    let title: string = '';
    let text: string = '';
    if (language === Language.Russian) {
        title = 'ИГРА ОКОНЧЕНА';
    } else {
        title = 'GAME OVER';
    }

    if (isVictory) {
        if (language === Language.Russian) {
            text = 'ВЫ ПОБЕДИЛИ';
        } else {
            text = 'YOU WON';
        }
    } else {
        if (language === Language.Russian) {
            text = 'ВЫ ПРОИГРАЛИ';
        } else {
            text = 'YOU LOSE';
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
                <Htag tag={'h3'}>{text}</Htag>
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
