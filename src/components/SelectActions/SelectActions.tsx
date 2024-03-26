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
    setActionsCount,
    firstAction,
    secondAction,
    setFirstAction,
    setSecondAction,
    setActions,
    oldActions,
    doNext = () => {},
}: SelectActionsProps): JSX.Element => {
    const [isSelectCountPopupOpen, setIsSelectCountPopupOpen] = useState<boolean>(true);

    const [isSelectOneActionPopupOpen, setIsSelectOneActionPopupOpen] =
        useState<boolean>(false);
    const [isSelectTwoActionsPopupOpen, setIsSelectTwoActionsPopupOpen] =
        useState<boolean>(false);

    const submitOneAction = (): void => {
        setActionsCount(1);
        setIsSelectCountPopupOpen(false);
        setIsSelectOneActionPopupOpen(true);
    };

    const submitTwoActions = (): void => {
        setActionsCount(2);
        setIsSelectCountPopupOpen(false);
        setIsSelectTwoActionsPopupOpen(true);
    };

    const getUpdatedActions = (
        oldActions: GameAction[][],
        playerNumber: number
    ): GameAction[][] => {
        const updatedActions: GameAction[][] = [];

        for (let i = 0; i < oldActions.length; i++) {
            updatedActions.push(oldActions[i].slice(0));
        }

        updatedActions[playerNumber - 1] = [firstAction, secondAction];

        return updatedActions;
    };

    const submitSelectedOneAction = (): void => {
        setIsSelectOneActionPopupOpen(false);
        setActions(getUpdatedActions(oldActions, playerNumber));
        onClose();
        doNext();
    };

    const submitSelectedTwoActions = (): void => {
        setIsSelectTwoActionsPopupOpen(false);
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
                isOpen={isOpen && isSelectCountPopupOpen}
                title={
                    language === Language.Russian
                        ? `ИГРОК ${playerNumber}`
                        : `PLAYER ${playerNumber}`
                }
            >
                <div className={styles.selectCountWrapper}>
                    <Htag tag='h3'>
                        {language === Language.Russian && 'ВЫБЕРИТЕ КОЛИЧЕСТВО ДЕЙСТВИЙ'}
                        {language === Language.English && 'CHOOSE NUMBER OF ACTIONS'}
                    </Htag>
                    <Button size='large' handleClick={submitOneAction}>
                        1
                    </Button>
                    <Button size='large' handleClick={submitTwoActions}>
                        2
                    </Button>
                </div>
            </Popup>
            <Popup
                language={language}
                hasCloseButton={false}
                isOpen={isSelectOneActionPopupOpen}
                title={
                    language === Language.Russian
                        ? 'ВЫБОР 1 ДЕЙСТИЯ'
                        : 'CHOICE OF 1 ACTION'
                }
            >
                <div className={styles.radios}>
                    <ActionRadio
                        language={language}
                        action={firstAction}
                        onChange={setFirstAction}
                    />
                    {language === Language.Russian && (
                        <Button size='large' handleClick={submitSelectedOneAction}>
                            ПОДТВЕРДИТЬ
                        </Button>
                    )}
                    {language === Language.English && (
                        <Button size='large' handleClick={submitSelectedOneAction}>
                            CONFIRM
                        </Button>
                    )}
                </div>
            </Popup>
            <Popup
                language={language}
                hasCloseButton={false}
                isOpen={isSelectTwoActionsPopupOpen}
                title={
                    language === Language.Russian
                        ? 'ВЫБОР 2 ДЕЙСТВИЙ'
                        : 'CHOICE OF 2 ACTIONS'
                }
            >
                <div className={styles.radios}>
                    <ActionRadio
                        language={language}
                        action={firstAction}
                        onChange={setFirstAction}
                    />
                    <ActionRadio
                        language={language}
                        action={secondAction}
                        onChange={setSecondAction}
                    />
                    {language === Language.Russian && (
                        <Button size='large' handleClick={submitSelectedTwoActions}>
                            ПОДТВЕРДИТЬ
                        </Button>
                    )}
                    {language === Language.English && (
                        <Button size='large' handleClick={submitSelectedTwoActions}>
                            CONFIRM
                        </Button>
                    )}
                </div>
            </Popup>
        </div>
    );
};
