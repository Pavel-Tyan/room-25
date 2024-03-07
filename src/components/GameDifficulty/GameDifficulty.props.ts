import { Languages } from '@/constants/languages.constants';

export interface GameDifficultyProps {
    language: Languages;
    isOpen: boolean;
    onClose: () => void;
}
