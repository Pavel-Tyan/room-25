import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './languageSlice';
import gameRoomsReducer from './gameRoomsSlice';
export const makeStore = () => {
    return configureStore({
        reducer: { languages: languageReducer, gameRooms: gameRoomsReducer },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
