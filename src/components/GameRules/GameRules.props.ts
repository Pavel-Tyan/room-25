import { Languages } from '@/constants/languages.constants';
import { ReactNode } from 'react';

export interface GameRulesProps {
    language: Languages;
    isOpen: boolean;
    onClose: () => void;
}
