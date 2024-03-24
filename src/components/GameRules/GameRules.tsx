import { Language } from '@/constants/language.constants';
import { Popup } from '../Popup/Popup';
import { GameRulesProps } from './GameRules.props';
import styles from './GameRules.module.css';
import Image from 'next/image';
import { Card } from '../Card/Card';
import {
    Rules,
    CardInfo,
    rulesEnglish,
    rulesRussian,
    cardsInfoEnglish,
    cardsInfoRussian,
} from '@/constants/rules.constants';
import { Htag } from '../Htag/Htag';

export const GameRules = ({ language, isOpen, onClose }: GameRulesProps): JSX.Element => {
    let title: string;
    let cardsInfo: CardInfo[];
    let rules: Rules;

    if (language === Language.Russian) {
        title = 'ПРАВИЛА ИГРЫ';
        cardsInfo = cardsInfoRussian;
        rules = rulesRussian;
    } else {
        title = 'GAME RULES';
        cardsInfo = cardsInfoEnglish;
        rules = rulesEnglish;
    }

    return (
        <Popup
            hasCloseButton={true}
            language={language}
            title={title}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className={styles.rules}>
                <Htag tag='h3'>
                    {language === Language.Russian && 'ОБЩИЕ ПРАВИЛА'}
                    {language === Language.English && 'COMMON RULES'}
                </Htag>
                <div>{rules.description}</div>
                <Htag tag='h3'>
                    {language === Language.Russian && 'ВИДЫ ДЕЙСТВИЙ'}
                    {language === Language.English && 'TYPES OF ACTIONS'}
                </Htag>
                <div className={styles.rulesContent}>
                    {rules.actionsInfo.map((action) => (
                        <div key={action.path} className={styles.card}>
                            <Card color='black'>
                                <Image
                                    src={action.path}
                                    width={50}
                                    height={50}
                                    alt={action.alt}
                                />
                            </Card>
                            <p className={styles.cardDescription}>{action.description}</p>
                        </div>
                    ))}
                </div>
                <Htag tag='h3'>
                    {language === Language.Russian && 'ЭФФЕКТЫ КОМНАТ'}
                    {language === Language.English && 'EFFECTS OF ROOMS'}
                </Htag>
                <div className={styles.rulesContent}>
                    {cardsInfo.map((cardInfo) => (
                        <div key={cardInfo.alt} className={styles.card}>
                            <Card color='white'>
                                <Image
                                    src={cardInfo.path}
                                    width={50}
                                    height={50}
                                    alt={cardInfo.alt}
                                />
                            </Card>
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
