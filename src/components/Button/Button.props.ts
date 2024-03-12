import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ButtonProps
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    size: 'large' | 'medium' | 'small';
    children: ReactNode;
    handleClick?: () => void; // Сделать обязательным параметром, когда все кнопки будут с обработчиками клика
}
