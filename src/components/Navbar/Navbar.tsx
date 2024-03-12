import { Language } from '@/constants/language.constants';
import { Button } from '../Button/Button';
import { NavbarProps } from './Navbar.props';

export const Navbar = ({ language }: NavbarProps): JSX.Element => {
    return (
        <nav>
            <Button size='small'>
                {language === Language.Russian && 'ЗАВЕРШИТЬ ИГРУ'}
                {language === Language.English && 'FINISH'}
            </Button>
            <Button size='small'>
                {language === Language.Russian && 'ПРАВИЛА ИГРЫ'}
                {language === Language.English && 'GAME RULES'}
            </Button>
        </nav>
    );
};
