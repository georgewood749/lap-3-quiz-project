import { createSlice } from "@reduxjs/toolkit";

export const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socket: null,
        user: { username: "WHO", isHost: false, scores:0 },
        room: { roomID: null, players: [] },
        qa: null,
        submittedAns:[],
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
        store_answers: ( state, action ) => {
            state.submittedAns.push(action.payload.answer)
            if(state.qa.contents[action.payload.questionNo].correct_answer === action.payload.answer){
                state.user.scores += state.qa.settings.settingCoef
            }
        },
    },
})

export const { store_socket, store_user, update_room, store_qa, store_answers } = socketSlice.actions

export default socketSlice.reducer
