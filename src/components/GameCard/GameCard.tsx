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

export const GameCard = ({
    hasOpened,
    hasPlayerInRoom,
    room,
    language,
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
        <Card color={hasOpened ? 'white' : 'black'}>
            <Image
                width={50}
                height={50}
                src={hasOpened ? cardsInfoMap.get(room).path : './question.svg'}
                alt={hasOpened ? cardsInfoMap.get(room).alt : 'question mark icon'}
            />
        </Card>
    );
};
