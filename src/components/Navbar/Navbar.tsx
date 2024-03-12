import { Languages } from '@/constants/language.constants';
import { Button } from '../Button/Button';
import { NavbarProps } from './Navbar.props';

export const Navbar = ({ language }: NavbarProps): JSX.Element => {
    return (
        <nav>
            <Button size='small'>
                {language === Languages.Russian && 'ЗАВЕРШИТЬ ИГРУ'}
                {language === Languages.English && 'FINISH'}
            </Button>
            <Button size='small'>
                {language === Languages.Russian && 'ПРАВИЛА ИГРЫ'}
                {language === Languages.English && 'GAME RULES'}
            </Button>
        </nav>
    );
};
