import { RoomIconProps } from './RoomIcon.props';
import styles from './RoomIcon.module.css';

export const RoomIcon = ({ children }: RoomIconProps): JSX.Element => {
    return <div className={styles.tileBackground}>{children}</div>;
};
