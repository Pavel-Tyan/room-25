import { Languages } from '@/constants/language.constants';
import { Popup } from '../Popup/Popup';
import { GameRulesProps } from './GameRules.props';
import styles from './GameRules.module.css';
import Image from 'next/image';
import { RoomIcon } from '../RoomIcon/RoomIcon';
import {
    Rules,
    CardInfo,
    rulesEnglish,
    rulesRussian,
    cardsInfoEnglish,
    cardsInfoRussian,
    titlesEnglish,
    titlesRussian,
} from '@/constants/rules.constants';
import { Htag } from '../Htag/Htag';

export const GameRules = ({ language, isOpen, onClose }: GameRulesProps): JSX.Element => {
    let titles: string[];
    let cardsInfo: CardInfo[];
    let rules: Rules;

    if (language === Languages.Russian) {
        titles = titlesRussian;
        cardsInfo = cardsInfoRussian;
        rules = rulesRussian;
    } else {
        titles = titlesEnglish;
        cardsInfo = cardsInfoEnglish;
        rules = rulesEnglish;
    }

    return (
        <Popup language={language} title={titles[0]} isOpen={isOpen} onClose={onClose}>
            <div className={styles.rules}>
                <Htag tag='h3'>{titles[1]}</Htag>
                <div>{rules.description}</div>
                <Htag tag='h3'>{titles[2]}</Htag>
                <div className={styles.rulesContent}>
                    {rules.actionsInfo.map((action) => (
                        <div key={action.path} className={styles.card}>
                            <RoomIcon>
                                <Image
                                    src={action.path}
                                    width={50}
                                    height={50}
                                    alt={action.alt}
                                />
                            </RoomIcon>
                            <p className={styles.cardDescription}>{action.description}</p>
                        </div>
                    ))}
                </div>
                <Htag tag='h3'>{titles[3]}</Htag>
                <div className={styles.rulesContent}>
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
                            <p className={styles.cardDescription}>
                                {cardInfo.description}
                            </p>
                        </div>
                    ))}
                </div>
                <div className={styles.margin}></div>
            </div>
        </Popup>
    );
};
