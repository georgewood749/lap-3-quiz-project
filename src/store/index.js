import { configureStore } from '@reduxjs/toolkit'
import questionsReducer from '../actions/questions/questionsSlice'

export default configureStore({
    reducer: {
        questions: questionsReducer,
    },
})
