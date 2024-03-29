import { Language } from '@/constants/language.constants';
import { RoomInfo } from '@/constants/room.constants';

export interface ControlPanelProps {
    language: Language;
    isVerticalShiftAvailable: boolean;
    isHorizontalShiftAvailable: boolean;
    closePanel: () => void;
    isOpen: boolean;
    roomsInfo: RoomInfo[];
    setRoomsInfo: (roomsInfo: RoomInfo[]) => void;
    roomIndex: number;
    hasPlayerInRoom: boolean[][];
    setHasPlayerInRoom: (hasPlayerInRoom: boolean[][]) => void;
}
