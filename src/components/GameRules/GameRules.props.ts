import { Language } from '@/constants/language.constants';

export interface GameRulesProps {
    language: Language;
    isOpen: boolean;
    onClose: () => void;
}
