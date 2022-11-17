const initialState = {
    socket: {},
    quiz: {},
    user: ''
}

const QuizReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_SOCKET":
            return { ...state, quiz: action.payload }
        case "UPDATE_STATE":
            return { ...state, socket: action.payload }
        case "NEW_USER":
            let users = [...state.quiz.users];
            users.push({ name: action.payload, score: 0, completed: false });
            return { ...state, quiz: { ...state.quiz, users: users, }, };
        case "SAVE_USER":
            return { ...state, user: action.payload }
        case "START":
            return { ...state, quiz: { ...state.quiz, started: true } }
        case "FINISH":
            let finishedUsers = [...state.quiz.users];
            let userIndex = finishedUsers.findIndex(user => user.name === action.payload)
            finishedUsers[userIndex].finished = true;
            return {...state, quiz: {...state.quiz, users: finishedUsers}}
        case "NEXT_QUESTION":
            let nextQ = state.quiz.question + 1
            return { ...state, quiz: { ...state.quiz, question: nextQ } }
        case "ADD_POINTS":
            let users2 = [...state.quiz.users]
            let index = users2.findIndex(i => i.name === action.user)
            users2[index].points += action.points
            return { ...state, quiz: { ...state.quiz, users: users2 } }
        default:
            return state
    }
}

export default QuizReducer