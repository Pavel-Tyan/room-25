import { Language } from '@/constants/language.constants';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LanguageState {
    language: Language;
}

const initialState: LanguageState = {
    language: Language.Russian,
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguage(state, action: PayloadAction<Language>) {
            state.language = action.payload;
        },
    },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
