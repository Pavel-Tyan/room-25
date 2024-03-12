import { Languages } from '@/constants/language.constants';

export interface GameRulesProps {
    language: Languages;
    isOpen: boolean;
    onClose: () => void;
}
