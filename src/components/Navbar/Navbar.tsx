import { Language } from '@/constants/language.constants';
import { Button } from '../Button/Button';
import { GameRules } from '../GameRules/GameRules';
import { useState } from 'react';
import { FinishGame } from '../FinishGame/FinishGame';

export const Navbar = (): JSX.Element => {
    let language: Language;

    if (sessionStorage.getItem('language') === Language.English) {
        language = Language.English;
    } else {
        language = Language.Russian;
    }

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
