import { Language } from '@/constants/language.constants';
import { Card } from '../Card/Card';
import { RoundCounter } from '../RoundCounter/RoundCounter';
import styles from './Game.module.css';

export const Game = (): JSX.Element => {
    return (
        <div className={styles.gameWrapper}>
            <RoundCounter language={Language.Russian} roundsLeft={1} />
            <div className={styles.rooms}>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
                <Card color='white'>asd</Card>
            </div>
        </div>
    );
};
