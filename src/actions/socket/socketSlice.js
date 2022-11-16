import { createSlice } from "@reduxjs/toolkit";

export const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socket: null,
        room: {roomID: null, roomSize: 0},
        player: 0,
        qa: null,
    },
    reducers: {
        store_socket: (state, action) => {
            state.socket = action.payload
        },
        store_room: ( state, action ) => {
            state.room = action.payload
        },
        add_player: (state) => {
            state.player += 1
        },
        store_qa: ( state, action ) => {
            state.qa = action.payload
            // state.qa = action.payload.map(r => { return {
            //     question: r.question,
            //     correct_answer: r.correct_answer,
            //     incorrect_answers: r.incorrect_answers
            // }})
        },
    },
})

export const { store_socket, store_room, add_player, store_qa } = socketSlice.actions

export default socketSlice.reducer
