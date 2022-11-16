import { createSlice } from "@reduxjs/toolkit";

export const questionsSlice = createSlice({
    name: 'questions',
    initialState: {
        questions: null
    },
    reducers: {
        store_questions: (state, action) => {
            state.questions = action.payload
        },
        // decrement: (state) => {
        //     state.value -= 1
        // },
    },
})

export const { store_questions } = questionsSlice.actions

export default questionsSlice.reducer