import { Languages } from '@/constants/languages.constants';

export interface GameRulesProps {
    language: Languages;
    isOpen: boolean;
    onClose: () => void;
}
