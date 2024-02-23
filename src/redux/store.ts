import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './languageSlice';

export const makeStore = () => {
    return configureStore({
        reducer: { languages: languageReducer },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
