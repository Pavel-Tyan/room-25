import { Language } from '@/constants/language.constants';
import { RoundCounter } from '../RoundCounter/RoundCounter';
import styles from './Game.module.css';
import { Room } from '@/constants/room.constants';
import { GameCard } from '../GameCard/GameCard';

// Этот тип нужен для того, чтобы при использовании map()
// у каждого элемента был уникальный ключ
type RoomInfo = {
    room: Room;
    key: number;
};

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

    return (
        <div className={styles.gameWrapper}>
            <RoundCounter language={language} roundsLeft={10} />
            <div className={styles.rooms}>
                {roomsInfo.map((currentRoom, i) => (
                    <GameCard
                        key={currentRoom.key}
                        // Центральная комната открыта в начале игры
                        hasOpened={i == 12 ? true : false}
                        hasPlayerInRoom={[]}
                        room={currentRoom.room}
                        language={language}
                    ></GameCard>
                ))}
            </div>
        </div>
    );
};
