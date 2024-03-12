import { Languages } from '@/constants/language.constants';

export interface GameDifficultyProps {
    language: Languages;
    isOpen: boolean;
    onClose: () => void;
}
