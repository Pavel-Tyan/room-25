import { Language } from '@/constants/language.constants';
import { RoomIcon } from '../RoomIcon/RoomIcon';
import { RoundCounter } from '../RoundCounter/RoundCounter';
import styles from './Game.module.css';

export const Game = (): JSX.Element => {
    return (
        <div className={styles.gameWrapper}>
            <RoundCounter language={Language.Russian} roundsLeft={1} />
            <div className={styles.rooms}>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
                <RoomIcon>asd</RoomIcon>
            </div>
        </div>
    );
};
