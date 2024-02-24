import { Dialog } from '@headlessui/react';
import { PopupProps } from './Popup.props';
import styles from './Popup.module.css';
import Image from 'next/image';
import CrossIcon from '../../../public/cross.svg';

export const Popup = ({
    isOpen,
    title,
    children,
    onClose = () => {},
}: PopupProps): JSX.Element => {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <div className={styles.background}>
                <Dialog.Panel className={styles.popup}>
                    <Dialog.Title className={styles.title}>{title}</Dialog.Title>
                    <div className={styles.content}>{children}</div>
                    <button className={styles.closeButton} onClick={() => onClose()}>
                        <Image
                            src={CrossIcon}
                            width={35}
                            height={35}
                            alt='Иконка для кнопки закрытия модального окна'
                        />
                    </button>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};
