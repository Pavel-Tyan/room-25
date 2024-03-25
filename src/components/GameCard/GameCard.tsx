import { Room } from '@/constants/room.constants';
import {
    CardInfo,
    cardsInfoEnglish,
    cardsInfoRussian,
} from '@/constants/rules.constants';
import { Card } from '../Card/Card';
import { GameCardProps } from './GameCard.props';
import { Language } from '@/constants/language.constants';
import Image from 'next/image';
import { Player } from '../Player/Player';
import styles from './GameCard.module.css';
import cn from 'classnames';

export const GameCard = ({
    hasOpened,
    hasPlayerInRoom,
    room,
    language,
    isAvailable,
}: GameCardProps): JSX.Element => {
    let cardsInfoMap = new Map<Room, CardInfo>();
    let cardsInfo: CardInfo[];

    if (language === Language.Russian) {
        cardsInfo = cardsInfoRussian;
    } else {
        cardsInfo = cardsInfoEnglish;
    }

    for (let currentCardInfo of cardsInfo) {
        cardsInfoMap.set(currentCardInfo.room, currentCardInfo);
    }

    return (
        <button
            className={cn(styles.button, {
                [styles.activeButton]: isAvailable,
            })}
        >
            <Card color={hasOpened ? 'white' : 'black'}>
                <Image
                    width={50}
                    height={50}
                    src={hasOpened ? cardsInfoMap.get(room).path : './question.svg'}
                    alt={hasOpened ? cardsInfoMap.get(room).alt : 'question mark icon'}
                />
                {/* Здесь можно проверить на hasOpened */}
                {hasPlayerInRoom[0] && <Player number={1} language={language}></Player>}
                {hasPlayerInRoom[1] && <Player number={2} language={language}></Player>}
                {hasPlayerInRoom[2] && <Player number={3} language={language}></Player>}
                {hasPlayerInRoom[3] && <Player number={4} language={language}></Player>}
                {hasPlayerInRoom[4] && <Player number={5} language={language}></Player>}
                {hasPlayerInRoom[5] && <Player number={6} language={language}></Player>}
            </Card>
        </button>
    );
};
