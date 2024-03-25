import { GameAction } from '@/constants/action.constants';

export interface PlayersTableProps {
    playersActions: GameAction[][];
    order: number[];
    activePlayer: number;
}
