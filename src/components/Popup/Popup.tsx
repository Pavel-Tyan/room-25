import { Dialog } from '@headlessui/react';
import { PopupProps } from './Popup.props';
import styles from './Popup.module.css';
import Image from 'next/image';
import CrossIcon from '../../../public/cross.svg';
import { Htag } from '../Htag/Htag';

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
                    <Dialog.Title className={styles.title}>
                        <Htag tag='h2'>{title}</Htag>
                    </Dialog.Title>
                    <div className={styles.content}>{children}</div>
                    <button className={styles.closeButton} onClick={() => onClose()}>
                        <Image
                            src={CrossIcon}
                            width={45}
                            height={45}
                            alt='Иконка для кнопки закрытия модального окна'
                        />
                    </button>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};
