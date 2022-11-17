import { createSlice } from "@reduxjs/toolkit";

export const questionsSlice = createSlice({
    name: 'questions',
    initialState: {
        questions: []
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