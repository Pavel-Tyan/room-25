import { Language } from '@/constants/language.constants';
import { RoundCounter } from '../RoundCounter/RoundCounter';
import styles from './Game.module.css';
import { Room, RoomInfo } from '@/constants/room.constants';
import { GameCard } from '../GameCard/GameCard';
import { useEffect, useState } from 'react';
import { SelectActions } from '../SelectActions/SelectActions';
import { PlayersTable } from '../PlayersTable/PlayersTable';
import { GameAction } from '@/constants/action.constants';
import { PlayersSelection } from '../PlayersSelection/PlayersSelection';
import { ControlPanel } from '../ControlPanel/ControlPanel';
import { Button } from '../Button/Button';
import cn from 'classnames';
import { GameOver } from '../GameOver/GameOver';
import { Direction, getRandomDirections } from '@/constants/direction.constants';
import { getRandomInt } from '@/helpers/helpers';

const ROOM_COUNT: number = 25;
const ROUNDS_COUNT: number = 10;

export const Game = (): JSX.Element => {
    let language: Language;

    if (sessionStorage.getItem('language') === Language.English) {
        language = Language.English;
    } else {
        language = Language.Russian;
    }
    // @ts-ignore
    const rooms: Room[] = sessionStorage
        .getItem('cards')
        ?.split('/')
        .map((room) => Number(room));

    const roomsInfoInitial: RoomInfo[] = [];

    for (let i = 0; i < rooms.length; i++) {
        roomsInfoInitial.push({
            room: rooms[i],
            key: i,
        });
    }

    const [roomsInfo, setRoomsInfo] = useState<RoomInfo[]>(roomsInfoInitial);
    // Обработчики клика для комнат
    const [clickHandlers, setClickHandlers] = useState<(() => void)[]>(
        Array(ROOM_COUNT).fill(() => {})
    );

    // Фаза программирования
    const [isProgrammingStage, setIsProgrammingStage] = useState<boolean>(false);

    // Действие первого игрока
    const [firstPlayerAction, setFirstPlayerAction] = useState<GameAction>(
        GameAction.Peek
    );

    // Действие второго игрока
    const [secondPlayerAction, setSecondPlayerAction] = useState<GameAction>(
        GameAction.Peek
    );

    const [isFirstSelectPopupOpened, setIsFirstSelectPopupOpened] =
        useState<boolean>(true);
    const [isSecondSelectPopupOpened, setIsSecondSelectPopupOpened] =
        useState<boolean>(false);

    const [playersActions, setPlayersActions] = useState<GameAction[]>([
        GameAction.Unknown,
        GameAction.Unknown,
        GameAction.Unknown,
        GameAction.Unknown,
        GameAction.Unknown,
        GameAction.Unknown,
    ]);

    useEffect(() => {
        if (isProgrammingStage) {
            //setIsSelectActionsPopupOpened(true);
            setIsProgrammingStage(false);
            // Переходим в фазу действия
            setIsActionStage(true);
        }
    }, [isProgrammingStage]);

    // Фаза действия
    const [isActionStage, setIsActionStage] = useState<boolean>(false);

    const [activePlayer, setActivePlayer] = useState<number>(1);

    // Расположение игроков в комнатах
    const hasPlayerInRoomInitial: boolean[][] = Array(ROOM_COUNT).fill([
        false,
        false,
        false,
        false,
        false,
        false,
    ]);
    hasPlayerInRoomInitial[12] = [true, true, true, true, true, true];

    const [hasPlayerInRoom, setHasPlayerInRoom] =
        useState<boolean[][]>(hasPlayerInRoomInitial);

    // Какая из комнат открыта
    const initialRoomState: boolean[] = Array(25).fill(false);
    initialRoomState[12] = true;
    const [isRoomOpened, setIsRoomOpened] = useState<boolean[]>(initialRoomState);

    // Если игрок мертв, то его нет в массиве isALive
    const [isPlayerAlive, setIsPlayerAlive] = useState<boolean[]>(Array(6).fill(true));
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

    const peekActionHandleClick = (roomIndex: number, otherRooms: number[]) => {
        // Удаляем обработчики на комнатах
        setClickHandlers(Array(ROOM_COUNT).fill(() => {}));
        const updatedIsRoomAvailable: boolean[] = [...isRoomAvailable];
        for (let currentRoomIndex of otherRooms) {
            updatedIsRoomAvailable[currentRoomIndex] = false;
        }
        setIsRoomAvailable(updatedIsRoomAvailable);

        const updatedIsRoomOpened = [...isRoomOpened];
        updatedIsRoomOpened[roomIndex] = true;
        setIsRoomOpened(updatedIsRoomOpened);

        setTimeout(() => {
            const updatedIsRoomOpened = [...isRoomOpened];
            updatedIsRoomOpened[roomIndex] = false;
            setIsRoomOpened(updatedIsRoomOpened);

            setCycleCurrentPlayer((prev) => prev + 1);
            setIsActionCycleStage(true);
        }, 2000);
    };

    const showPeekAvailableRooms = (playerNumber: number): void => {
        const roomIndex = findPlayerRoomIndex(playerNumber);
        const neighbourRooms = findNeighbourRooms(roomIndex);

        // В темной комнате и в комнате ловушке нельзя использовать действие "Заглянуть"
        if (
            roomsInfo[roomIndex].room === Room.DarkRoom ||
            roomsInfo[roomIndex].room === Room.TrapRoom
        ) {
            setIsSkipButtonAvailable(true);
            return;
        }

        const updatedClickHandlers = [...clickHandlers];

        const isRoomAvailable: boolean[] = Array(ROOM_COUNT).fill(false);

        let isPeekAvailable = false;

        for (let currentRoomIndex of neighbourRooms) {
            const otherRooms: number[] = [];
            for (let i = 0; i < neighbourRooms.length; i++) {
                if (roomIndex !== neighbourRooms[i]) {
                    otherRooms.push(neighbourRooms[i]);
                }
            }
            otherRooms.push(currentRoomIndex);

            if (!isRoomOpened[currentRoomIndex]) {
                isRoomAvailable[currentRoomIndex] = true;
                updatedClickHandlers[currentRoomIndex] = () => {
                    peekActionHandleClick(currentRoomIndex, otherRooms);
                };
                isPeekAvailable = true;
            }
        }

        // Если все комнаты открыты, то заглядывать некуда
        if (!isPeekAvailable) {
            setIsSkipButtonAvailable(true);
            return;
        }

        setIsRoomAvailable(isRoomAvailable);
        setClickHandlers(updatedClickHandlers);
    };

    const illusionRoomHandlerClick = (
        roomIndex: number,
        playerNumber: number,
        updatedIsRoomOpened: boolean[],
        updatedHasPlayerInRoom: boolean[][]
    ): void => {
        //Открываем комнату
        updatedIsRoomOpened[roomIndex] = true;
        const updatedRoomsInfo: RoomInfo[] = [...roomsInfo];

        const updatedIsRoomAvailable = [...isRoomAvailable];

        let illusionRoomIndex: number = 0;

        for (let i = 0; i < roomsInfo.length; i++) {
            if (roomsInfo[i].room === Room.IllusionRoom) {
                for (let roomInfo of hasPlayerInRoom) {
                    updatedHasPlayerInRoom.push([...roomInfo]);
                }

                // Перемещение из 1 комнаты в другую
                illusionRoomIndex = i;
                updatedHasPlayerInRoom[illusionRoomIndex][playerNumber - 1] = true;

                // Меняем комнаты местами
                updatedRoomsInfo[i] = { ...roomsInfo[roomIndex] };
                updatedRoomsInfo[roomIndex] = { ...roomsInfo[i] };

                for (let currentRoomIndex of otherRooms) {
                    updatedIsRoomAvailable[currentRoomIndex] = false;
                    updatedHasPlayerInRoom[currentRoomIndex][playerNumber - 1] = false;
                }

                setIsRoomAvailable(updatedIsRoomAvailable);
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                setRoomsInfo(updatedRoomsInfo);
                setIsRoomOpened(updatedIsRoomOpened);
                setClickHandlers(Array(25).fill(() => {}));
                setCycleCurrentPlayer((prev) => prev + 1);
                setIsActionCycleStage(true);
                break;
            }
        }

        // Эффект комнаты, в которую попали
        switch (updatedRoomsInfo[illusionRoomIndex].room) {
            case Room.ControlRoom: {
                setRoomIndex(illusionRoomIndex);
                setIsControlPanelOpened(true);
                setIsRoomAvailable(Array(25).fill(false));
                return;
            }
            case Room.DeathRoom: {
                // Игрок умирает, если войдет в комнату смерти
                const updatedIsPlayerAlive: boolean[] = [...isPlayerAlive];
                for (let i = 0; i < order.length; i++) {
                    // Не добавляем в очередь игрока, который зашел в комнату смерти
                    if (
                        playerNumber === order[i] ||
                        hasPlayerInRoom[illusionRoomIndex][order[i] - 1]
                    ) {
                        updatedIsPlayerAlive[i] = false;
                    }
                }

                for (
                    let i = 0;
                    i < updatedHasPlayerInRoom[illusionRoomIndex].length;
                    i++
                ) {
                    if (updatedHasPlayerInRoom[illusionRoomIndex][i]) {
                        updatedHasPlayerInRoom[illusionRoomIndex][i] = false;
                    }
                }
                setIsPlayerAlive(updatedIsPlayerAlive);
                setIsRoomOpened(updatedIsRoomOpened);
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                setIsRoomAvailable(updatedIsRoomAvailable);

                return;
            }
            case Room.ObservationRoom: {
                if (isRoomOpened.includes(false) && !hasObservationRoomUsed) {
                    const updatedClickHandlers = [...clickHandlers];
                    for (let i = 0; i < updatedIsRoomOpened.length; i++) {
                        if (!updatedIsRoomOpened[i]) {
                            updatedClickHandlers[i] = () =>
                                observationRoomHandlerClick(i, updatedIsRoomOpened);
                            updatedIsRoomAvailable[i] = true;
                        }
                    }
                    setHasPlayerInRoom(updatedHasPlayerInRoom);
                    setClickHandlers(updatedClickHandlers);
                    setIsRoomAvailable(updatedIsRoomAvailable);
                }
                return;
            }
            case Room.TwinRoom: {
                // Ищем индексы другой комнаты-близняшки

                for (let i = 0; i < roomsInfo.length; i++) {
                    if (
                        i !== illusionRoomIndex &&
                        updatedRoomsInfo[i].room === Room.TwinRoom &&
                        isRoomOpened[i]
                    ) {
                        const secondRoomIndex: number = i;
                        updatedHasPlayerInRoom[illusionRoomIndex][playerNumber - 1] =
                            false;
                        updatedHasPlayerInRoom[secondRoomIndex][playerNumber - 1] = true;

                        // Перенесем в другую комнату остальных игроков
                        for (
                            let i = 0;
                            i < updatedHasPlayerInRoom[illusionRoomIndex].length;
                            i++
                        ) {
                            if (updatedHasPlayerInRoom[illusionRoomIndex][i]) {
                                updatedHasPlayerInRoom[illusionRoomIndex][i] = false;
                                updatedHasPlayerInRoom[secondRoomIndex][i] = true;
                            }
                        }

                        break;
                    }
                }
                setIsRoomOpened(updatedIsRoomOpened);
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                setIsRoomAvailable(updatedIsRoomAvailable);

                return;
            }
            case Room.WhirlpoolRoom: {
                // Перемещаем всех игроков из воронки в центральную комнату

                for (
                    let i = 0;
                    i < updatedHasPlayerInRoom[illusionRoomIndex].length;
                    i++
                ) {
                    if (updatedHasPlayerInRoom[illusionRoomIndex][i]) {
                        updatedHasPlayerInRoom[illusionRoomIndex][i] = false;
                        updatedHasPlayerInRoom[12][i] = true;
                    }
                }
                setIsRoomOpened(updatedIsRoomOpened);
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                setIsRoomAvailable(updatedIsRoomAvailable);
                return;
            }
            default: {
                break;
            }
        }
    };

    const [hasObservationRoomUsed, setHasObservationRoomUsed] = useState<boolean>(false);

    const observationRoomHandlerClick = (
        roomIndex: number,
        updatedIsRoomOpened: boolean[]
    ) => {
        setClickHandlers(Array(ROOM_COUNT).fill(() => {}));
        const updatedIsRoomAvailable: boolean[] = [...isRoomAvailable];
        for (let currentRoomIndex of otherRooms) {
            updatedIsRoomAvailable[currentRoomIndex] = false;
        }
        setIsRoomAvailable(updatedIsRoomAvailable);

        updatedIsRoomOpened[roomIndex] = true;
        setIsRoomOpened(updatedIsRoomOpened);
        setHasObservationRoomUsed(true);
        setCycleCurrentPlayer((prev) => prev + 1);
        setIsActionCycleStage(true);
    };
    const enterActionHandleClick = (
        roomIndex: number,
        playerNumber: number,
        otherRooms: number[]
    ): void => {
        // Удаляем обработчики на комнатах
        setClickHandlers(Array(ROOM_COUNT).fill(() => {}));

        const updatedHasPlayerInRoom: boolean[][] = [];

        for (let roomInfo of hasPlayerInRoom) {
            updatedHasPlayerInRoom.push([...roomInfo]);
        }

        const updatedIsRoomAvailable: boolean[] = Array(ROOM_COUNT).fill(false);
        // Перемещение из 1 комнаты в другую
        updatedHasPlayerInRoom[roomIndex][playerNumber - 1] = true;
        setIsRoomAvailable(Array(ROOM_COUNT).fill(false));

        for (let currentRoomIndex of otherRooms) {
            updatedHasPlayerInRoom[currentRoomIndex][playerNumber - 1] = false;
        }

        const updatedIsRoomOpened = [...isRoomOpened];
        updatedIsRoomOpened[roomIndex] = true;
        // Открываем комнату
        setIsRoomOpened(updatedIsRoomOpened);

        switch (roomsInfo[roomIndex].room) {
            case Room.ControlRoom: {
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                setRoomIndex(roomIndex);
                setIsControlPanelOpened(true);
                return;
            }
            case Room.DarkRoom: {
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                setIsRoomAvailable(updatedIsRoomAvailable);
                break;
            }
            case Room.DeathRoom: {
                // Игрок умирает, если войдет в комнату смерти
                updatedHasPlayerInRoom[roomIndex][playerNumber - 1] = false;

                const updatedIsPlayerAlive = [...isPlayerAlive];

                // Убираем игрока из таблицы игроков
                for (let i = 0; i < order.length; i++) {
                    if (order[i] === playerNumber) {
                        updatedIsPlayerAlive[i] = false;
                        break;
                    }
                }

                setIsPlayerAlive(updatedIsPlayerAlive);
                //
                setIsRoomOpened(updatedIsRoomOpened);
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                setIsRoomAvailable(updatedIsRoomAvailable);
                break;
            }
            case Room.FreezerRoom: {
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                break;
            }
            case Room.IllusionRoom: {
                // Если все комнаты открыты, то ничего не происходит
                if (isRoomOpened.includes(false)) {
                    const updatedClickHandlers = [...clickHandlers];
                    for (let i = 0; i < updatedIsRoomOpened.length; i++) {
                        if (!updatedIsRoomOpened[i]) {
                            updatedClickHandlers[i] = () =>
                                illusionRoomHandlerClick(
                                    i,
                                    playerNumber,
                                    updatedIsRoomOpened,
                                    updatedHasPlayerInRoom
                                );
                            updatedIsRoomAvailable[i] = true;
                        }
                    }
                    setHasPlayerInRoom(updatedHasPlayerInRoom);
                    setClickHandlers(updatedClickHandlers);
                    setIsRoomAvailable(updatedIsRoomAvailable);
                }
                return;
            }
            case Room.JailRoom: {
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                setIsRoomAvailable(updatedIsRoomAvailable);
                break;
            }
            case Room.ObservationRoom: {
                if (isRoomOpened.includes(false) && !hasObservationRoomUsed) {
                    const updatedClickHandlers = [...clickHandlers];
                    for (let i = 0; i < updatedIsRoomOpened.length; i++) {
                        if (!updatedIsRoomOpened[i]) {
                            updatedClickHandlers[i] = () =>
                                observationRoomHandlerClick(i, updatedIsRoomOpened);
                            updatedIsRoomAvailable[i] = true;
                        }
                    }
                    setClickHandlers(updatedClickHandlers);
                    setIsRoomAvailable(updatedIsRoomAvailable);
                    setHasPlayerInRoom(updatedHasPlayerInRoom);
                    return;
                } else {
                    setClickHandlers(Array(ROOM_COUNT).fill(() => {}));
                    setIsRoomAvailable(Array(ROOM_COUNT).fill(false));
                    setHasPlayerInRoom(updatedHasPlayerInRoom);
                }
                break;
            }
            case Room.TrapRoom: {
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                setIsRoomAvailable(updatedIsRoomAvailable);
                break;
            }
            case Room.TwinRoom: {
                // Ищем индексы другой комнаты-близняшки
                for (let i = 0; i < roomsInfo.length; i++) {
                    if (
                        // Для эффекта 2 комнаты-близняшки должны быть открыты
                        i !== roomIndex &&
                        roomsInfo[i].room === Room.TwinRoom &&
                        isRoomOpened[i]
                    ) {
                        const secondRoomIndex: number = i;
                        updatedHasPlayerInRoom[roomIndex][playerNumber - 1] = false;
                        updatedHasPlayerInRoom[secondRoomIndex][playerNumber - 1] = true;
                        break;
                    }
                }
                setIsRoomOpened(updatedIsRoomOpened);
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                setIsRoomAvailable(updatedIsRoomAvailable);
                break;
            }
            case Room.WhirlpoolRoom: {
                updatedHasPlayerInRoom[roomIndex][playerNumber - 1] = false;
                // Перемещаем игрока в центральную комнату
                updatedHasPlayerInRoom[12][playerNumber - 1] = true;
                setIsRoomOpened(updatedIsRoomOpened);
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                setIsRoomAvailable(updatedIsRoomAvailable);
                break;
            }
            default: {
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                setIsRoomAvailable(updatedIsRoomAvailable);
                break;
            }
        }
        setClickHandlers(Array(ROOM_COUNT).fill(() => {}));
        setTimeout(() => {
            setCycleCurrentPlayer((prev) => prev + 1);
            setIsActionCycleStage(true);
        }, 1000);
    };

    const showEnterAvailableRooms = (playerNumber: number): void => {
        const currentRoomIndex = findPlayerRoomIndex(playerNumber);
        const neighbourRooms = findNeighbourRooms(currentRoomIndex);

        const updatedClickHandlers = [...clickHandlers];

        const isRoomAvailable: boolean[] = Array(25).fill(false);

        // Если тюрьма, то мы может пойти только в комнаты, где есть игроки
        if (roomsInfo[currentRoomIndex].room === Room.JailRoom) {
            let isPushAvailable: boolean = false;

            for (let roomIndex of neighbourRooms) {
                const otherRooms: number[] = [];
                for (let i = 0; i < neighbourRooms.length; i++) {
                    if (roomIndex !== neighbourRooms[i]) {
                        otherRooms.push(neighbourRooms[i]);
                    }
                }
                otherRooms.push(currentRoomIndex);

                // Проверяем, что в соседней комнате есть игроки
                if (hasPlayerInRoom[roomIndex].includes(true)) {
                    isRoomAvailable[roomIndex] = true;
                    isPushAvailable = true;
                    updatedClickHandlers[roomIndex] = () => {
                        enterActionHandleClick(roomIndex, playerNumber, otherRooms);
                    };
                }
            }

            if (!isPushAvailable) {
                setIsSkipButtonAvailable(true);
                return;
            }

            setIsRoomAvailable(isRoomAvailable);
            setClickHandlers(updatedClickHandlers);
            return;
        }

        for (let roomIndex of neighbourRooms) {
            const otherRooms: number[] = [];
            for (let i = 0; i < neighbourRooms.length; i++) {
                if (roomIndex !== neighbourRooms[i]) {
                    otherRooms.push(neighbourRooms[i]);
                }
            }
            otherRooms.push(currentRoomIndex);

            isRoomAvailable[roomIndex] = true;
            updatedClickHandlers[roomIndex] = () => {
                enterActionHandleClick(roomIndex, playerNumber, otherRooms);
            };
        }
        setIsRoomAvailable(isRoomAvailable);
        setClickHandlers(updatedClickHandlers);
    };

    // Открыта ли панель, для выбора игрока, которого будут выталкивать
    const [isPlayersSelectionOpened, setIsPlayersSelectionOpened] =
        useState<boolean>(false);

    const [neighbourPlayers, setNeighbourPlayers] = useState<boolean[]>([]);

    const [roomIndex, setRoomIndex] = useState<number>(12);
    const [otherRooms, setOtherRooms] = useState<number[]>([]);

    const pushActionHandleClick = (
        roomIndex: number,
        activePlayerNumber: number,
        otherRooms: number[]
    ) => {
        // Удаляем обработчики на комнатах
        setClickHandlers(Array(ROOM_COUNT).fill(() => {}));

        const updatedIsRoomAvailable: boolean[] = [...isRoomAvailable];

        setIsRoomAvailable(Array(ROOM_COUNT).fill(false));

        // Открытие комнаты, в которую вытолкнули игрока
        const updatedIsRoomOpened = [...isRoomOpened];
        updatedIsRoomOpened[roomIndex] = true;
        setIsPlayersSelectionOpened(true);
        setIsRoomOpened(updatedIsRoomOpened);
        setIsRoomAvailable(updatedIsRoomAvailable);
        setRoomIndex(roomIndex);
        setOtherRooms([...otherRooms]);

        setCycleCurrentPlayer((prev) => prev + 1);
        setIsActionCycleStage(true);
    };

    const showPushAvailableRooms = (playerNumber: number): void => {
        const currentRoomIndex = findPlayerRoomIndex(playerNumber);
        const neighbourRooms = findNeighbourRooms(currentRoomIndex);

        // В морозилке и центральной комнате нельзя использовать действие "Вытолкнуть"
        if (
            roomsInfo[currentRoomIndex].room === Room.FreezerRoom ||
            roomsInfo[currentRoomIndex].room === Room.CentralRoom
        ) {
            setIsSkipButtonAvailable(true);
            return;
        }

        // Если других игроков нет, то пропускаем ход
        let isPushAvailable: boolean = false;
        for (let i = 0; i < hasPlayerInRoom[currentRoomIndex].length; i++) {
            if (playerNumber - 1 !== i && hasPlayerInRoom[currentRoomIndex][i]) {
                isPushAvailable = true;
                break;
            }
        }

        if (!isPushAvailable) {
            setIsSkipButtonAvailable(true);
            return;
        }

        const updatedClickHandlers = [...clickHandlers];

        const isRoomAvailable: boolean[] = Array(ROOM_COUNT).fill(false);

        const updatedNeighbourPlayers = [];

        for (let i = 0; i < hasPlayerInRoom[currentRoomIndex].length; i++) {
            if (i === playerNumber - 1) {
                // Мы не можем вытолкнуть себя
                updatedNeighbourPlayers.push(false);
            } else {
                updatedNeighbourPlayers.push(hasPlayerInRoom[currentRoomIndex][i]);
            }
        }

        setNeighbourPlayers(updatedNeighbourPlayers);

        for (let roomIndex of neighbourRooms) {
            const otherRooms: number[] = [];
            for (let i = 0; i < neighbourRooms.length; i++) {
                if (roomIndex !== neighbourRooms[i]) {
                    otherRooms.push(neighbourRooms[i]);
                }
            }
            otherRooms.push(currentRoomIndex);

            isRoomAvailable[roomIndex] = true;

            updatedClickHandlers[roomIndex] = () => {
                pushActionHandleClick(roomIndex, playerNumber, otherRooms);
            };
        }
        setIsRoomAvailable(isRoomAvailable);
        setClickHandlers(updatedClickHandlers);
    };

    const [isControlPanelOpened, setIsControlPanelOpened] = useState<boolean>(false);
    const showControlAvailableRooms = (playerNumber: number): void => {
        const currentRoomIndex = findPlayerRoomIndex(playerNumber);
        // В центральной комнате, морозилке и ловушке нельзя использовать действие контроллировать
        if (
            roomsInfo[currentRoomIndex].room === Room.CentralRoom ||
            roomsInfo[currentRoomIndex].room === Room.FreezerRoom ||
            roomsInfo[currentRoomIndex].room === Room.TrapRoom
        ) {
            setIsSkipButtonAvailable(true);
            return;
        }
        setRoomIndex(currentRoomIndex);
        setIsControlPanelOpened(true);
    };

    const showPossibleMoves = (action: GameAction, playerNumber: number): void => {
        setActivePlayer(playerNumber);
        if (playerNumber !== 1 && playerNumber !== 2) {
            // Если попался бот
            return;
        } else {
            switch (action) {
                case GameAction.Peek: {
                    showPeekAvailableRooms(playerNumber);
                    return;
                }
                case GameAction.Enter: {
                    showEnterAvailableRooms(playerNumber);
                    return;
                }
                case GameAction.Push: {
                    showPushAvailableRooms(playerNumber);
                    return;
                }
                case GameAction.Control: {
                    showControlAvailableRooms(playerNumber);
                    return;
                }
                default: {
                    return;
                }
            }
        }
    };

    // Для запуска цикла действий игроков
    const [isActionCycleStage, setIsActionCycleStage] = useState<boolean>(false);

    // Для отображения в нужный момент кнопки старта раунда
    const [isStartRoundButtonOpened, setIsStartRoundButtonOpened] =
        useState<boolean>(false);
    // Фаза действия
    useEffect(() => {
        if (isActionStage) {
            // Отобразим кнопку для старта раунда
            setIsStartRoundButtonOpened(true);
        }
    }, [isActionStage]);

    // Индекс
    const [cycleCurrentPlayer, setCycleCurrentPlayer] = useState<number>(0);
    const [isBotMoveButtonAvailable, setIsBotMoveButtonAvailable] =
        useState<boolean>(false);
    const [isSkipButtonAvailable, setIsSkipButtonAvailable] = useState<boolean>(false);

    const startRoundButtonHandleClick = (): void => {
        setIsActionCycleStage(true);
        setIsStartRoundButtonOpened(false);
    };

    useEffect(() => {
        if (isActionCycleStage && isActionStage) {
            // Если все игроки сделали ход, то переходим ко 2 кругу действий
            if (cycleCurrentPlayer >= order.length) {
                // Обнуляем индекс текущего игрока для order
                setCycleCurrentPlayer(0);
                setIsActionCycleStage(false);
                setIsActionStage(false);
                setIsCountdownStage(true);
                return;
            }

            setIsActionCycleStage(false);

            const currentPlayer = order[cycleCurrentPlayer];

            // Если персонаж игрока умер, то пропускаем ход
            for (let i = 0; i < isPlayerAlive.length; i++) {
                setIsRoomAvailable(Array(ROOM_COUNT).fill(false));
                setClickHandlers(Array(ROOM_COUNT).fill(() => {}));
                if (!isPlayerAlive[i] && order[i] === currentPlayer) {
                    setIsSkipButtonAvailable(true);
                    return;
                }
            }

            let isFirstPlayerAlive: boolean = true;
            let isSecondPlayerAlive: boolean = true;
            let aliveCounter = 0;
            // Если 1 и 2 игрок погибли, то это проигрыш
            for (let i = 0; i < isPlayerAlive.length; i++) {
                if (isPlayerAlive[i]) {
                    aliveCounter++;
                }
                if (!isPlayerAlive[i] && order[i] === 1) {
                    isFirstPlayerAlive = false;
                } else if (!isPlayerAlive[i] && order[i] === 2) {
                    isSecondPlayerAlive = false;
                }
            }

            if (!isFirstPlayerAlive && !isSecondPlayerAlive) {
                setIsVictory(false);
                setIsGameOverPopupOpened(true);
                return;
            }

            // Если все боты погибли, то это победа
            if (isFirstPlayerAlive && isSecondPlayerAlive && aliveCounter === 2) {
                setIsVictory(true);
                setIsGameOverPopupOpened(true);
                return;
            }

            setIsActionCycleStage(false);

            if (currentPlayer === 1) {
                // Действие
                showPossibleMoves(firstPlayerAction, 1);
            } else if (currentPlayer === 2) {
                // Действие
                showPossibleMoves(secondPlayerAction, 2);
            } else {
                setActivePlayer(currentPlayer);
                setIsBotMoveButtonAvailable(true);
            }
        }
    }, [isActionCycleStage]);

    // У каждого бота будет свое направление движения
    const botsDirections: Direction[] = getRandomDirections();
    const enterBotActionHandleClick = (
        roomIndex: number,
        playerNumber: number,
        otherRooms: number[]
    ): void => {
        const updatedHasPlayerInRoom: boolean[][] = [];

        for (let roomInfo of hasPlayerInRoom) {
            updatedHasPlayerInRoom.push([...roomInfo]);
        }

        // Перемещение из 1 комнаты в другую
        updatedHasPlayerInRoom[roomIndex][playerNumber - 1] = true;
        setIsRoomAvailable(Array(ROOM_COUNT).fill(false));

        for (let currentRoomIndex of otherRooms) {
            updatedHasPlayerInRoom[currentRoomIndex][playerNumber - 1] = false;
        }

        const updatedIsRoomOpened = [...isRoomOpened];
        updatedIsRoomOpened[roomIndex] = true;
        // Открываем комнату
        setIsRoomOpened(updatedIsRoomOpened);

        switch (roomsInfo[roomIndex].room) {
            case Room.DarkRoom: {
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                break;
            }
            case Room.DeathRoom: {
                // Игрок умирает, если войдет в комнату смерти
                updatedHasPlayerInRoom[roomIndex][playerNumber - 1] = false;

                const updatedIsPlayerAlive = [...isPlayerAlive];

                // Убираем игрока из таблицы игроков
                for (let i = 0; i < order.length; i++) {
                    if (order[i] === playerNumber) {
                        updatedIsPlayerAlive[i] = false;
                        break;
                    }
                }

                setIsPlayerAlive(updatedIsPlayerAlive);
                setIsRoomOpened(updatedIsRoomOpened);
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                break;
            }
            case Room.FreezerRoom: {
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                break;
            }
            case Room.JailRoom: {
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                break;
            }
            case Room.TrapRoom: {
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                break;
            }
            default: {
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                break;
            }
        }
        setTimeout(() => {
            setCycleCurrentPlayer((prev) => prev + 1);
            setIsActionCycleStage(true);
        }, 1000);
    };
    const botMoveByDirection = (botNumber: number) => {
        const roomIndex = findPlayerRoomIndex(botNumber);
        const neighbourRooms = findNeighbourRooms(roomIndex);
        // Если бот в комнате 25, то ое выберет действие контролировать и завершит игру
        if (roomsInfo[roomIndex].room === Room.Room25) {
            if (hasPlayerInRoom[roomIndex][0] || hasPlayerInRoom[roomIndex][1]) {
                setIsVictory(true);
            } else {
                setIsVictory(false);
            }
            setIsGameOverPopupOpened(true);
            return;
        }
        // Ищем безопасные пути по направлению для ботов
        for (let currentRoomIndex of neighbourRooms) {
            if (roomsInfo[currentRoomIndex].room !== Room.DeathRoom) {
                const otherRooms: number[] = [];
                for (let i = 0; i < neighbourRooms.length; i++) {
                    if (currentRoomIndex !== neighbourRooms[i]) {
                        otherRooms.push(neighbourRooms[i]);
                    }
                }
                otherRooms.push(roomIndex);

                switch (botsDirections[botNumber - 1]) {
                    case Direction.UpperLeftCorner: {
                        if (currentRoomIndex < roomIndex) {
                            enterBotActionHandleClick(
                                currentRoomIndex,
                                botNumber,
                                otherRooms
                            );
                            setIsBotMoveButtonAvailable(false);
                            return;
                        }
                        break;
                    }
                    case Direction.UpperRightCorner: {
                        if (
                            roomIndex - currentRoomIndex === 5 ||
                            currentRoomIndex - roomIndex === 1
                        ) {
                            enterBotActionHandleClick(
                                currentRoomIndex,
                                botNumber,
                                otherRooms
                            );
                            setIsBotMoveButtonAvailable(false);
                            return;
                        }
                        break;
                    }
                    case Direction.DownLeftCorner: {
                        if (
                            currentRoomIndex - roomIndex === 5 ||
                            roomIndex - currentRoomIndex === 1
                        ) {
                            enterBotActionHandleClick(
                                currentRoomIndex,
                                botNumber,
                                otherRooms
                            );
                            setIsBotMoveButtonAvailable(false);
                            return;
                        }
                        break;
                    }
                    case Direction.DownRightCorner: {
                        if (currentRoomIndex > roomIndex) {
                            enterBotActionHandleClick(
                                currentRoomIndex,
                                botNumber,
                                otherRooms
                            );
                            setIsBotMoveButtonAvailable(false);
                            return;
                        }
                        break;
                    }
                }
            }
        }
        // Если боты не могут идти в нужном направлении, то выбираем случайную из комнат
        let randomIndex = getRandomInt(0, neighbourRooms.length);
        enterBotActionHandleClick(
            neighbourRooms[randomIndex],
            botNumber,
            findNeighbourRooms(neighbourRooms[randomIndex])
        );
        setIsBotMoveButtonAvailable(false);
    };

    const doBotsAction = (botNumber: number) => {
        botMoveByDirection(botNumber);
    };

    const skipMove = () => {
        setCycleCurrentPlayer((prev) => prev + 1);
        setIsActionCycleStage(true);
        setIsSkipButtonAvailable(false);
    };

    // Фаза отсчета
    const [isCountdownStage, setIsCountdownStage] = useState<boolean>(false);
    const [roundsLeft, setRoundsLeft] = useState<number>(ROUNDS_COUNT);
    // Для открытия модального окна для выбора раунда, в котором игрок будет действовать
    const [isChooseRoundPopupOpened, setIsChooseRoundPopupOpened] =
        useState<boolean>(false);
    // Сдвигаем первого игрока на последнюю позицию во время хода
    const changeOrder = (): void => {
        const updatedOrder: number[] = [...order];
        const updatedIsPlayerAlive: boolean[] = [...isPlayerAlive];
        if (updatedOrder.length === 0) {
            return;
        }
        const firstPlayerIndex = updatedOrder[0];
        updatedOrder.shift();
        updatedOrder.push(firstPlayerIndex);
        setOrder(updatedOrder);
        if (updatedIsPlayerAlive.length === 0) {
            return;
        }
        const firstPlayerInfo = updatedIsPlayerAlive[0];
        updatedIsPlayerAlive.shift();
        updatedIsPlayerAlive.push(firstPlayerInfo);
        setIsPlayerAlive(updatedIsPlayerAlive);
    };

    const [isGameOverPopupOpened, setIsGameOverPopupOpened] = useState<boolean>(false);
    const [isVictory, setIsVictory] = useState<boolean>(false);

    // Смена порядка игроков
    useEffect(() => {
        if (isCountdownStage) {
            // Проигрыш, если закончились раунды
            if (roundsLeft === 1) {
                setIsGameOverPopupOpened(true);
                setIsVictory(false);
                return;
            }
            setRoundsLeft((prev) => prev - 1);
            changeOrder();
            setIsCountdownStage(false);
            // Переходим в фазу программирования
            setIsProgrammingStage(true);
        }
    }, [isCountdownStage]);

    // Фаза программирования
    useEffect(() => {
        if (isProgrammingStage) {
            setIsFirstSelectPopupOpened(true);
            setIsProgrammingStage(false);
        }
    }, [isProgrammingStage]);

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
                            //hasOpened={true}
                            hasPlayerInRoom={hasPlayerInRoom[i]}
                            room={currentRoom.room}
                            language={language}
                            isAvailable={isRoomAvailable[i]}
                            // Обработка клика с условием
                            handleClick={clickHandlers[i]}
                        ></GameCard>
                    ))}
                </div>
                <PlayersTable
                    playersActions={playersActions}
                    activePlayer={activePlayer}
                    order={order}
                    isPlayerAlive={isPlayerAlive}
                />
                <ControlPanel
                    isRoomOpened={isRoomOpened}
                    setIsRoomOpened={(isRoomOpened: boolean[]) =>
                        setIsRoomOpened(isRoomOpened)
                    }
                    hasPlayerInRoom={hasPlayerInRoom}
                    setHasPlayerInRoom={(hasPlayerInRoom: boolean[][]) =>
                        setHasPlayerInRoom(hasPlayerInRoom)
                    }
                    setRoomsInfo={(roomsInfo: RoomInfo[]) => setRoomsInfo(roomsInfo)}
                    roomsInfo={roomsInfo}
                    language={language}
                    isOpen={isControlPanelOpened}
                    closePanel={() => {
                        setCycleCurrentPlayer((prev) => prev + 1);
                        setIsActionCycleStage(true);
                        setIsControlPanelOpened(false);
                    }}
                    roomIndex={roomIndex}
                    showGameOverPopup={() => setIsGameOverPopupOpened(true)}
                    setIsVictory={(isVictory: boolean) => setIsVictory(isVictory)}
                />
                <PlayersSelection
                    closeSelection={() => setIsPlayersSelectionOpened(false)}
                    setHasPlayerInRoom={setHasPlayerInRoom}
                    hasPlayerInRoom={hasPlayerInRoom}
                    roomIndex={roomIndex}
                    otherRooms={otherRooms}
                    isOpen={isPlayersSelectionOpened}
                    language={language}
                    canPlayerBeChoosen={neighbourPlayers}
                />
            </div>
            <SelectActions /* Для первого игрока */
                action={firstPlayerAction}
                setCurrentPlayerAction={setFirstPlayerAction}
                playerNumber={1}
                onClose={() => setIsFirstSelectPopupOpened(false)}
                isOpen={isFirstSelectPopupOpened}
                language={language}
                doNext={() => {
                    setIsSecondSelectPopupOpened(true);
                }}
                oldActions={playersActions}
                setActions={(actions: GameAction[]) => setPlayersActions(actions)}
            />
            <SelectActions /* Для второго игрока */
                action={secondPlayerAction}
                setCurrentPlayerAction={setSecondPlayerAction}
                playerNumber={2}
                onClose={() => setIsSecondSelectPopupOpened(false)}
                isOpen={isSecondSelectPopupOpened}
                language={language}
                doNext={() => setIsActionStage(true)}
                oldActions={playersActions}
                setActions={(actions: GameAction[]) => setPlayersActions(actions)}
            />
            {language === Language.Russian && (
                <Button
                    size='small'
                    handleClick={() => doBotsAction(activePlayer)}
                    className={cn({
                        [styles.buttonHidden]: !isBotMoveButtonAvailable,
                    })}
                >
                    ХОД БОТА
                </Button>
            )}
            {language === Language.English && (
                <Button
                    size='small'
                    handleClick={() => doBotsAction(activePlayer)}
                    className={cn({
                        [styles.buttonHidden]: !isBotMoveButtonAvailable,
                    })}
                >
                    BOT MOVE
                </Button>
            )}
            {language === Language.Russian && (
                <Button
                    size='small'
                    handleClick={skipMove}
                    className={cn({
                        [styles.buttonHidden]: !isSkipButtonAvailable,
                    })}
                >
                    ПРОПУСТИТЬ ХОД
                </Button>
            )}
            {language === Language.English && (
                <Button
                    size='small'
                    handleClick={skipMove}
                    className={cn({
                        [styles.buttonHidden]: !isSkipButtonAvailable,
                    })}
                >
                    SKIP MOVE
                </Button>
            )}
            {language === Language.Russian && (
                <Button
                    size='small'
                    handleClick={startRoundButtonHandleClick}
                    className={cn({
                        [styles.buttonHidden]: !isStartRoundButtonOpened,
                    })}
                >
                    НАЧАТЬ РАУНД
                </Button>
            )}
            {language === Language.English && (
                <Button
                    size='small'
                    handleClick={startRoundButtonHandleClick}
                    className={cn({
                        [styles.buttonHidden]: !isStartRoundButtonOpened,
                    })}
                >
                    START ROUND
                </Button>
            )}
            <GameOver
                isVictory={isVictory}
                language={language}
                isOpen={isGameOverPopupOpened}
            />
        </>
    );
};
