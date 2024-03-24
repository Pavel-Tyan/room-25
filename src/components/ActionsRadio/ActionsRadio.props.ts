import { GameAction } from '@/constants/action.constants';
import { Language } from '@/constants/language.constants';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ActionsRadioProps {
    language: Language;
    action: GameAction;
    onChange: (action: GameAction) => void;
}
