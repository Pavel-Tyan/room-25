import { Dialog } from '@headlessui/react';
import { PopupProps } from './Popup.props';
import styles from './Popup.module.css';
import Image from 'next/image';
import CrossIcon from '../../../public/cross.svg';
import { Language } from '@/constants/language.constants';

export const Popup = ({
    isOpen,
    title,
    children,
    language,
    hasCloseButton,
    onClose = () => {},
}: PopupProps): JSX.Element => {
    let closeButtonAltText: string;

    if (language === Language.Russian) {
        closeButtonAltText = 'Иконка кнопки для закрытия модального окна.';
    } else {
        closeButtonAltText = 'Button icon for closing modal window';
    }

    return (
        <Dialog className={styles.z} open={isOpen} onClose={onClose}>
            <div className={styles.background}>
                <Dialog.Panel className={styles.popup}>
                    <Dialog.Title className={styles.title}>{title}</Dialog.Title>
                    <div className={styles.content}>{children}</div>
                    {hasCloseButton && (
                        <button className={styles.closeButton} onClick={() => onClose()}>
                            <Image
                                src={CrossIcon}
                                width={45}
                                height={45}
                                alt={closeButtonAltText}
                            />
                        </button>
                    )}
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};
