import { configureStore } from '@reduxjs/toolkit'
import  notifReducer  from '../actions/notifSlice'

export const store = configureStore({
    reducer : {
        notif : notifReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch