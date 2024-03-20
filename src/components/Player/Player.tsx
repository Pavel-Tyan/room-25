import { PlayerProps } from './Player.props';
import styles from './Player.module.css';
import Image from 'next/image';
import { Language } from '@/constants/language.constants';
import cn from 'classnames';

export const Player = ({ number, language }: PlayerProps): JSX.Element => {
    return (
        <div
            className={cn(styles.playerWrapper, {
                [styles.player1]: number == 1,
                [styles.player2]: number == 2,
                [styles.player3]: number == 3,
                [styles.player4]: number == 4,
                [styles.player5]: number == 5,
                [styles.player6]: number == 6,
            })}
        >
            <div className={styles.playerNumber}>{number}</div>
            <Image
                width={25}
                height={20}
                src={'./prisoner.svg'}
                alt={
                    language === Language.Russian
                        ? 'Иконка игрового персонажа'
                        : 'Game character icon'
                }
            />
        </div>
    );
};
