import { Room } from '@/constants/room.constants';
import { getRandomInt } from '@/helpers/helpers';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const ROOMS_COUNT = 25;
const CENTRAL_ROOM_INDEX = 12;
const CORNER_INDICES = new Set<number>([0, 1, 3, 4, 5, 9, 15, 19, 20, 21, 23, 24]); // Комната 25 может находиться только в угловых зонах.

// Первыми в массивах должны стоять Room25, ControlRoom, CentralRoom
const roomsForBeginnerMode: Room[] = [
    Room.CentralRoom,
    Room.Room25,
    Room.ControlRoom,
    Room.EmptyRoom,
    Room.EmptyRoom,
    Room.EmptyRoom,
    Room.EmptyRoom,
    Room.EmptyRoom,
    Room.EmptyRoom,
    Room.EmptyRoom,
    Room.EmptyRoom,
    Room.DarkRoom,
    Room.DarkRoom,
    Room.FreezerRoom,
    Room.FreezerRoom,
    Room.TrapRoom,
    Room.TrapRoom,
    Room.FloodedRoom,
    Room.FloodedRoom,
    Room.AcidBathRoom,
    Room.AcidBathRoom,
    Room.WhirlpoolRoom,
    Room.WhirlpoolRoom,
    Room.DeathRoom,
    Room.ObservationRoom,
];
const roomsForExpertMode: Room[] = [
    Room.CentralRoom,
    Room.Room25,
    Room.ControlRoom,
    Room.EmptyRoom,
    Room.EmptyRoom,
    Room.EmptyRoom,
    Room.EmptyRoom,
    Room.DarkRoom,
    Room.DarkRoom,
    Room.FreezerRoom,
    Room.FreezerRoom,
    Room.TrapRoom,
    Room.TrapRoom,
    Room.FloodedRoom,
    Room.FloodedRoom,
    Room.AcidBathRoom,
    Room.AcidBathRoom,
    Room.TwinRoom,
    Room.TwinRoom,
    Room.JailRoom,
    Room.JailRoom,
    Room.DeathRoom,
    Room.WhirlpoolRoom,
    Room.ObservationRoom,
    Room.IllusionRoom,
];

const getRandomOrderedRooms = (unorderedRooms: Room[]): Room[] => {
    const orderedRooms: Room[] = new Array(ROOMS_COUNT).fill(Room.EmptyRoom);
    const isRoomDetermined: boolean[] = new Array(ROOMS_COUNT).fill(false);

    orderedRooms[CENTRAL_ROOM_INDEX] = Room.CentralRoom;
    isRoomDetermined[CENTRAL_ROOM_INDEX] = true; // Центральная комната всегда в центре игрового поля.

    for (let room of unorderedRooms) {
        if (room === Room.CentralRoom) {
            continue;
        }

        let roomIndex = getRandomInt(0, ROOMS_COUNT);

        if (room === Room.Room25) {
            while (isRoomDetermined[roomIndex] || !CORNER_INDICES.has(roomIndex)) {
                roomIndex = getRandomInt(0, ROOMS_COUNT);
            }
        } else if (room === Room.ControlRoom) {
            while (isRoomDetermined[roomIndex] || !CORNER_INDICES.has(roomIndex)) {
                roomIndex = getRandomInt(0, ROOMS_COUNT);
            }
        } else {
            while (isRoomDetermined[roomIndex]) {
                roomIndex = getRandomInt(0, ROOMS_COUNT);
            }
        }

        isRoomDetermined[roomIndex] = true;
        orderedRooms[roomIndex] = room;
    }

    return orderedRooms;
};

// Функция нужна, чтобы хранить массив карт в sessionStorage
const RoomsToString = (rooms: Room[]): string => {
    return rooms.join('/');
};

export interface GameRoomsState {
    gameRooms: Room[];
}

const initialState: GameRoomsState = {
    gameRooms: getRandomOrderedRooms(roomsForBeginnerMode),
};

const gameRoomsSlice = createSlice({
    name: 'gameRooms',
    initialState,
    reducers: {
        setRoomsBeginnerMode(state) {
            state.gameRooms = getRandomOrderedRooms(roomsForBeginnerMode);
            sessionStorage.setItem('cards', RoomsToString(state.gameRooms));
        },
        setRoomsExpertMode(state) {
            state.gameRooms = getRandomOrderedRooms(roomsForExpertMode);
            sessionStorage.setItem('cards', RoomsToString(state.gameRooms));
        },
        setRoomsCustomMode(state, action: PayloadAction<Room[]>) {
            state.gameRooms = action.payload; // Набор комнат в аргументе
            sessionStorage.setItem('cards', RoomsToString(state.gameRooms));
        },
    },
});

export const { setRoomsBeginnerMode, setRoomsExpertMode, setRoomsCustomMode } =
    gameRoomsSlice.actions;
export default gameRoomsSlice.reducer;
