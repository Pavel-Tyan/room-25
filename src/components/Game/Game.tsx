import { Language } from '@/constants/language.constants';
import { RoundCounter } from '../RoundCounter/RoundCounter';
import styles from './Game.module.css';
import { Room } from '@/constants/room.constants';
import { GameCard } from '../GameCard/GameCard';
import { useEffect, useState } from 'react';
import { SelectActions } from '../SelectActions/SelectActions';
import { PlayersTable } from '../PlayersTable/PlayersTable';
import { GameAction } from '@/constants/action.constants';
import { ChooseRound } from '../ChooseRound/ChooseRound';

// Этот тип нужен для того, чтобы при использовании map()
// у каждого элемента был уникальный ключ
type RoomInfo = {
    room: Room;
    key: number;
};

const ROOM_COUNT: number = 25;
const ROUNDS_COUNT: number = 10;

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
        GameAction.Unknown
    );
    // Действия второго игрока
    const [secondPlayerFirstAction, setSecondPlayerFirstAction] = useState<GameAction>(
        GameAction.Peek
    );
    const [secondPlayerSecondAction, setSecondPlayerSecondAction] = useState<GameAction>(
        GameAction.Unknown
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
            setIsPlayerDoActionStage(true);
        }
    }, [isProgrammingStage]);

    // Фаза действия
    // Игрок выбирает как будет совершать действие
    const [isPlayerDoActionStage, setIsPlayerDoActionStage] = useState<boolean>(false);
    // Совершение действия
    const [isDoActionStage, setIsDoActionStage] = useState<boolean>(false);

    const [activePlayer, setActivePlayer] = useState<number>(1);
    // Выполнил ли свой ход текцщий игрок
    const [hasDoneMove, setHasDoneMove] = useState<boolean>(false);
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
    const [isRoomAvailable, setIsRoomAvailable] = useState<boolean[]>(
        Array(25).fill(false)
    );

    const findPlayerRoomIndex = (playerNumber: number): number => {
        let roomIndex: number = 0;

        for (let i = 0; i < hasPlayerInRoom.length; i++) {
            if (hasPlayerInRoom[i][playerNumber - 1]) {
                roomIndex = i;
                break;
            }
        }

        return roomIndex;
    };

    const findNeighbourRooms = (roomIndex: number): number[] => {
        switch (roomIndex) {
            case 0: {
                return [1, 5];
            }
            case 1: {
                return [0, 2, 6];
            }
            case 2: {
                return [1, 3, 7];
            }
            case 3: {
                return [2, 4, 8];
            }
            case 4: {
                return [3, 9];
            }
            case 5: {
                return [0, 6, 10];
            }
            case 6: {
                return [1, 5, 7, 11];
            }
            case 7: {
                return [2, 6, 8, 12];
            }
            case 8: {
                return [3, 7, 9, 13];
            }
            case 9: {
                return [4, 8, 14];
            }
            case 10: {
                return [5, 11, 15];
            }
            case 11: {
                return [6, 10, 12, 16];
            }
            case 12: {
                return [7, 11, 13, 17];
            }
            case 13: {
                return [8, 12, 14, 18];
            }
            case 14: {
                return [9, 13, 19];
            }
            case 15: {
                return [10, 16, 20];
            }
            case 16: {
                return [11, 15, 17, 21];
            }
            case 17: {
                return [12, 16, 18, 22];
            }
            case 18: {
                return [13, 17, 19, 23];
            }
            case 19: {
                return [14, 18, 24];
            }
            case 20: {
                return [15, 11];
            }
            case 21: {
                return [16, 20, 22];
            }
            case 22: {
                return [17, 21, 23];
            }
            case 23: {
                return [18, 22, 24];
            }
            case 24: {
                return [19, 23];
            }
            default: {
                return [];
            }
        }
    };

    const showPeekAvailableRooms = (playerNumber: number): void => {
        const roomIndex = findPlayerRoomIndex(playerNumber);
        const neighbourRooms = findNeighbourRooms(roomIndex);
        const isRoomAvailable: boolean[] = Array(25).fill(false);

        for (let roomIndex of neighbourRooms) {
            isRoomAvailable[roomIndex] = true;
        }

        setIsRoomAvailable(isRoomAvailable);
    };

    const swapActions = (playerNumber: number): void => {
        const updatedActions: GameAction[][] = [];

        for (let actions of playersActions) {
            updatedActions.push(actions.slice(0));
        }

        const firstAction = updatedActions[playerNumber - 1][0];
        updatedActions[playerNumber - 1][0] = updatedActions[playerNumber - 1][1];
        updatedActions[playerNumber - 1][1] = firstAction;

        setPlayersActions(updatedActions);
    };

    const doAction = (action: GameAction, playerNumber: number): void => {
        if (playerNumber === 1 || playerNumber === 2) {
            switch (action) {
                case GameAction.Peek: {
                    showPeekAvailableRooms;
                    return;
                }
                case GameAction.Enter: {
                    return;
                }
                case GameAction.Push: {
                    return;
                }
                case GameAction.Control: {
                    return;
                }
            }
        } else {
            // Действие ботов
        }
    };

    const doPlayersActions = (): void => {
        // Из центральной нельзя выталкивать !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        for (let i = 0; i < 2; i++) {
            for (let playerNumber of order) {
                if (playerNumber === 1) {
                    // Учитывай, что порядок может меняться
                    setHasDoneMove(false);
                    let currentAction: GameAction;

                    if (i === 1) {
                        // 1 круг
                        if (firstPlayerActionsCount === 1) {
                            setIsChooseRoundPopupOpened(true);
                        }
                        if (actionRoundNumber === 1 || firstPlayerActionsCount === 2) {
                            // Действие
                            doAction(firstPlayerFirstAction, playerNumber);
                        } else {
                            // Если игрок выбрал действовать во 2м раунде, то ставим действие 2м по порядку
                            swapActions(playerNumber);
                        }
                    } else {
                        // 2 круг
                        if (
                            (firstPlayerActionsCount === 1 && actionRoundNumber === 2) ||
                            firstPlayerActionsCount === 2
                        ) {
                            // Действие
                            doAction(firstPlayerSecondAction, playerNumber);
                        }
                    }
                    while (!hasDoneMove) {}
                } else if (playerNumber === 2) {
                    setHasDoneMove(false);

                    while (!hasDoneMove) {}
                } else {
                }
            }
        }
    };

    useEffect(() => {
        if (isPlayerDoActionStage) {
            setIsPlayerDoActionStage(false);
            setIsDoActionStage(true);
        }
    }, [isPlayerDoActionStage]);

    useEffect(() => {
        if (isDoActionStage) {
            setIsDoActionStage(false);
            // Переходим в фазу отсчета, если все игроки сделали свои ходы
            setIsCountdownStage(true);
        }
    }, [isDoActionStage]);

    // Фаза отсчета
    const [isCountdownStage, setIsCountdownStage] = useState<boolean>(false);
    const [roundsLeft, setRoundsLeft] = useState<number>(10);
    // Для открытия модального окна для выбора раунда, в котором игрок будет действовать
    const [isChooseRoundPopupOpened, setIsChooseRoundPopupOpened] =
        useState<boolean>(false);
    // Номер круга, в котором игрок будет действовать, если выбрал 1 действие вместо 2
    const [actionRoundNumber, setActionRoundNumber] = useState<number>(1);
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
                            isAvailable={isRoomAvailable[i]}
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
                doNext={() => setIsPlayerDoActionStage(true)}
                oldActions={playersActions}
                setActions={(actions: GameAction[][]) => setPlayersActions(actions)}
            />
            <ChooseRound
                language={language}
                isOpen={isChooseRoundPopupOpened}
                setRoundNumber={(roundNumber: number) =>
                    setActionRoundNumber(roundNumber)
                }
                closePopup={() => setIsChooseRoundPopupOpened(false)}
            />
        </>
    );
};
