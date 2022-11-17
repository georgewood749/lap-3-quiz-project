import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../actions/socket/socketSlice'

export default configureStore({
    reducer: {
        socket: counterReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            // Ignore these action types
            ignoredActions: ['socket/store_socket', 'socket/add_players'],
            // Ignore these field paths in all actions
            // ignoredActionPaths: ['socket.socket'],
            // Ignore these paths in the state
            ignoredPaths: ['socket.socket', 'socket.room'],
        },
    }),
})
