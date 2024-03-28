import { Language } from '@/constants/language.constants';

export interface ControlPanelProps {
    language: Language;
    isVerticalShiftAvailable: boolean;
    isHorizontalShiftAvailable: boolean;
}
