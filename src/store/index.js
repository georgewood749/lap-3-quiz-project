import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../actions/socket/socketSlice'

export default configureStore({
    reducer: {
        socket: counterReducer,
    },
})
