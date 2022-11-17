import { createSlice } from "@reduxjs/toolkit";

export const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socket: null,
        user: { username: "WHO", isHost: false },
        room: { roomID: null, players: [] },
        qa: null,
    },
    reducers: {
        store_socket: ( state, action ) => {
            state.socket = action.payload
        },
        store_user:( state, action ) => {
            state.user.username = action.payload.username
            state.user.isHost = action.payload.isHost
        },
        update_room: ( state, action ) => {
            state.room = action.payload
        },
        store_qa: ( state, action ) => {
            state.qa = action.payload
        },
    },
})

export const { store_socket, store_user, update_room, store_qa } = socketSlice.actions

export default socketSlice.reducer
