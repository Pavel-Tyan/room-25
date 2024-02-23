import { Languages } from '@/constants/languages.constants';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LanguageState {
    language: Languages;
}

const initialState: LanguageState = {
    language: Languages.Russian,
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguage(state, action: PayloadAction<Languages>) {
            state.language = action.payload;
        },
    },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
