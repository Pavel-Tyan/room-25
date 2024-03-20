'use client';
import { Button } from '../Button/Button';
import { Htag } from '../Htag/Htag';
import { Language } from '@/constants/language.constants';
import { useState } from 'react';
import { GameRules } from '../GameRules/GameRules';
import styles from './Menu.module.css';
import { GameDifficulty } from '../GameDifficulty/GameDifficulty';

export const Menu = (): JSX.Element => {
    const [language, setLanguage] = useState<Language>(Language.Russian);
    const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
    const [isGameDifficultyOpen, setIsGameDifficultyOpen] = useState<boolean>(false);

    const switchLanguage = (language: Language) => {
        setLanguage(language);
        sessionStorage.setItem('language', language);
    };

    return (
        <div className={styles.menu}>
            <Htag tag='h1'>ROOM 25</Htag>
            <div className={styles.buttons}>
                <Button size='large' handleClick={() => setIsGameDifficultyOpen(true)}>
                    {language === Language.Russian && 'НАЧАТЬ ИГРУ'}
                    {language === Language.English && 'PLAY'}
                </Button>
                <Button size='large' handleClick={() => setIsRulesOpen(true)}>
                    {language === Language.Russian && 'ПРАВИЛА ИГРЫ'}
                    {language === Language.English && 'GAME RULES'}
                </Button>
                <GameDifficulty
                    language={language}
                    isOpen={isGameDifficultyOpen}
                    onClose={() => setIsGameDifficultyOpen(false)}
                />
                <GameRules
                    language={language}
                    isOpen={isRulesOpen}
                    onClose={() => setIsRulesOpen(false)}
                />
                <div>
                    <Button
                        size='medium'
                        handleClick={() => switchLanguage(Language.English)}
                    >
                        ENG
                    </Button>
                    <Button
                        size='medium'
                        handleClick={() => switchLanguage(Language.Russian)}
                    >
                        РУС
                    </Button>
                </div>
            </div>
        </div>
    );
};
