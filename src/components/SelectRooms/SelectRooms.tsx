import { Room } from '@/constants/room.constants';
import { useState } from 'react';
import { Button } from '../Button/Button';
import Image from 'next/image';
import { Card } from '../Card/Card';
import { Language } from '@/constants/language.constants';
import styles from './SelectRooms.module.css';
import { Htag } from '../Htag/Htag';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setRoomsCustomMode } from '@/redux/gameRoomsSlice';

export const SelectRooms = (): JSX.Element => {
    let language: Language;

    if (sessionStorage.getItem('language') === Language.English) {
        language = Language.English;
    } else {
        language = Language.Russian;
    }

    const router = useRouter();
    const dispatch = useDispatch();

    const [roomCount, setRoomCount] = useState<number>(2);
    const [rooms, setRooms] = useState<Room[]>([Room.CentralRoom, Room.Room25]);

    const [acidRoomCount, setAcidRoomCount] = useState<number>(0);
    const [twinRoomCount, setTwinRoomCount] = useState<number>(0);
    const [observationRoomCount, setObservationRoomCount] = useState<number>(0);
    const [floodedRoomCount, setFloodedRoomCount] = useState<number>(0);
    const [darkRoomCount, setDarkRoomCount] = useState<number>(0);
    const [controlRoomCount, setControlRoomCount] = useState<number>(0);
    const [jailRoomCount, setJailRoomCount] = useState<number>(0);
    const [deathRoomCount, setDeathRoomCount] = useState<number>(0);
    const [emptyRoomCount, setEmptyRoomCount] = useState<number>(0);
    const [freezerRoomCount, setFreezerRoomCount] = useState<number>(0);
    const [whirlpoolRoomCount, setWhirlpoolRoomCount] = useState<number>(0);
    const [trapRoomCount, setTrapRoomCount] = useState<number>(0);
    const [illusionRoomCount, setIllusionRoomCount] = useState<number>(0);

    const deacreaseAcidRoomCount = () => {
        if (acidRoomCount !== 0) {
            setAcidRoomCount((prev) => prev - 1);

            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i] === Room.AcidBathRoom) {
                    const updatedRooms = [...rooms];
                    updatedRooms.splice(i, 1);
                    setRooms(updatedRooms);
                    setRoomCount((prev) => prev - 1);
                    break;
                }
            }
        }
    };

    const increaseAcidRoomCount = () => {
        const updatedRooms = [...rooms];
        updatedRooms.push(Room.AcidBathRoom);
        setRooms(updatedRooms);
        setAcidRoomCount((prev) => prev + 1);
        setRoomCount((prev) => prev + 1);
    };

    const deacreaseTwinRoomCount = () => {
        if (twinRoomCount !== 0) {
            setTwinRoomCount((prev) => prev - 2);

            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i] === Room.TwinRoom) {
                    const updatedRooms = [...rooms];
                    updatedRooms.splice(i, 2);
                    setRooms(updatedRooms);
                    setRoomCount((prev) => prev - 2);
                    break;
                }
            }
        }
    };

    const increaseTwinRoomCount = () => {
        if (twinRoomCount === 2) {
            return;
        }
        const updatedRooms = [...rooms];
        updatedRooms.push(Room.TwinRoom);
        updatedRooms.push(Room.TwinRoom);
        setRooms(updatedRooms);
        setTwinRoomCount((prev) => prev + 2);
        setRoomCount((prev) => prev + 2);
    };

    const deacreaseObservationRoomCount = () => {
        if (observationRoomCount !== 0) {
            setObservationRoomCount((prev) => prev - 1);

            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i] === Room.ObservationRoom) {
                    const updatedRooms = [...rooms];
                    updatedRooms.splice(i, 1);
                    setRooms(updatedRooms);
                    setRoomCount((prev) => prev - 1);
                    break;
                }
            }
        }
    };

    const increaseObservationRoomCount = () => {
        const updatedRooms = [...rooms];
        updatedRooms.push(Room.ObservationRoom);
        setRooms(updatedRooms);
        setObservationRoomCount((prev) => prev + 1);
        setRoomCount((prev) => prev + 1);
    };

    const deacreaseFloodedRoomCount = () => {
        if (floodedRoomCount !== 0) {
            setFloodedRoomCount((prev) => prev - 1);

            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i] === Room.FloodedRoom) {
                    const updatedRooms = [...rooms];
                    updatedRooms.splice(i, 1);
                    setRooms(updatedRooms);
                    setRoomCount((prev) => prev - 1);
                    break;
                }
            }
        }
    };

    const increaseFloodedRoomCount = () => {
        const updatedRooms = [...rooms];
        updatedRooms.push(Room.FloodedRoom);
        setRooms(updatedRooms);
        setFloodedRoomCount((prev) => prev + 1);
        setRoomCount((prev) => prev + 1);
    };

    const deacreaseDarkRoomCount = () => {
        if (darkRoomCount !== 0) {
            setDarkRoomCount((prev) => prev - 1);

            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i] === Room.DarkRoom) {
                    const updatedRooms = [...rooms];
                    updatedRooms.splice(i, 1);
                    setRooms(updatedRooms);
                    setRoomCount((prev) => prev - 1);
                    break;
                }
            }
        }
    };

    const increaseDarkRoomCount = () => {
        const updatedRooms = [...rooms];
        updatedRooms.push(Room.DarkRoom);
        setRooms(updatedRooms);
        setDarkRoomCount((prev) => prev + 1);
        setRoomCount((prev) => prev + 1);
    };

    const deacreaseControlRoomCount = () => {
        if (controlRoomCount !== 0) {
            setControlRoomCount((prev) => prev - 1);

            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i] === Room.ControlRoom) {
                    const updatedRooms = [...rooms];
                    updatedRooms.splice(i, 1);
                    setRooms(updatedRooms);
                    setRoomCount((prev) => prev - 1);
                    break;
                }
            }
        }
    };

    const increaseControlRoomCount = () => {
        const updatedRooms = [...rooms];
        updatedRooms.push(Room.ControlRoom);
        setRooms(updatedRooms);
        setControlRoomCount((prev) => prev + 1);
        setRoomCount((prev) => prev + 1);
    };

    const deacreaseJailRoomCount = () => {
        if (jailRoomCount !== 0) {
            setJailRoomCount((prev) => prev - 1);

            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i] === Room.JailRoom) {
                    const updatedRooms = [...rooms];
                    updatedRooms.splice(i, 1);
                    setRooms(updatedRooms);
                    setRoomCount((prev) => prev - 1);
                    break;
                }
            }
        }
    };

    const increaseJailRoomCount = () => {
        const updatedRooms = [...rooms];
        updatedRooms.push(Room.JailRoom);
        setRooms(updatedRooms);
        setJailRoomCount((prev) => prev + 1);
        setRoomCount((prev) => prev + 1);
    };

    const deacreaseDeathRoomCount = () => {
        if (deathRoomCount !== 0) {
            setDeathRoomCount((prev) => prev - 1);

            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i] === Room.DeathRoom) {
                    const updatedRooms = [...rooms];
                    updatedRooms.splice(i, 1);
                    setRooms(updatedRooms);
                    setRoomCount((prev) => prev - 1);
                    break;
                }
            }
        }
    };

    const increaseDeathRoomCount = () => {
        const updatedRooms = [...rooms];
        updatedRooms.push(Room.DeathRoom);
        setRooms(updatedRooms);
        setDeathRoomCount((prev) => prev + 1);
        setRoomCount((prev) => prev + 1);
    };

    const deacreaseEmptyRoomCount = () => {
        if (emptyRoomCount !== 0) {
            setEmptyRoomCount((prev) => prev - 1);

            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i] === Room.EmptyRoom) {
                    const updatedRooms = [...rooms];
                    updatedRooms.splice(i, 1);
                    setRooms(updatedRooms);
                    setRoomCount((prev) => prev - 1);
                    break;
                }
            }
        }
    };

    const increaseEmptyRoomCount = () => {
        const updatedRooms = [...rooms];
        updatedRooms.push(Room.EmptyRoom);
        setRooms(updatedRooms);
        setEmptyRoomCount((prev) => prev + 1);
        setRoomCount((prev) => prev + 1);
        console.log(rooms);
    };

    const deacreaseFreezerRoomCount = () => {
        if (freezerRoomCount !== 0) {
            setFreezerRoomCount((prev) => prev - 1);

            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i] === Room.FreezerRoom) {
                    const updatedRooms = [...rooms];
                    updatedRooms.splice(i, 1);
                    setRooms(updatedRooms);
                    setRoomCount((prev) => prev - 1);
                    break;
                }
            }
        }
    };

    const increaseFreezerRoomCount = () => {
        const updatedRooms = [...rooms];
        updatedRooms.push(Room.FreezerRoom);
        setRooms(updatedRooms);
        setFreezerRoomCount((prev) => prev + 1);
        setRoomCount((prev) => prev + 1);
    };

    const deacreaseWhirlpoolRoomCount = () => {
        if (whirlpoolRoomCount !== 0) {
            setWhirlpoolRoomCount((prev) => prev - 1);

            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i] === Room.WhirlpoolRoom) {
                    const updatedRooms = [...rooms];
                    updatedRooms.splice(i, 1);
                    setRooms(updatedRooms);
                    setRoomCount((prev) => prev - 1);
                    break;
                }
            }
        }
    };

    const increaseWhirlpoolRoomCount = () => {
        const updatedRooms = [...rooms];
        updatedRooms.push(Room.WhirlpoolRoom);
        setRooms(updatedRooms);
        setWhirlpoolRoomCount((prev) => prev + 1);
        setRoomCount((prev) => prev + 1);
    };

    const deacreaseTrapRoomCount = () => {
        if (trapRoomCount !== 0) {
            setTrapRoomCount((prev) => prev - 1);

            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i] === Room.TrapRoom) {
                    const updatedRooms = [...rooms];
                    updatedRooms.splice(i, 1);
                    setRooms(updatedRooms);
                    setRoomCount((prev) => prev - 1);
                    break;
                }
            }
        }
    };

    const increaseTrapRoomCount = () => {
        const updatedRooms = [...rooms];
        updatedRooms.push(Room.TrapRoom);
        setRooms(updatedRooms);
        setTrapRoomCount((prev) => prev + 1);
        setRoomCount((prev) => prev + 1);
    };

    const deacreaseIllusionRoomCount = () => {
        if (illusionRoomCount !== 0) {
            setIllusionRoomCount((prev) => prev - 1);

            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i] === Room.IllusionRoom) {
                    const updatedRooms = [...rooms];
                    updatedRooms.splice(i, 1);
                    setRooms(updatedRooms);
                    setRoomCount((prev) => prev - 1);
                    break;
                }
            }
        }
    };

    const increaseIllusionRoomCount = () => {
        if (illusionRoomCount === 1) {
            return;
        }
        const updatedRooms = [...rooms];
        updatedRooms.push(Room.IllusionRoom);
        setRooms(updatedRooms);
        setIllusionRoomCount((prev) => prev + 1);
        setRoomCount((prev) => prev + 1);
    };

    return (
        <div className={styles.selectRoomsWrapper}>
            <div>
                {language === Language.Russian && (
                    <Htag tag='h1'>{'Комнат выбрано: ' + roomCount}</Htag>
                )}
                {language === Language.English && (
                    <Htag tag='h1'>{'Rooms selected: ' + roomCount}</Htag>
                )}
            </div>
            <div className={styles.selectRoomsContent}>
                <div className={styles.selectRoomsCard}>
                    <Card color={'white'}>
                        <Image
                            src='./rooms/acid.svg'
                            alt='Acid bath room icon'
                            width={50}
                            height={50}
                        />
                    </Card>
                    <div className={styles.countButtonsWrapper}>
                        <button
                            onClick={() => deacreaseAcidRoomCount()}
                            className={styles.countButton}
                        >
                            -
                        </button>
                        {acidRoomCount}
                        <button
                            onClick={() => increaseAcidRoomCount()}
                            className={styles.countButton}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className={styles.selectRoomsCard}>
                    <Card color={'white'}>
                        <Image
                            src='./rooms/twins.svg'
                            alt='Twin room icon'
                            width={50}
                            height={50}
                        />
                    </Card>
                    <div className={styles.countButtonsWrapper}>
                        <button
                            onClick={() => deacreaseTwinRoomCount()}
                            className={styles.countButton}
                        >
                            -
                        </button>
                        {twinRoomCount}
                        <button
                            onClick={() => increaseTwinRoomCount()}
                            className={styles.countButton}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className={styles.selectRoomsCard}>
                    <Card color={'white'}>
                        <Image
                            src='./rooms/binoculars.svg'
                            alt='Observation room icon'
                            width={50}
                            height={50}
                        />
                    </Card>
                    <div className={styles.countButtonsWrapper}>
                        <button
                            onClick={() => deacreaseObservationRoomCount()}
                            className={styles.countButton}
                        >
                            -
                        </button>
                        {observationRoomCount}
                        <button
                            onClick={() => increaseObservationRoomCount()}
                            className={styles.countButton}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className={styles.selectRoomsCard}>
                    <Card color={'white'}>
                        <Image
                            src='./rooms/droplet.svg'
                            alt='Flooded room icon'
                            width={50}
                            height={50}
                        />
                    </Card>
                    <div className={styles.countButtonsWrapper}>
                        <button
                            onClick={() => deacreaseFloodedRoomCount()}
                            className={styles.countButton}
                        >
                            -
                        </button>
                        {floodedRoomCount}
                        <button
                            onClick={() => increaseFloodedRoomCount()}
                            className={styles.countButton}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className={styles.selectRoomsCard}>
                    <Card color={'white'}>
                        <Image
                            src='./rooms/eye.svg'
                            alt='Dark room icon'
                            width={50}
                            height={50}
                        />
                    </Card>
                    <div className={styles.countButtonsWrapper}>
                        <button
                            onClick={() => deacreaseDarkRoomCount()}
                            className={styles.countButton}
                        >
                            -
                        </button>
                        {darkRoomCount}
                        <button
                            onClick={() => increaseDarkRoomCount()}
                            className={styles.countButton}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className={styles.selectRoomsCard}>
                    <Card color={'white'}>
                        <Image
                            src='./rooms/gear.svg'
                            alt='Control room icon'
                            width={50}
                            height={50}
                        />
                    </Card>
                    <div className={styles.countButtonsWrapper}>
                        <button
                            onClick={() => deacreaseControlRoomCount()}
                            className={styles.countButton}
                        >
                            -
                        </button>
                        {controlRoomCount}
                        <button
                            onClick={() => increaseControlRoomCount()}
                            className={styles.countButton}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className={styles.selectRoomsCard}>
                    <Card color={'white'}>
                        <Image
                            src='./rooms/prison.svg'
                            alt='Jail room icon'
                            width={50}
                            height={50}
                        />
                    </Card>
                    <div className={styles.countButtonsWrapper}>
                        <button
                            onClick={() => deacreaseJailRoomCount()}
                            className={styles.countButton}
                        >
                            -
                        </button>
                        {jailRoomCount}
                        <button
                            onClick={() => increaseJailRoomCount()}
                            className={styles.countButton}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className={styles.selectRoomsCard}>
                    <Card color={'white'}>
                        <Image
                            src='./rooms/skull.svg'
                            alt='Death room icon'
                            width={50}
                            height={50}
                        />
                    </Card>
                    <div className={styles.countButtonsWrapper}>
                        <button
                            onClick={() => deacreaseDeathRoomCount()}
                            className={styles.countButton}
                        >
                            -
                        </button>
                        {deathRoomCount}
                        <button
                            onClick={() => increaseDeathRoomCount()}
                            className={styles.countButton}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className={styles.selectRoomsCard}>
                    <Card color={'white'}>
                        <Image
                            src='./rooms/smile.svg'
                            alt='Empty room icon'
                            width={50}
                            height={50}
                        />
                    </Card>
                    <div className={styles.countButtonsWrapper}>
                        <button
                            onClick={() => deacreaseEmptyRoomCount()}
                            className={styles.countButton}
                        >
                            -
                        </button>
                        {emptyRoomCount}
                        <button
                            onClick={() => increaseEmptyRoomCount()}
                            className={styles.countButton}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className={styles.selectRoomsCard}>
                    <Card color={'white'}>
                        <Image
                            src='./rooms/snowflake.svg'
                            alt='Freezer room icon'
                            width={50}
                            height={50}
                        />
                    </Card>
                    <div className={styles.countButtonsWrapper}>
                        <button
                            onClick={() => deacreaseFreezerRoomCount()}
                            className={styles.countButton}
                        >
                            -
                        </button>
                        {freezerRoomCount}
                        <button
                            onClick={() => increaseFreezerRoomCount()}
                            className={styles.countButton}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className={styles.selectRoomsCard}>
                    <Card color={'white'}>
                        <Image
                            src='./rooms/tornado.svg'
                            alt='Whirlpool room icon'
                            width={50}
                            height={50}
                        />
                    </Card>
                    <div className={styles.countButtonsWrapper}>
                        <button
                            onClick={() => deacreaseWhirlpoolRoomCount()}
                            className={styles.countButton}
                        >
                            -
                        </button>
                        {whirlpoolRoomCount}
                        <button
                            onClick={() => increaseWhirlpoolRoomCount()}
                            className={styles.countButton}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className={styles.selectRoomsCard}>
                    <Card color={'white'}>
                        <Image
                            src='./rooms/trap.svg'
                            alt='Trap room icon'
                            width={50}
                            height={50}
                        />
                    </Card>
                    <div className={styles.countButtonsWrapper}>
                        <button
                            onClick={() => deacreaseTrapRoomCount()}
                            className={styles.countButton}
                        >
                            -
                        </button>
                        {trapRoomCount}
                        <button
                            onClick={() => increaseTrapRoomCount()}
                            className={styles.countButton}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className={styles.selectRoomsCard}>
                    <Card color={'white'}>
                        <Image
                            src='./rooms/trick.svg'
                            alt='Illusion room icon'
                            width={50}
                            height={50}
                        />
                    </Card>
                    <div className={styles.countButtonsWrapper}>
                        <button
                            onClick={() => deacreaseIllusionRoomCount()}
                            className={styles.countButton}
                        >
                            -
                        </button>
                        {illusionRoomCount}
                        <button
                            onClick={() => increaseIllusionRoomCount()}
                            className={styles.countButton}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            {roomCount === 25 && (
                <Button
                    size='small'
                    handleClick={() => {
                        dispatch(setRoomsCustomMode(rooms));
                        router.push('/game');
                    }}
                >
                    OK
                </Button>
            )}
        </div>
    );
};
