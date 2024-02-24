'use client';
import { Button } from '../Button/Button';
import { Htag } from '../Htag/Htag';
import styles from './Menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Languages } from '@/constants/languages.constants';
import { changeLanguage } from '@/redux/languageSlice';
import { useState } from 'react';
import { GameRules } from '../GameRules/GameRules';

export const Menu = (): JSX.Element => {
    let language = useSelector((state: RootState) => state.languages.language);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className={styles.menu}>
            <Htag tag='h1'>ROOM 25</Htag>
            <div className={styles.buttons}>
                <Button size='large'>
                    {language === Languages.Russian && 'НАЧАТЬ ИГРУ'}
                    {language === Languages.English && 'PLAY'}
                </Button>
                <Button size='large' handleClick={() => setIsOpen(true)}>
                    {language === Languages.Russian && 'ПРАВИЛА ИГРЫ'}
                    {language === Languages.English && 'GAME RULES'}
                </Button>
                <GameRules
                    language={language}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
                <div>
                    <Button
                        size='small'
                        handleClick={() => dispatch(changeLanguage(Languages.English))}
                    >
                        ENG
                    </Button>
                    <Button
                        size='small'
                        handleClick={() => dispatch(changeLanguage(Languages.Russian))}
                    >
                        РУС
                    </Button>
                </div>
            </div>
        </div>
    );
};
