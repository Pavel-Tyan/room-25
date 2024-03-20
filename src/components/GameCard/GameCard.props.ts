import { Language } from '@/constants/language.constants';
import { Room } from '@/constants/room.constants';

export interface GameCardProps {
    hasOpened: boolean;
    hasPlayerInRoom: boolean[];
    room: Room;
    language: Language;
}
