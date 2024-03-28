import { PlayersSelectionProps } from './PlayersSelection.props';
import styles from './PlayersSelection.module.css';
import { Language } from '@/constants/language.constants';
import cn from 'classnames';

export const PlayersSelection = ({
    canPlayerBeChoosen,
    language,
    isOpen,
    roomIndex,
    otherRooms,
    hasPlayerInRoom,
    setHasPlayerInRoom,
    closeSelection,
}: PlayersSelectionProps) => {
    let hasAvailablePlayers: boolean = false;

    for (let i = 0; i < canPlayerBeChoosen.length; i++) {
        if (canPlayerBeChoosen[i]) {
            hasAvailablePlayers = true;
            break;
        }
    }

    const сlickHandler = (
        roomIndex: number,
        otherRooms: number[],
        player: number
    ): void => {
        const updatedHasPlayerInRoom = [];
        for (let roomInfo of hasPlayerInRoom) {
            updatedHasPlayerInRoom.push([...roomInfo]);
        }
        // Выталкиваем другого игрока
        updatedHasPlayerInRoom[roomIndex][player - 1] = true;

        for (let currentRoomIndex of otherRooms) {
            updatedHasPlayerInRoom[currentRoomIndex][player - 1] = false;
        }

        setHasPlayerInRoom(updatedHasPlayerInRoom);
        closeSelection();
    };

    return (
        <div
            className={cn(styles.playersSelectionWrapper, {
                [styles.hidden]: !isOpen,
            })}
        >
            {language === Language.Russian && (
                <h1 className={styles.playersSelectionTitle}>
                    ВЫТОЛКНУТЬ <br /> ИГРОКА
                </h1>
            )}
            {language === Language.English && (
                <h1 className={styles.playersSelectionTitle}>PUSH PLAYER</h1>
            )}
            <div className={styles.playersSelectionInfo}>
                {!hasAvailablePlayers && (
                    <div>
                        <h2>---</h2>
                    </div>
                )}
                {canPlayerBeChoosen[0] && (
                    <button
                        onClick={() => сlickHandler(roomIndex, otherRooms, 1)}
                        className={styles.playerNumberButton}
                    >
                        {1}
                    </button>
                )}
                {canPlayerBeChoosen[1] && (
                    <button
                        onClick={() => сlickHandler(roomIndex, otherRooms, 2)}
                        className={styles.playerNumberButton}
                    >
                        {2}
                    </button>
                )}
                {canPlayerBeChoosen[2] && (
                    <button
                        onClick={() => сlickHandler(roomIndex, otherRooms, 3)}
                        className={styles.playerNumberButton}
                    >
                        {3}
                    </button>
                )}
                {canPlayerBeChoosen[3] && (
                    <button
                        onClick={() => сlickHandler(roomIndex, otherRooms, 4)}
                        className={styles.playerNumberButton}
                    >
                        {4}
                    </button>
                )}
                {canPlayerBeChoosen[4] && (
                    <button
                        onClick={() => сlickHandler(roomIndex, otherRooms, 5)}
                        className={styles.playerNumberButton}
                    >
                        {5}
                    </button>
                )}
                {canPlayerBeChoosen[5] && (
                    <button
                        onClick={() => сlickHandler(roomIndex, otherRooms, 6)}
                        className={styles.playerNumberButton}
                    >
                        {6}
                    </button>
                )}
            </div>
        </div>
    );
};
