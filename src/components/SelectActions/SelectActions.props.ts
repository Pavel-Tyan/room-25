import { GameAction } from '@/constants/action.constants';
import { Language } from '@/constants/language.constants';

export interface SelectActionsProps {
    language: Language;
    playerNumber: number;
    isOpen: boolean;
    setCurrentPlayerAction: (action: GameAction) => void;
    onClose: () => void;

    doNext?: () => void;

    setActions: (actions: GameAction[]) => void;
    oldActions: GameAction[];
    action: GameAction;
}
