import { Room } from '@/constants/room.constants';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LanguageState {
    rooms: Room[];
}

// const initialState: LanguageState = {
//     language: Language.Russian,
// };

// const languageSlice = createSlice({
//     name: 'language',
//     initialState,
//     reducers: {
//         changeLanguage(state, action: PayloadAction<Languages>) {
//             state.language = action.payload;
//         },
//     },
// });

// export const { changeLanguage } = languageSlice.actions;
// export default languageSlice.reducer;
