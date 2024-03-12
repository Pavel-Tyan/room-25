import { Language } from '@/constants/language.constants';
import { Button } from '../Button/Button';
import { NavbarProps } from './Navbar.props';
import { GameRules } from '../GameRules/GameRules';
import { useState } from 'react';
import { FinishGame } from '../FinishGame/FinishGame';

export const Navbar = ({ language }: NavbarProps): JSX.Element => {
    const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
    const [isFinishGameOpen, setIsFinishGameOpen] = useState<boolean>(false);

    return (
        <nav>
            <Button size='small' handleClick={() => setIsFinishGameOpen(true)}>
                {language === Language.Russian && 'ЗАВЕРШИТЬ ИГРУ'}
                {language === Language.English && 'FINISH'}
            </Button>
            <Button size='small' handleClick={() => setIsRulesOpen(true)}>
                {language === Language.Russian && 'ПРАВИЛА ИГРЫ'}
                {language === Language.English && 'GAME RULES'}
            </Button>
            <GameRules
                language={language}
                isOpen={isRulesOpen}
                onClose={() => setIsRulesOpen(false)}
            />
            <FinishGame
                language={language}
                isOpen={isFinishGameOpen}
                onClose={() => setIsFinishGameOpen(false)}
            />
        </nav>
    );
};
