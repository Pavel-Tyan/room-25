import { Languages } from '@/constants/languages.constants';
import { Popup } from '../Popup/Popup';
import { GameRulesProps } from './GameRules.props';

export const GameRules = ({ language, isOpen, onClose }: GameRulesProps): JSX.Element => {
    let modalTitle: string;

    if (language === Languages.Russian) {
        modalTitle = 'ПРАВИЛА ИГРЫ';
    } else {
        modalTitle = 'GAME RULES';
    }

    return (
        <Popup title={modalTitle} isOpen={isOpen} onClose={onClose}>
            <div>asdasdasd</div>
        </Popup>
    );
};
