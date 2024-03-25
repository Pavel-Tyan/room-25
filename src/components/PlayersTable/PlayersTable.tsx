import { PlayersTableProps } from './PlayersTable.props';
import styles from './PlayersTable.module.css';
import Image from 'next/image';
import { GameAction } from '@/constants/action.constants';

type GameActionsInfo = {
    path: string;
    alt: string;
};
actionsInfo: [
    {
        path: './actions/eye.svg',
        alt: '"Peek" action icon',
    },
    {
        path: './actions/enter.svg',
        alt: '"Enter" action icon',
    },
    {
        path: './actions/push.svg',
        alt: '"Push" action icon',
    },
    {
        path: './actions/control.svg',
        alt: '"Control" action icon',
    },
];
export const PlayersTable = ({
    playersActions,
    order,
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
                <div key={playerNumber} className={styles.playerInfoWrapper}>
                    <div>{playerNumber}</div>
                    <div>
                        <Image
                            src={
                                actionsInfo.get(playersActions[playerNumber - 1][0])?.path
                            }
                            alt={
                                actionsInfo.get(playersActions[playerNumber - 1][0])?.alt
                            }
                            width={40}
                            height={40}
                        />
                    </div>
                    <div>
                        <Image
                            src={
                                actionsInfo.get(playersActions[playerNumber - 1][1])?.path
                            }
                            alt={
                                actionsInfo.get(playersActions[playerNumber - 1][1])?.alt
                            }
                            width={40}
                            height={40}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};
