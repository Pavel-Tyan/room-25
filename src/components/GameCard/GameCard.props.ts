import { RoomClickHandler } from '@/constants/action.constants';
import { Language } from '@/constants/language.constants';
import { Room } from '@/constants/room.constants';
import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

export interface GameCardProps
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    hasOpened: boolean;
    hasPlayerInRoom: boolean[];
    room: Room;
    language: Language;
    isAvailable: boolean;
    // Нужно передавать сюда информацию о действии
    handleClick: () => void;
}
