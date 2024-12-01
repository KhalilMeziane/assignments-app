import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { AuthSlice } from '../../features/auth/application/authSlice'

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, combineReducers({ user: AuthSlice.reducer }))

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>