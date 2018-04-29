
import {createStore} from 'redux';

import Immutable from 'immutable';

import {reducer} from '../reducers/index.js';
import {preStore} from '../conf/preset.js';


let preloadedState = Immutable.fromJS(preStore);

const store = createStore(reducer, preloadedState);

export {
    store,
}