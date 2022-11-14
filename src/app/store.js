import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../actions/counter/counterSlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
    },
})