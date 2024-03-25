import { Language } from '@/constants/language.constants';
import { RoundCounter } from '../RoundCounter/RoundCounter';
import styles from './Game.module.css';
import { Room } from '@/constants/room.constants';
import { GameCard } from '../GameCard/GameCard';
import { useState } from 'react';
import { SelectActions } from '../SelectActions/SelectActions';
import { PlayersTable } from '../PlayersTable/PlayersTable';
import { GameAction } from '@/constants/action.constants';

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

    // Расположение игроков в комнатах
    const hasPlayerInRoom: boolean[][] = Array(25).fill([
        false,
        false,
        false,
        false,
        false,
        false,
    ]);
    hasPlayerInRoom[12] = [true, true, true, true, true, true];

    // Какая из комнат открыта
    const initialRoomState: boolean[] = Array(25).fill(false);
    initialRoomState[12] = true;
    const [isRoomOpened, setIsRoomOpened] = useState<boolean[]>(initialRoomState);

    // Количество действий, который выбрал игрок
    const [actionsCount, setActionsCount] = useState<number>(2);

    // Если игрок мертв, то его нет в массиве order
    const order: number[] = [1, 2, 3, 4, 5, 6];

    // Сдвигаем первого игрока на последнюю позицию во время хода
    const changeOrder = (): void => {
        if (order.length === 0) {
            return;
        }

        const firstPlayerIndex = order[0];
        order.pop();
        order.push(firstPlayerIndex);
    };

    const [roundsCount, setRoundsCount] = useState<number>(10);
    // Фаза программирования
    const [isProgrammingStage, setIsProgrammingStage] = useState<boolean>(false);
    // Фаза действия
    const [isActionStage, setIsActionStage] = useState<boolean>(false);

    // Действия
    const [firstAction, setFirstAction] = useState<GameAction>(GameAction.Peek);
    const [secondAction, setSecondAction] = useState<GameAction>(GameAction.Peek);

    // Фаза отсчета
    const [isCountdownStage, setIsCountdownStage] = useState<boolean>(false);

    return (
        <>
            <div className={styles.gameWrapper}>
                <RoundCounter language={language} roundsLeft={10} />
                <div className={styles.rooms}>
                    {roomsInfo.map((currentRoom, i) => (
                        <GameCard
                            key={currentRoom.key}
                            // Центральная комната открыта в начале игры
                            hasOpened={isRoomOpened[i]}
                            hasPlayerInRoom={hasPlayerInRoom[i]}
                            room={currentRoom.room}
                            language={language}
                        ></GameCard>
                    ))}
                </div>
                <PlayersTable
                    playersActions={[
                        [GameAction.Unknown, GameAction.Unknown],
                        [GameAction.Unknown, GameAction.Unknown],
                        [GameAction.Unknown, GameAction.Unknown],
                        [GameAction.Unknown, GameAction.Unknown],
                        [GameAction.Unknown, GameAction.Unknown],
                        [GameAction.Unknown, GameAction.Unknown],
                    ]}
                    order={order}
                />
            </div>
            <SelectActions
                onClose={() => setIsProgrammingStage(false)}
                isOpen={isProgrammingStage}
                language={language}
                setActionsCount={setActionsCount}
                doNextStage={() => setIsActionStage(true)}
                firstAction={firstAction}
                secondAction={secondAction}
                setFirstAction={(action: GameAction) => setFirstAction(action)}
                setSecondAction={(action: GameAction) => setSecondAction(action)}
            />
        </>
    );
};
