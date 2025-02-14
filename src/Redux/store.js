import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from './Slices/ResumeSlice'
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage
}

const persistedResumeReducer = persistReducer(persistConfig, resumeReducer)

export const store = configureStore({
  reducer: persistedResumeReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['register'],
      },
    }),
})

export const persistor = persistStore(store)