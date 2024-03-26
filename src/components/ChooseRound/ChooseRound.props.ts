import { Language } from '@/constants/language.constants';

export interface ChooseRoundProps {
    language: Language;
    isOpen: boolean;
    setRoundNumber: (roundNumber: number) => void;
    closePopup: () => void;
}
