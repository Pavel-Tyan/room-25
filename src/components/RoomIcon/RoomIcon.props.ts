import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface RoomIconProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode;
}
