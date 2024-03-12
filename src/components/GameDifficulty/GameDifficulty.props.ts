import { Language } from '@/constants/language.constants';

export interface GameDifficultyProps {
    language: Language;
    isOpen: boolean;
    onClose: () => void;
}
