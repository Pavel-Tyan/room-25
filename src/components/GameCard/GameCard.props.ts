import { Room } from '@/constants/room.constants';

export interface GameCardProps {
    hasOpened: boolean;
    hasPlayerInRoom: boolean[];
    room: Room;
}
