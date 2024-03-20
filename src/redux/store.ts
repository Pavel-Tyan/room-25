import { configureStore } from '@reduxjs/toolkit';
import gameRoomsReducer from './gameRoomsSlice';

export const makeStore = () => {
    return configureStore({
        reducer: { gameRooms: gameRoomsReducer },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
