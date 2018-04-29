
import {combineReducers} from 'redux-immutable';

import screen from './screenReducer.js';

const reducer = combineReducers({
    screen,
});

export {
    reducer,
}