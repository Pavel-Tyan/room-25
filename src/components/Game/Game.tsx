import { Language } from '@/constants/language.constants';
import { RoundCounter } from '../RoundCounter/RoundCounter';
import styles from './Game.module.css';
import { Room } from '@/constants/room.constants';
import { GameCard } from '../GameCard/GameCard';
import { useEffect, useState } from 'react';
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

    // Если игрок мертв, то его нет в массиве order
    const [order, setOrder] = useState<number[]>([1, 2, 3, 4, 5, 6]);

    // Сдвигаем первого игрока на последнюю позицию во время хода
    const getChangedOrder = (oldOrder: number[]): number[] => {
        const newOrder: number[] = [...oldOrder];

        if (newOrder.length === 0) {
            return newOrder;
        }

        const firstPlayerIndex = newOrder[0];
        newOrder.shift();
        newOrder.push(firstPlayerIndex);

        return newOrder;
    };

    const [roundsLeft, setRoundsLeft] = useState<number>(10);
    // Фаза программирования
    const [isProgrammingStage, setIsProgrammingStage] = useState<boolean>(false);
    // Количество действий, который выбрал первый игрок
    const [firstPlayerActionsCount, setFirstPlayerActionsCount] = useState<number>(2);
    // Количество действий, который выбрал второй игрок
    const [secondPlayerActionsCount, setSecondPlayerActionsCount] = useState<number>(2);
    // Переменные нужны для открытия модальных окон выбора действий 1ого и 2ого игрока
    const [isFirstSelectPopupOpened, setIsFirstSelectPopupOpened] =
        useState<boolean>(true);
    const [isSecondSelectPopupOpened, setIsSecondSelectPopupOpened] =
        useState<boolean>(false);
    // Действия первого игрока
    const [firstPlayerFirstAction, setFirstPlayerFirstAction] = useState<GameAction>(
        GameAction.Peek
    );
    const [firstPlayerSecondAction, setFirstPlayerSecondAction] = useState<GameAction>(
        GameAction.Peek
    );
    // Действия второго игрока
    const [secondPlayerFirstAction, setSecondPlayerFirstAction] = useState<GameAction>(
        GameAction.Peek
    );
    const [secondPlayerSecondAction, setSecondPlayerSecondAction] = useState<GameAction>(
        GameAction.Peek
    );

    const [playersActions, setPlayersActions] = useState<GameAction[][]>([
        [GameAction.Unknown, GameAction.Unknown],
        [GameAction.Unknown, GameAction.Unknown],
        [GameAction.Unknown, GameAction.Unknown],
        [GameAction.Unknown, GameAction.Unknown],
        [GameAction.Unknown, GameAction.Unknown],
        [GameAction.Unknown, GameAction.Unknown],
    ]);

    useEffect(() => {
        if (isProgrammingStage) {
            setIsFirstSelectPopupOpened(true);
            setIsProgrammingStage(false);
            // Переходим в фазу действия
            setIsActionStage(true);
        }
    }, [isProgrammingStage]);

    // Фаза действия
    const [isActionStage, setIsActionStage] = useState<boolean>(false);
    const [activePlayer, setActivePlayer] = useState<number>(1);

    useEffect(() => {
        if (isActionStage) {
            setIsActionStage(false);
            // Переходим в фазу отсчета
            setIsCountdownStage(true);
        }
    }, [isActionStage]);

    // Фаза отсчета
    const [isCountdownStage, setIsCountdownStage] = useState<boolean>(false);

    // Смена порядка игроков
    useEffect(() => {
        if (isCountdownStage) {
            setOrder((prev) => getChangedOrder(prev));
            setIsCountdownStage(false);
            // Переходим в фазу программирования
            setIsProgrammingStage(true);
        }
    }, [isCountdownStage]);

    return (
        <>
            <div className={styles.gameWrapper}>
                <RoundCounter language={language} roundsLeft={roundsLeft} />
                <div className={styles.rooms}>
                    {roomsInfo.map((currentRoom, i) => (
                        <GameCard
                            key={`current room ${currentRoom.key}`}
                            // Центральная комната открыта в начале игры
                            hasOpened={isRoomOpened[i]}
                            hasPlayerInRoom={hasPlayerInRoom[i]}
                            room={currentRoom.room}
                            language={language}
                            isAvailable={false}
                            // Обработка клика с условием
                            handleClick={() => {}}
                        ></GameCard>
                    ))}
                </div>
                <PlayersTable
                    playersActions={playersActions}
                    activePlayer={activePlayer}
                    order={order}
                />
            </div>
            <SelectActions /* Для первого игрока */
                playerNumber={1}
                onClose={() => setIsFirstSelectPopupOpened(false)}
                isOpen={isFirstSelectPopupOpened}
                language={language}
                setActionsCount={setFirstPlayerActionsCount}
                firstAction={firstPlayerFirstAction}
                secondAction={firstPlayerSecondAction}
                setFirstAction={(action: GameAction) => setFirstPlayerFirstAction(action)}
                setSecondAction={(action: GameAction) =>
                    setFirstPlayerSecondAction(action)
                }
                doNext={() => setIsSecondSelectPopupOpened(true)}
                oldActions={playersActions}
                setActions={(actions: GameAction[][]) => setPlayersActions(actions)}
            />
            <SelectActions /* Для второго игрока */
                playerNumber={2}
                onClose={() => setIsSecondSelectPopupOpened(false)}
                isOpen={isSecondSelectPopupOpened}
                language={language}
                setActionsCount={setSecondPlayerActionsCount}
                firstAction={secondPlayerFirstAction}
                secondAction={secondPlayerSecondAction}
                setFirstAction={(action: GameAction) =>
                    setSecondPlayerFirstAction(action)
                }
                setSecondAction={(action: GameAction) =>
                    setSecondPlayerSecondAction(action)
                }
                oldActions={playersActions}
                setActions={(actions: GameAction[][]) => setPlayersActions(actions)}
            />
        </>
    );
};
