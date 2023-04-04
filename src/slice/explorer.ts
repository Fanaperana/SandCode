import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActiveType, ExplorerType } from '../components/explorer/types';
import type { RootState } from '../store';


interface ActiveState {
    explorerIndex: ActiveType;
}

const initialState = {
    explorerIndex: {
        index: 1,
        type: ExplorerType.FAVORITE,
    } as ActiveType,
    // isShown: true
};

export const explorerSlice = createSlice({
    name: "explorer",
    initialState,
    reducers: {
        explorerIndex: (state: ActiveState, action: PayloadAction<ActiveType>) => {
            state.explorerIndex = action.payload
        },
        // showExplorer: (state, action: PayloadAction<boolean>) => {
        //     state.isShown = action.payload
        // }
    }
})

export const {
    explorerIndex,
    // showExplorer
} = explorerSlice.actions;
export const selectExplorer = (state: RootState) => state.explorer;
export const explorerReducer = explorerSlice.reducer;