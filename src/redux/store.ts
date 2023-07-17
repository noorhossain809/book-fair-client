import { configureStore } from '@reduxjs/toolkit'
import bookReducer from "./features/book/bookSlice"
import { api } from './api/apiSlice'
import userReducer from "./features/user/userSlice"
import { authApi } from './features/user/auth'
// ...

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: userReducer,
    book: bookReducer
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch