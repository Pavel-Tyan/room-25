import { Languages } from '@/constants/languages.constants';
import { Popup } from '../Popup/Popup';
import { GameRulesProps } from './GameRules.props';
import styles from './GameRules.module.css';
import Image from 'next/image';
import { CardInfo, cardsInfoRussian } from '@/constants/cards.constants';
import { cardsInfoEnglish } from '@/constants/cards.constants';
import { RoomIcon } from '../RoomIcon/RoomIcon';
import { Rules, rulesEnglish, rulesRussian } from '@/constants/rules.constants';
import { Htag } from '../Htag/Htag';

export const GameRules = ({ language, isOpen, onClose }: GameRulesProps): JSX.Element => {
    let titles: string[];
    let cardsInfo: CardInfo[];
    let rules: Rules;

    if (language === Languages.Russian) {
        titles = ['ПРАВИЛА ИГРЫ', 'ОБЩИЕ ПРАВИЛА', 'ВИДЫ ДЕЙСТВИЙ', 'ЭФФЕКТЫ КОМНАТ'];
        cardsInfo = cardsInfoRussian;
        rules = rulesRussian;
    } else {
        titles = ['GAME RULES', 'COMMON RULES', 'TYPES OF ACTIONS', 'EFFECTS OF ROOMS'];
        cardsInfo = cardsInfoEnglish;
        rules = rulesEnglish;
    }

    return (
        <Popup title={titles[0]} isOpen={isOpen} onClose={onClose}>
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
