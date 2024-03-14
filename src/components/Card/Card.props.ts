import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface CardProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    color: 'black' | 'white';
    children: ReactNode;
}
