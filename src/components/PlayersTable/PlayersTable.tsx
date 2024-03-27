import { PlayersTableProps } from './PlayersTable.props';
import styles from './PlayersTable.module.css';
import Image from 'next/image';
import { GameAction } from '@/constants/action.constants';
import cn from 'classnames';

type GameActionsInfo = {
    path: string;
    alt: string;
};

export const PlayersTable = ({
    playersActions,
    order,
    activePlayer,
}: PlayersTableProps): JSX.Element => {
    const actionsInfo = new Map<GameAction, GameActionsInfo>();
    actionsInfo.set(GameAction.Peek, {
        path: './actions/eye.svg',
        alt: '"Peek" action icon',
    });
    actionsInfo.set(GameAction.Enter, {
        path: './actions/enter.svg',
        alt: '"Enter" action icon',
    });
    actionsInfo.set(GameAction.Push, {
        path: './actions/push.svg',
        alt: '"Push" action icon',
    });
    actionsInfo.set(GameAction.Control, {
        path: './actions/control.svg',
        alt: '"Control" action icon',
    });
    actionsInfo.set(GameAction.Unknown, {
        path: './question.svg',
        alt: 'Unknown type of action icon',
    });

    return (
        <div className={styles.playersTable}>
            {order.map((playerNumber) => (
                <div
                    key={`key number: ${playerNumber}`}
                    className={cn(styles.playerInfoWrapper, {
                        [styles.playerActive]: activePlayer === playerNumber,
                    })}
                >
                    <div>{playerNumber}</div>

                    <Image
                        // @ts-ignore
                        src={actionsInfo.get(playersActions[playerNumber - 1][0])?.path}
                        // @ts-ignore
                        alt={actionsInfo.get(playersActions[playerNumber - 1][0])?.alt}
                        width={40}
                        height={40}
                    />

                    <Image
                        // @ts-ignore
                        src={actionsInfo.get(playersActions[playerNumber - 1][1])?.path}
                        // @ts-ignore
                        alt={actionsInfo.get(playersActions[playerNumber - 1][1])?.alt}
                        width={40}
                        height={40}
                    />
                </div>
            ))}
        </div>
    );
};
