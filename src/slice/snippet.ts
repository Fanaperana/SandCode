import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';


interface ActiveState {
    snippetId: number;
}

const initialState = {
    snippetId: 0,
} as ActiveState;

export const snippetSlice = createSlice({
    name: "snippet",
    initialState,
    reducers: {
        snippetIndex: (state: ActiveState, action: PayloadAction<number>) => {
            state.snippetId = action.payload
        }
    }
})

export const { snippetIndex } = snippetSlice.actions;
export const selectSnippet = (state: RootState) => state.snippet;
export const snippetReducer = snippetSlice.reducer;