import { Language } from '@/constants/language.constants';

export interface FinishGameProps {
    language: Language;
    isOpen: boolean;
    onClose: () => void;
}
