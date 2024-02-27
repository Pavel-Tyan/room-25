import { Languages } from '@/constants/languages.constants';
import { Popup } from '../Popup/Popup';
import { GameRulesProps } from './GameRules.props';
import styles from './GameRules.module.css';
import Image from 'next/image';
import { CardInfo, cardsInfoRussian } from '@/constants/cards.constants';
import { cardsInfoEnglish } from '@/constants/cards.constants';
import { RoomIcon } from '../RoomIcon/RoomIcon';

export const GameRules = ({ language, isOpen, onClose }: GameRulesProps): JSX.Element => {
    let modalTitle: string;
    let cardsInfo: CardInfo[];

    if (language === Languages.Russian) {
        modalTitle = 'ПРАВИЛА ИГРЫ';
        cardsInfo = cardsInfoRussian;
    } else {
        modalTitle = 'GAME RULES';
        cardsInfo = cardsInfoEnglish;
    }

    return (
        <Popup title={modalTitle} isOpen={isOpen} onClose={onClose}>
            <div className={styles.content}>
                {cardsInfo.map((cardInfo) => (
                    <div key={cardInfo.alt} className={styles.card}>
                        <RoomIcon>
                            <Image
                                src={cardInfo.path}
                                width={50}
                                height={50}
                                alt={cardInfo.alt}
                            />
                        </RoomIcon>
                        <p className={styles.cardDescription}>{cardInfo.description}</p>
                    </div>
                ))}
                <div className={styles.margin}></div>
            </div>
        </Popup>
    );
};
