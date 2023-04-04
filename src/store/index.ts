import { explorerReducer } from "../slice/explorer";
import { configureStore } from "@reduxjs/toolkit";
import { snippetReducer } from "../slice/snippet";

export const store = configureStore({
    reducer: {
        explorer: explorerReducer,
        snippet: snippetReducer
    }    
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch