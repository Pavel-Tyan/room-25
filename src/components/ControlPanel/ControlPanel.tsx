import { ArrowButton } from '../ArrowButton/ArrowButton';
import { ControlPanelProps } from './ControlPanel.props';
import styles from './ControlPanel.module.css';
import { Language } from '@/constants/language.constants';

export const ControlPanel = ({
    language,
    isVerticalShiftAvailable,
    isHorizontalShiftAvailable,
    closePanel,
    isOpen,
    roomsInfo,
    setRoomsInfo,
    roomIndex,
    hasPlayerInRoom,
    setHasPlayerInRoom,
    setIsRoomOpened,
    isRoomOpened,
}: ControlPanelProps): JSX.Element => {
    const ROW_LENGTH: number = 5;

    const getColumnIndex = (roomIndex: number): number => {
        return roomIndex % ROW_LENGTH;
    };

    const getRowIndex = (roomIndex: number): number => {
        return Math.floor(roomIndex / ROW_LENGTH);
    };

    const getHasPlayerInRoomCopy = (): boolean[][] => {
        const copy: boolean[][] = [];
        for (let roomInfo of hasPlayerInRoom) {
            copy.push([...roomInfo]);
        }
        return copy;
    };

    const verticalShift = (): void => {
        const columnIndex = getColumnIndex(roomIndex);
        const updatedRoomsInfo = [];

        for (let currentRoomInfo of roomsInfo) {
            updatedRoomsInfo.push({ ...currentRoomInfo });
        }

        updatedRoomsInfo[columnIndex] = { ...roomsInfo[columnIndex + 4 * ROW_LENGTH] };
        updatedRoomsInfo[columnIndex + ROW_LENGTH] = { ...roomsInfo[columnIndex] };
        updatedRoomsInfo[columnIndex + 2 * ROW_LENGTH] = {
            ...roomsInfo[columnIndex + ROW_LENGTH],
        };
        updatedRoomsInfo[columnIndex + 3 * ROW_LENGTH] = {
            ...roomsInfo[columnIndex + 2 * ROW_LENGTH],
        };
        updatedRoomsInfo[columnIndex + 4 * ROW_LENGTH] = {
            ...roomsInfo[columnIndex + 3 * ROW_LENGTH],
        };

        const updatedHasPlayerInRoom = getHasPlayerInRoomCopy();
        updatedHasPlayerInRoom[columnIndex] = [
            ...hasPlayerInRoom[columnIndex + 4 * ROW_LENGTH],
        ];
        updatedHasPlayerInRoom[columnIndex + ROW_LENGTH] = [
            ...hasPlayerInRoom[columnIndex],
        ];
        updatedHasPlayerInRoom[columnIndex + 2 * ROW_LENGTH] = [
            ...hasPlayerInRoom[columnIndex + ROW_LENGTH],
        ];
        updatedHasPlayerInRoom[columnIndex + 3 * ROW_LENGTH] = [
            ...hasPlayerInRoom[columnIndex + 2 * ROW_LENGTH],
        ];
        updatedHasPlayerInRoom[columnIndex + 4 * ROW_LENGTH] = [
            ...hasPlayerInRoom[columnIndex + 3 * ROW_LENGTH],
        ];

        const updatedIsRoomOpened: boolean[] = [...isRoomOpened];
        updatedIsRoomOpened[columnIndex] = isRoomOpened[columnIndex + 4 * ROW_LENGTH];
        updatedIsRoomOpened[columnIndex + ROW_LENGTH] = isRoomOpened[columnIndex];
        updatedIsRoomOpened[columnIndex + 2 * ROW_LENGTH] =
            isRoomOpened[columnIndex + ROW_LENGTH];
        updatedIsRoomOpened[columnIndex + 3 * ROW_LENGTH] =
            isRoomOpened[columnIndex + 2 * ROW_LENGTH];
        updatedIsRoomOpened[columnIndex + 4 * ROW_LENGTH] =
            isRoomOpened[columnIndex + 3 * ROW_LENGTH];

        setIsRoomOpened(updatedIsRoomOpened);
        setHasPlayerInRoom(updatedHasPlayerInRoom);
        setRoomsInfo(updatedRoomsInfo);
        closePanel();
    };

    const horizontalShift = (): void => {
        const rowIndex = getRowIndex(roomIndex);
        const updatedRoomsInfo = [];
        console.log(rowIndex);
        for (let currentRoomInfo of roomsInfo) {
            updatedRoomsInfo.push({ ...currentRoomInfo });
        }

        updatedRoomsInfo[rowIndex * ROW_LENGTH] = {
            ...roomsInfo[rowIndex * ROW_LENGTH + 1],
        };
        updatedRoomsInfo[rowIndex * ROW_LENGTH + 1] = {
            ...roomsInfo[rowIndex * ROW_LENGTH + 2],
        };
        updatedRoomsInfo[rowIndex * ROW_LENGTH + 2] = {
            ...roomsInfo[rowIndex * ROW_LENGTH + 3],
        };
        updatedRoomsInfo[rowIndex * ROW_LENGTH + 3] = {
            ...roomsInfo[rowIndex * ROW_LENGTH + 4],
        };
        updatedRoomsInfo[rowIndex * ROW_LENGTH + 4] = {
            ...roomsInfo[rowIndex * ROW_LENGTH],
        };
        const updatedHasPlayerInRoom = getHasPlayerInRoomCopy();

        updatedHasPlayerInRoom[rowIndex * ROW_LENGTH] = [
            ...hasPlayerInRoom[rowIndex * ROW_LENGTH + 1],
        ];
        updatedHasPlayerInRoom[rowIndex * ROW_LENGTH + 1] = [
            ...hasPlayerInRoom[rowIndex * ROW_LENGTH + 2],
        ];
        updatedHasPlayerInRoom[rowIndex * ROW_LENGTH + 2] = [
            ...hasPlayerInRoom[rowIndex * ROW_LENGTH + 3],
        ];
        updatedHasPlayerInRoom[rowIndex * ROW_LENGTH + 3] = [
            ...hasPlayerInRoom[rowIndex * ROW_LENGTH + 4],
        ];
        updatedHasPlayerInRoom[rowIndex * ROW_LENGTH + 4] = [
            ...hasPlayerInRoom[rowIndex * ROW_LENGTH],
        ];

        const updatedIsRoomOpened: boolean[] = [...isRoomOpened];
        updatedIsRoomOpened[rowIndex * ROW_LENGTH] =
            isRoomOpened[rowIndex * ROW_LENGTH + 1];
        updatedIsRoomOpened[rowIndex * ROW_LENGTH + 1] =
            isRoomOpened[rowIndex * ROW_LENGTH + 2];
        updatedIsRoomOpened[rowIndex * ROW_LENGTH + 2] =
            isRoomOpened[rowIndex * ROW_LENGTH + 3];
        updatedIsRoomOpened[rowIndex * ROW_LENGTH + 3] =
            isRoomOpened[rowIndex * ROW_LENGTH + 4];
        updatedIsRoomOpened[rowIndex * ROW_LENGTH + 4] =
            isRoomOpened[rowIndex * ROW_LENGTH];

        setIsRoomOpened(updatedIsRoomOpened);
        setHasPlayerInRoom(updatedHasPlayerInRoom);
        setRoomsInfo(updatedRoomsInfo);
        closePanel();
    };
    return (
        <>
            {isOpen && (
                <div className={styles.controlPanelWrapper}>
                    {language === Language.Russian && (
                        <h1 className={styles.controlPanelTitle}>СДВИНУТЬ</h1>
                    )}
                    {language === Language.English && (
                        <h1 className={styles.controlPanelTitle}>SHIFT</h1>
                    )}
                    <div className={styles.controlPanelsButtons}>
                        {isHorizontalShiftAvailable && (
                            <ArrowButton
                                direction='horizontal'
                                language={language}
                                handleClick={horizontalShift}
                            />
                        )}
                        {isVerticalShiftAvailable && (
                            <ArrowButton
                                direction='vertical'
                                language={language}
                                handleClick={verticalShift}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
