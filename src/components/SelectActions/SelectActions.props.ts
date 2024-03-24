import { Language } from '@/constants/language.constants';

export interface SelectActionsProps {
    language: Language;
    isOpen: boolean;
    setActionsCount: (actionsCount: number) => void;
    onClose: () => void;
}
