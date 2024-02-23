import { Button } from '../Button/Button';
import { Htag } from '../Htag/Htag';
import styles from './Menu.module.css';

export const Menu = (): JSX.Element => {
    return (
        <div className={styles.menu}>
            <Htag tag='h1'>ROOM 25</Htag>
            <div className={styles.buttons}>
                <Button size='large'>НАЧАТЬ ИГРУ</Button>
                <Button size='large'>ПРАВИЛА ИГРЫ</Button>
                <div>
                    <Button size='small'>ENG</Button>
                    <Button size='small'>RUS</Button>
                </div>
            </div>
        </div>
    );
};
