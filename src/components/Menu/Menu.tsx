'use client';
import { Button } from '../Button/Button';
import { Htag } from '../Htag/Htag';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Language } from '@/constants/language.constants';
import { changeLanguage } from '@/redux/languageSlice';
import { useState } from 'react';
import { GameRules } from '../GameRules/GameRules';
import styles from './Menu.module.css';
import { GameDifficulty } from '../GameDifficulty/GameDifficulty';

export const Menu = (): JSX.Element => {
    let language = useSelector((state: RootState) => state.languages.language);
    const dispatch = useDispatch();

    const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
    const [isGameDifficultyOpen, setIsGameDifficultyOpen] = useState<boolean>(false);

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
                        handleClick={() => dispatch(changeLanguage(Language.English))}
                    >
                        ENG
                    </Button>
                    <Button
                        size='medium'
                        handleClick={() => dispatch(changeLanguage(Language.Russian))}
                    >
                        РУС
                    </Button>
                </div>
            </div>
        </div>
    );
};
