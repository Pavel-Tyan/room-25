import { Language } from '@/constants/language.constants';

export interface PlayersSelectionProps {
    canPlayerBeChoosen: boolean[]; // Брать hasPlayerInRoom
    language: Language;
}
