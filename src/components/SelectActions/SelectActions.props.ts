import { GameAction } from '@/constants/action.constants';
import { Language } from '@/constants/language.constants';

export interface SelectActionsProps {
    language: Language;
    isOpen: boolean;
    setActionsCount: (actionsCount: number) => void;
    onClose: () => void;
    doNextStage: () => void;
    firstAction: GameAction;
    secondAction: GameAction;
    setFirstAction: (action: GameAction) => void;
    setSecondAction: (action: GameAction) => void;
}
