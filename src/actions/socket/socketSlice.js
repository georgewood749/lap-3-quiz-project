import { createSlice } from "@reduxjs/toolkit";

export const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        id: null,
    },
    reducers: {
        store_socket: (state, action) => {
            state.id = action.payload
        },
        // decrement: (state) => {
        //     state.value -= 1
        // },
    },
})

export const { store_socket } = socketSlice.actions

export default socketSlice.reducer
