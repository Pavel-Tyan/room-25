import { Language } from '@/constants/language.constants';
import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

export interface ArrowButtonProps
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    language: Language;
    direction: 'vertical' | 'horizontal';
}
