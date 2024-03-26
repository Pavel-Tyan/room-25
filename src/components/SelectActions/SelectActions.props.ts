import { GameAction } from '@/constants/action.constants';
import { Language } from '@/constants/language.constants';

export interface SelectActionsProps {
    language: Language;
    playerNumber: number;
    isOpen: boolean;
    setActionsCount: (actionsCount: number) => void;
    onClose: () => void;
    firstAction: GameAction;
    secondAction: GameAction;
    doNext?: () => void;
    setFirstAction: (action: GameAction) => void;
    setSecondAction: (action: GameAction) => void;
    setActions: (actions: GameAction[][]) => void;
    oldActions: GameAction[][];
}
