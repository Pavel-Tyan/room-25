import { Languages } from '@/constants/languages.constants';
import { ReactNode } from 'react';

export interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    language: Languages;
    children: ReactNode;
}
