import Image from 'next/image';
import styles from './ArrowButton.module.css';
import { ArrowButtonProps } from './ArrowButton.props';
import { Language } from '@/constants/language.constants';
import cn from 'classnames';

export const ArrowButton = ({ language, direction }: ArrowButtonProps): JSX.Element => {
    return (
        <button
            className={cn(styles.arrowButton, {
                [styles.arrowButtonVertical]: direction == 'vertical',
                [styles.arrowButtonHorizontal]: direction == 'horizontal',
            })}
        >
            <Image
                src='./arrow.svg'
                alt={
                    language === Language.Russian
                        ? 'Иконка для кнопки сдвига'
                        : 'Shift button icon'
                }
                width={40}
                height={40}
            ></Image>
        </button>
    );
};
