import { Language } from '@/constants/language.constants';

export interface PlayersSelectionProps {
    canPlayerBeChoosen: boolean[]; // Брать hasPlayerInRoom
    language: Language;
    isOpen: boolean;
    roomIndex: number;
    otherRooms: number[];
    hasPlayerInRoom: boolean[][];
    setHasPlayerInRoom: (hasPlayerInRoom: boolean[][]) => void;
    closeSelection: () => void;
}
