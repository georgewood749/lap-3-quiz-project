import { createSlice, current } from "@reduxjs/toolkit";

export const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socket: null,
        user: { username: "", isHost: false, scores:0 },
        room: { roomID: null, players: [{id:'', username:"", scores:0}] },
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
            state.room.roomID = action.payload.roomID
            state.room.players = action.payload.players.map(pid => { return {
                id: pid,
                scores : 0
            } })
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
        sync_socres: ( state, action ) => {
            const index = current(state).room.players.findIndex(p => p.id === action.payload.id)
            state.room.players[index].scores = action.payload.scores;
            state.room.players[index].username = action.payload.username;
        }
    },
})

export const { store_socket, store_user, update_room, store_qa, store_answers, sync_socres } = socketSlice.actions

export default socketSlice.reducer
