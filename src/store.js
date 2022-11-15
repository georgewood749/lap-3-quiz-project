import { createStore } from 'redux';
import { QuizReducer } from './reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

const store = createStore(QuizReducer, devToolsEnhancer());

export default store;