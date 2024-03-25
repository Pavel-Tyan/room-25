import styles from './SelectActions.module.css';
import { Language } from '@/constants/language.constants';
import { SelectActionsProps } from './SelectActions.props';
import { Popup } from '../Popup/Popup';
import { Htag } from '../Htag/Htag';
import { Button } from '../Button/Button';
import { useState } from 'react';
import cn from 'classnames';
import { GameAction } from '@/constants/action.constants';
import { ActionRadio } from '../ActionsRadio/ActionsRadio';

export const SelectActions = ({
    onClose,
    isOpen,
    language,
    setActionsCount,
    doNextStage,
    firstAction,
    secondAction,
    setFirstAction,
    setSecondAction,
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

    const submitSelectedOneAction = (): void => {
        setIsSelectOneActionPopupOpen(false);
        onClose();
        doNextStage();
    };

    const submitSelectedTwoActions = (): void => {
        setIsSelectTwoActionsPopupOpen(false);
        onClose();
        doNextStage();
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
                isOpen={isSelectCountPopupOpen}
                title={
                    language === Language.Russian ? 'ВЫБОР ДЕЙСТВИЙ' : 'CHOICE OF ACTIONS'
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
