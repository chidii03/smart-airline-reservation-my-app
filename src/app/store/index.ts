// src/app/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook
} from 'react-redux'

import authReducer from './authSlice'
import flightSlice from './flightSlice'
import uiSlice from './uiSlice'
import aiReducer from './aiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    flights: flightSlice.reducer,
    ui: uiSlice.reducer,
    ai: aiReducer 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useDispatch = () => useReduxDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

// Store persistence utility
export const persistStore = {
  loadState: () => {
    try {
      const serializedState = localStorage.getItem('reduxState')
      if (!serializedState) return undefined
      return JSON.parse(serializedState)
    } catch {
      return undefined
    }
  },
  saveState: (state: RootState) => {
    try {
      const serializedState = JSON.stringify(state)
      localStorage.setItem('reduxState', serializedState)
    } catch {
      // ignore write errors
    }
  }
}

// Subscribe to store changes for persistence
store.subscribe(() => {
  persistStore.saveState(store.getState())
})

// Hydrate store on load
const persistedState = persistStore.loadState()
if (persistedState) {
  store.dispatch({ type: 'HYDRATE', payload: persistedState })
}

export default store