import { Language } from '@/constants/language.constants';
import { RoundCounter } from '../RoundCounter/RoundCounter';
import styles from './Game.module.css';
import { Room } from '@/constants/room.constants';
import { GameCard } from '../GameCard/GameCard';
import { useState } from 'react';
import { SelectActions } from '../SelectActions/SelectActions';

// Этот тип нужен для того, чтобы при использовании map()
// у каждого элемента был уникальный ключ
type RoomInfo = {
    room: Room;
    key: number;
};

const ROOM_COUNT: number = 25;

export const Game = (): JSX.Element => {
    let language: Language;

    if (sessionStorage.getItem('language') === Language.English) {
        language = Language.English;
    } else {
        language = Language.Russian;
    }

    const rooms: Room[] = sessionStorage
        .getItem('cards')
        ?.split('/')
        .map((room) => Number(room));

    const roomsInfo: RoomInfo[] = [];

    for (let i = 0; i < rooms.length; i++) {
        roomsInfo.push({
            room: rooms[i],
            key: i,
        });
    }

    const hasPlayerInRoom: boolean[][] = Array(25).fill([
        false,
        false,
        false,
        false,
        false,
        false,
    ]);
    hasPlayerInRoom[12] = [true, true, true, true, true, true];

    // Количество действий, который выбрал игрок
    const [actionsCount, setActionsCount] = useState<number>(2);
    // Открыто ли модальное окно для выбора действий
    const [isSelectActionsOpen, setIsSelectActionsOpen] = useState<boolean>(true);

    return (
        <>
            <div className={styles.gameWrapper}>
                <RoundCounter language={language} roundsLeft={10} />
                <div className={styles.rooms}>
                    {roomsInfo.map((currentRoom, i) => (
                        <GameCard
                            key={currentRoom.key}
                            // Центральная комната открыта в начале игры
                            hasOpened={i == 12 ? true : false}
                            hasPlayerInRoom={hasPlayerInRoom[i]}
                            room={currentRoom.room}
                            language={language}
                        ></GameCard>
                    ))}
                </div>
            </div>
            <SelectActions
                onClose={() => setIsSelectActionsOpen(false)}
                isOpen={isSelectActionsOpen}
                language={language}
                setActionsCount={setActionsCount}
            />
        </>
    );
};
