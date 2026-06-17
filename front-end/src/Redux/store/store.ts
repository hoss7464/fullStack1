import { configureStore } from '@reduxjs/toolkit'
import  notifReducer  from '../actions/notifSlice'
import toggleReducer from "../actions/toggleSlice"

export const store = configureStore({
    reducer : {
        notif : notifReducer,
        toggle: toggleReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch