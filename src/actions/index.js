const saveSocket = (socket) => {
    return {
        type: 'SAVE_SOCKET',
        payload: socket
    }
}

const updateState = (data) => {
    return {
        type: "UPDATE_STATE",
        payload: data
    }
}

const newUser = (user) => {
    return {
        type: 'NEW_USER',
        payload: user
    }
}

const saveUser = (user) => {
    return {
        type: 'SAVE_USER',
        payload: user
    }
}

const start = () => {
    return {
        type: 'START',
    }
}

const finish = (user) => {
    return {
        type: "FINISH",
        payload: user
    }
}

const nextQuestion = () => {
    return {
        type: 'NEXT_QUESTION'
    }
}

const addPoints = (player, points) => {
    return {
        type: 'ADD_POINTS',
        "player": player,
        "points": points
    }
}

export { saveSocket, updateState, newUser, saveUser, start, finish, nextQuestion, addPoints };