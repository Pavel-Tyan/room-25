import styles from './SelectActions.module.css';
import { Language } from '@/constants/language.constants';
import { SelectActionsProps } from './SelectActions.props';
import { Popup } from '../Popup/Popup';
import { Htag } from '../Htag/Htag';
import { Button } from '../Button/Button';
import { useState } from 'react';
import cn from 'classnames';
import { ActionRadio } from '../ActionsRadio/ActionsRadio';
import { GameAction } from '@/constants/action.constants';

export const SelectActions = ({
    onClose,
    playerNumber,
    isOpen,
    language,
    setCurrentPlayerAction,
    oldActions,
    action,
    setActions,
    doNext = () => {},
}: SelectActionsProps): JSX.Element => {
    const getUpdatedActions = (
        oldActions: GameAction[],
        playerNumber: number
    ): GameAction[] => {
        const updatedActions: GameAction[] = [...oldActions];

        updatedActions[playerNumber - 1] = action;

        return updatedActions;
    };

    const submitSelectedAction = (): void => {
        setActions(getUpdatedActions(oldActions, playerNumber));
        onClose();
        doNext();
    };

    return (
        <div
            className={cn({
                [styles.isClosed]: isOpen === false,
            })}
        >
            <Popup
                language={language}
                hasCloseButton={false}
                isOpen={isOpen}
                title={
                    language === Language.Russian
                        ? `ВЫБОР ДЕЙСТВИЯ (ИГРОК ${playerNumber})`
                        : `CHOICE OF ACTION (PLAYER ${playerNumber})`
                }
            >
                <div className={styles.radios}>
                    <ActionRadio
                        language={language}
                        action={action}
                        onChange={setCurrentPlayerAction}
                    />
                    {language === Language.Russian && (
                        <Button size='large' handleClick={submitSelectedAction}>
                            ПОДТВЕРДИТЬ
                        </Button>
                    )}
                    {language === Language.English && (
                        <Button size='large' handleClick={submitSelectedAction}>
                            CONFIRM
                        </Button>
                    )}
                </div>
            </Popup>
        </div>
    );
};
