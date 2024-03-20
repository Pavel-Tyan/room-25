import { Card } from '../Card/Card';
import { GameCardProps } from './GameCard.props';

export const GameCard = ({
    hasOpened,
    hasPlayerInRoom,
    room,
}: GameCardProps): JSX.Element => {
    return (
        <Card color={hasOpened ? 'white' : 'black'}>
            <div></div>
        </Card>
    );
};
