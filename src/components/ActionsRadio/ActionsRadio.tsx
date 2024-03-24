import { Language } from '@/constants/language.constants';
import { ActionsRadioProps } from './ActionsRadio.props';
import { RadioGroup } from '@headlessui/react';
import { GameAction } from '@/constants/action.constants';
import styles from './ActionsRadio.module.css';
import cn from 'classnames';
import Image from 'next/image';

export const ActionRadio = ({ language, action, onChange }: ActionsRadioProps) => {
    return (
        <RadioGroup value={action} onChange={onChange} className={styles.radio}>
            <RadioGroup.Option value={GameAction.Peek}>
                {({ checked }) => (
                    <Image
                        className={cn(styles.radioOption, {
                            [styles.checked]: checked,
                        })}
                        src={'./actions/eye.svg'}
                        alt={
                            language === Language.Russian
                                ? "Иконка для действия 'Заглянуть'"
                                : 'Icon for Peek action'
                        }
                        width={90}
                        height={90}
                    ></Image>
                )}
            </RadioGroup.Option>
            <RadioGroup.Option value={GameAction.Enter}>
                {({ checked }) => (
                    <Image
                        className={cn(styles.radioOption, {
                            [styles.checked]: checked,
                        })}
                        src={'./actions/enter.svg'}
                        alt={
                            language === Language.Russian
                                ? "Иконка для действия 'Войти'"
                                : 'Icon for Enter action'
                        }
                        width={90}
                        height={90}
                    ></Image>
                )}
            </RadioGroup.Option>
            <RadioGroup.Option value={GameAction.Push}>
                {({ checked }) => (
                    <Image
                        className={cn(styles.radioOption, {
                            [styles.checked]: checked,
                        })}
                        src={'./actions/push.svg'}
                        alt={
                            language === Language.Russian
                                ? "Иконка для действия 'Вытолкнуть'"
                                : 'Icon for Push action'
                        }
                        width={90}
                        height={90}
                    ></Image>
                )}
            </RadioGroup.Option>
            <RadioGroup.Option value={GameAction.Control}>
                {({ checked }) => (
                    <Image
                        className={cn(styles.radioOption, {
                            [styles.checked]: checked,
                        })}
                        src={'./actions/control.svg'}
                        alt={
                            language === Language.Russian
                                ? "Иконка для действия 'Контроллировать'"
                                : 'Icon for Control action'
                        }
                        width={90}
                        height={90}
                    ></Image>
                )}
            </RadioGroup.Option>
        </RadioGroup>
    );
};
