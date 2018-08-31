
import {combineReducers} from 'redux-immutable';

import score from './scoreReducer.js';
import screen from './screenReducer.js';
import game from './gameReducer.js';

const reducer = combineReducers({
    screen,
    score,
    game,
});

export {
    reducer,
}