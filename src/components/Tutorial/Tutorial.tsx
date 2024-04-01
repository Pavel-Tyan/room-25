import { Language } from '@/constants/language.constants';
import { RoundCounter } from '../RoundCounter/RoundCounter';
import { useEffect, useState } from 'react';
import styles from './Tutorial.module.css';
import { GameCard } from '../GameCard/GameCard';
import { Room, RoomInfo } from '@/constants/room.constants';
import { PlayersTable } from '../PlayersTable/PlayersTable';
import { GameAction } from '@/constants/action.constants';
import { Button } from '../Button/Button';
import cn from 'classnames';
import { useRouter } from 'next/navigation';

export const Tutorial = () => {
    let tutorialMessages: string[];
    const tutorialMessagesRussian: string[] = [
        `СУЩЕСТВУЕТ 4 ВИДА ДЕЙСТВИЯ: 'ВЗГЛЯНУТЬ', 'ВОЙТИ', 'ВЫТОЛКНУТЬ' и 'КОНТРОЛИРОВАТЬ'.
        НАЖМИ НА ВЫДЕЛЕННУЮ КОМНАТУ, ЧТОБЫ ИСПОЛЬЗОВАТЬ ДЕЙСТВИЕ 'ВЗГЛЯНУТЬ ЗА 1 ИГРОКА'`,
        `ТЕПЕРЬ СОВЕРШИ ДЕЙСТВИЕ ЗА 2 ИГРОКА. НАЖМИ НА ВЫДЕЛЕННУЮ КОМНАТУ, ЧТОБЫ ИСПОЛЬЗОВАТЬ 
        ДЕЙСТВИЕ 'ВОЙТИ'. ПОДРОБНЕЕ О ВСЕХ ДЕЙСТВИЯХ МОЖНО ПРОЧИТАТЬ В ПРАВИЛАХ`,
        `ВЫБРАННЫЕ ДЕЙСТВИЯ ОТОБРАЖАЮТСЯ В ТАБЛИЦЕ СПРАВА. ВХОД В КОМНАТУ СРАЗУ 
        ПРИМЕНЯЕТ НА ИГРОКА ЕЕ ЭФФЕКТ. ПОДРОБНЕЕ ОБ ЭФФЕКТАХ МОЖНО УЗНАТЬ В ПРАВИЛАХ ИГРЫ.
        НАЖМИ НА КНОПКУ, ЧТОБЫ ПРОПУСТИТЬ ДЕЙСТВИЯ БОТОВ, ПОСКОЛЬКУ ЭТО ОБУЧЕНИЕ`,
        `ПОСЛЕ ВСЕХ ХОДОВ ПОРЯДОК ИГРОКОВ СДВИГАЕТСЯ НА 1. ТЕПЕРЬ ИГРОК 1 ХОДИТ ПОСЛЕДНИМ. 
        СНОВА ИСПОЛЬЗУЙ ДЕЙСТВИЕ 'ВОЙТИ'`,
        `ПРОПУСТИМ ДЕЙСТВИЯ БОТОВ. ИСПОЛЬЗУЕМ ДЕЙСТВИЕ 'ВЗГЛЯНУТЬ ЗА 1 ИГРОКА'`,
        `СНОВА ИСПОЛЬЗУЙ ДЕЙСТВИЕ 'ВЗГЛЯНУТЬ' ЗА 1 ИГРОКА`,
        `ИСПОЛЬЗУЙ ДЕЙСТВИЕ 'ВОЙТИ' ЗА 2 ИГРОКА`,
        `ЧТОБЫ ПОБЕДИТЬ, НУЖНО ИСПОЛЬЗОВАТЬ ДЕЙСТВИЕ 'КОНТРОЛИРОВАТЬ' В КОМНАТЕ 25. 
        ТАКЖЕ ИГРОК ПОБЕЖДАЕТ, ЕСЛИ ВСЕ ОСТАЛЬНЫЕ ПЕРСОНАЖИ ПОГИБНУТ. ПОДРОБНЕЕ ОБ 
        УСЛОВИЯХ ПОБЕДЫ МОЖНО ПРОЧИТАТЬ В ПРАВИЛАХ. КОНЕЦ ТУТОРИАЛА`,
    ];
    const tutorialMessagesEnglish: string[] = [
        ` THERE ARE 4 TYPES OF ACTION: 'PEEK', 'ENTER', 'PUSH' and 'CONTROL'.
         CLICK ON THE HIGHLIGHTED ROOM TO USE THE 'PEAK' AT 1 PLAYER ACTION`,
        `NOW PERFORM THE ACTION FOR 2 PLAYERS. CLICK ON THE HIGHLIGHTED ROOM TO USE
         ACTION 'ENTER'. YOU CAN READ MORE ABOUT ALL ACTIONS IN THE RULES`,
        `THE SELECTED ACTIONS ARE DISPLAYED IN THE TABLE ON THE RIGHT. ENTRANCE TO THE ROOM IMMEDIATELY
         APPLY ITS EFFECT TO THE PLAYER. MORE DETAILS ABOUT THE EFFECTS CAN BE FOUND IN THE RULES OF THE GAME.
         CLICK THE BUTTON TO SKIP THE BOT'S ACTIONS, SINCE THIS IS A TRAINING`,
        `AFTER ALL MOVES, THE ORDER OF PLAYERS MOVES BY 1. PLAYER 1 IS NOW LAST TO GO.
         AGAIN USE THE 'ENTER' ACTION`,
        `LET'S SKIP THE BOTS' ACTIONS. USING THE ACTION 'PEEK AT 1 PLAYER'`,
        `USE THE 'PEEK' ACTION FOR 1 PLAYER AGAIN`,
        `USE THE 'ENTER' ACTION FOR 2 PLAYERS`,
        `TO WIN, YOU MUST USE THE 'CONTROL' ACTION IN ROOM 25.
         ALSO THE PLAYER WINS IF ALL OTHER CHARACTERS ARE DEAD. MORE ABOUT
         CONDITIONS FOR WINNING CAN BE READ IN THE RULES. END OF TUTORIAL`,
    ];

    let language: Language;

    if (sessionStorage.getItem('language') === Language.English) {
        language = Language.English;
        tutorialMessages = tutorialMessagesEnglish;
    } else {
        language = Language.Russian;
        tutorialMessages = tutorialMessagesRussian;
    }

    const rooms: Room[] = [
        Room.EmptyRoom,
        Room.EmptyRoom,
        Room.EmptyRoom,
        Room.EmptyRoom,
        Room.EmptyRoom,
        Room.EmptyRoom,
        Room.EmptyRoom,
        Room.EmptyRoom,
        Room.DeathRoom,
        Room.Room25,
        Room.EmptyRoom,
        Room.EmptyRoom,
        Room.CentralRoom,
        Room.EmptyRoom,
        Room.EmptyRoom,
        Room.EmptyRoom,
        Room.EmptyRoom,
        Room.EmptyRoom,
        Room.EmptyRoom,
        Room.EmptyRoom,
        Room.EmptyRoom,
        Room.EmptyRoom,
        Room.EmptyRoom,
        Room.EmptyRoom,
        Room.EmptyRoom,
    ];

    const roomsInfoInitial: RoomInfo[] = [];

    for (let i = 0; i < rooms.length; i++) {
        roomsInfoInitial.push({
            room: rooms[i],
            key: i,
        });
    }
    const ROOMS_COUNT: number = 25;
    const PLAYERS_COUNT: number = 6;
    const ROUNDS_COUNT: number = 10;

    const hasPlayerInRoomInitial: boolean[][] = Array(ROOMS_COUNT).fill(
        Array(PLAYERS_COUNT).fill(false)
    );
    hasPlayerInRoomInitial[12] = Array(PLAYERS_COUNT).fill(true);
    const isRoomOpenedInitial: boolean[] = Array(ROOMS_COUNT).fill(false);
    isRoomOpenedInitial[12] = true;

    const [roundsLeft, setRoundsLeft] = useState<number>(ROUNDS_COUNT);
    const [hasPlayerInRoom, setHasPlayerInRoom] =
        useState<boolean[][]>(hasPlayerInRoomInitial);
    const [isRoomOpened, setIsRoomOpened] = useState<boolean[]>(isRoomOpenedInitial);
    const [order, setOrder] = useState<number[]>([1, 2, 3, 4, 5, 6]);
    const [isPlayerAlive, setIsPlayerAlive] = useState<boolean[]>(
        Array(PLAYERS_COUNT).fill(true)
    );

    const isRoomAvailableInitial = Array(PLAYERS_COUNT).fill(false);
    const [isRoomAvailable, setIsRoomAvailable] = useState<boolean[]>(
        Array(PLAYERS_COUNT).fill(false)
    );
    const [roomsInfo, setRoomsInfo] = useState<RoomInfo[]>(roomsInfoInitial);

    const [clickHandlers, setClickHandlers] = useState<(() => void)[]>(
        Array(ROOMS_COUNT).fill(() => {})
    );

    const [currentTutorialText, setCurrentTutorialText] = useState<string>(
        tutorialMessages[0]
    );

    const [playersActions, setPlayersActions] = useState<GameAction[]>([
        GameAction.Peek,
        GameAction.Enter,
        GameAction.Unknown,
        GameAction.Unknown,
        GameAction.Unknown,
        GameAction.Unknown,
    ]);
    const [activePlayer, setActivePlayer] = useState<number>(1);
    const [isPlayersSelectionOpened, setIsPlayersSelectionOpened] =
        useState<boolean>(false);
    const [roomIndex, setRoomIndex] = useState<number>(12);
    const [neighbourPlayers, setNeighbourPlayers] = useState<boolean[]>(
        Array(PLAYERS_COUNT).fill(true)
    );
    const [otherRooms, setOtherRooms] = useState<number[]>([]);
    const [isBackgroundOpened, setIsBackgroundOpened] = useState<boolean>(true);

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

    const [isSecondMove, setIsSecondMove] = useState<boolean>(false);

    useEffect(() => {
        const updatedIsRoomAvailable = [...isRoomAvailable];
        const updatedClickHandlers = [...clickHandlers];

        updatedIsRoomAvailable[13] = true;
        updatedClickHandlers[13] = () => {
            const updatedIsRoomOpened = [...isRoomOpened];
            updatedIsRoomOpened[13] = true;
            setIsRoomOpened(updatedIsRoomOpened);
            setIsRoomAvailable(Array(ROOMS_COUNT).fill(false));

            setTimeout(() => {
                setClickHandlers(Array(ROOMS_COUNT).fill(() => {}));
                updatedIsRoomOpened[13] = false;
                setIsRoomOpened(updatedIsRoomOpened);
                setIsSecondMove(true);
            }, 2000);
        };
        setIsRoomAvailable(updatedIsRoomAvailable);
        setClickHandlers(updatedClickHandlers);
    }, []);

    const [isThirdMove, setIsThirdMove] = useState<boolean>(false);
    const [isSkipButtonOpened, setIsSkipButtonOpened] = useState<boolean>(false);
    useEffect(() => {
        if (isSecondMove) {
            setActivePlayer(2);
            setCurrentTutorialText(tutorialMessages[1]);

            const updatedIsRoomAvailable = [...isRoomAvailable];
            const updatedClickHandlers = [...clickHandlers];
            const updatedHasPlayerInRoom: boolean[][] = [];

            for (let roomInfo of hasPlayerInRoom) {
                updatedHasPlayerInRoom.push([...roomInfo]);
            }

            updatedIsRoomAvailable[13] = true;
            updatedClickHandlers[13] = () => {
                const updatedIsRoomOpened = [...isRoomOpened];
                updatedIsRoomOpened[13] = true;
                updatedHasPlayerInRoom[12][1] = false;
                updatedHasPlayerInRoom[13][1] = true;
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                setIsRoomOpened(updatedIsRoomOpened);
                setIsRoomAvailable(Array(ROOMS_COUNT).fill(false));
                setIsSecondMove(false);
                setIsThirdMove(true);
            };
            setIsRoomAvailable(updatedIsRoomAvailable);
            setClickHandlers(updatedClickHandlers);
        }
    }, [isSecondMove]);

    const [isFourthMove, setIsFourthMove] = useState<boolean>(false);

    const startNewCycle = () => {
        changeOrder();
        setActivePlayer(2);
        setIsSkipButtonOpened(false);
        setCurrentTutorialText(tutorialMessages[3]);
        setIsThirdMove(false);
        setIsFourthMove(true);
    };

    useEffect(() => {
        if (isThirdMove) {
            setActivePlayer(3);
            setCurrentTutorialText(tutorialMessages[2]);
            setIsSkipButtonOpened(true);
        }
    }, [isThirdMove]);

    const [isFifthMove, setIsFifthMove] = useState<boolean>(false);

    useEffect(() => {
        if (isFourthMove) {
            const updatedIsRoomAvailable = [...isRoomAvailable];
            const updatedClickHandlers = [...clickHandlers];
            const updatedHasPlayerInRoom: boolean[][] = [];

            for (let roomInfo of hasPlayerInRoom) {
                updatedHasPlayerInRoom.push([...roomInfo]);
            }

            updatedIsRoomAvailable[14] = true;
            updatedClickHandlers[14] = () => {
                const updatedIsRoomOpened = [...isRoomOpened];
                updatedIsRoomOpened[14] = true;
                updatedHasPlayerInRoom[13][1] = false;
                updatedHasPlayerInRoom[14][1] = true;
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                setIsRoomOpened(updatedIsRoomOpened);
                setIsRoomAvailable(Array(ROOMS_COUNT).fill(false));
                setIsFourthMove(false);
                setIsFifthMove(true);
                setActivePlayer(1);
                setCurrentTutorialText(tutorialMessages[4]);
            };

            setIsRoomAvailable(updatedIsRoomAvailable);
            setClickHandlers(updatedClickHandlers);
        }
    }, [isFourthMove]);

    const [isSixthMove, setIsSixthMove] = useState<boolean>(false);

    useEffect(() => {
        if (isFifthMove) {
            const updatedIsRoomAvailable = [...isRoomAvailable];
            const updatedClickHandlers = [...clickHandlers];

            updatedIsRoomAvailable[17] = true;
            updatedClickHandlers[17] = () => {
                const updatedIsRoomOpened = [...isRoomOpened];
                updatedIsRoomOpened[17] = true;
                setIsRoomOpened(updatedIsRoomOpened);
                setIsRoomAvailable(Array(ROOMS_COUNT).fill(false));

                setTimeout(() => {
                    setClickHandlers(Array(ROOMS_COUNT).fill(() => {}));
                    updatedIsRoomOpened[17] = false;
                    setIsRoomOpened(updatedIsRoomOpened);
                    setIsSixthMove(true);
                    setIsFifthMove(false);
                    changeOrder();
                    setActivePlayer(1);
                    setCurrentTutorialText(tutorialMessages[5]);
                }, 2000);
            };
            setIsRoomAvailable(updatedIsRoomAvailable);
            setClickHandlers(updatedClickHandlers);
        }
    }, [isFifthMove]);

    const [isSeventhMove, setIsSeventhMove] = useState<boolean>(false);

    useEffect(() => {
        if (isSixthMove) {
            const updatedIsRoomAvailable = [...isRoomAvailable];
            const updatedClickHandlers = [...clickHandlers];

            updatedIsRoomAvailable[11] = true;
            updatedClickHandlers[11] = () => {
                const updatedIsRoomOpened = [...isRoomOpened];
                updatedIsRoomOpened[11] = true;
                setIsRoomOpened(updatedIsRoomOpened);
                setIsRoomAvailable(Array(ROOMS_COUNT).fill(false));

                setTimeout(() => {
                    setClickHandlers(Array(ROOMS_COUNT).fill(() => {}));
                    updatedIsRoomOpened[11] = false;
                    setIsRoomOpened(updatedIsRoomOpened);
                    setCurrentTutorialText(tutorialMessages[6]);
                    setIsSixthMove(false);
                    setIsSeventhMove(true);
                    setActivePlayer(2);
                }, 2000);
            };
            setIsRoomAvailable(updatedIsRoomAvailable);
            setClickHandlers(updatedClickHandlers);
        }
    }, [isSixthMove]);

    useEffect(() => {
        if (isSeventhMove) {
            setActivePlayer(2);

            const updatedIsRoomAvailable = [...isRoomAvailable];
            const updatedClickHandlers = [...clickHandlers];
            const updatedHasPlayerInRoom: boolean[][] = [];

            for (let roomInfo of hasPlayerInRoom) {
                updatedHasPlayerInRoom.push([...roomInfo]);
            }

            updatedIsRoomAvailable[9] = true;
            updatedClickHandlers[9] = () => {
                const updatedIsRoomOpened = [...isRoomOpened];
                updatedIsRoomOpened[9] = true;
                updatedHasPlayerInRoom[14][1] = false;
                updatedHasPlayerInRoom[9][1] = true;
                setHasPlayerInRoom(updatedHasPlayerInRoom);
                setIsRoomOpened(updatedIsRoomOpened);
                setIsRoomAvailable(Array(ROOMS_COUNT).fill(false));
                setCurrentTutorialText(tutorialMessages[7]);
                setIsSeventhMove(false);
                setIsMainMenuButtonOpened(true);
            };
            setIsRoomAvailable(updatedIsRoomAvailable);
            setClickHandlers(updatedClickHandlers);
        }
    }, [isSeventhMove]);

    const [isMainMenuButtonOpened, setIsMainMenuButtonOpened] = useState<boolean>(false);

    const router = useRouter();
    return (
        <div className={styles.gameWrapper}>
            {isBackgroundOpened && (
                <div className={styles.message}>{currentTutorialText}</div>
            )}

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
            <Button
                handleClick={() => startNewCycle()}
                className={cn(styles.skipButton, {
                    [styles.hiddenButton]: !isSkipButtonOpened,
                })}
                size='small'
            >
                {language === Language.Russian && 'ПРОПУСТИТЬ ХОД БОТОВ'}
                {language === Language.English && 'SKIP BOTS MOVE'}
            </Button>
            <Button
                handleClick={() => router.push('/')}
                className={cn(styles.skipButton, {
                    [styles.hiddenButton]: !isMainMenuButtonOpened,
                })}
                size='small'
            >
                {language === Language.Russian && 'ВЫЙТИ В МЕНЮ'}
                {language === Language.English && 'GO TO MENU'}
            </Button>
        </div>
    );
};
