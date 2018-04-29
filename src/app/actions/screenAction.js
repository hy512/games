
import Immutable from 'immutable';

const SCREEN_UPDATE_ACTION = Symbol('screen update action');


function screenUpdateAction(payload) {
    return {
        type: SCREEN_UPDATE_ACTION,
        screen: Immutable.fromJS(payload),
    };
}

export {
    SCREEN_UPDATE_ACTION,
    screenUpdateAction,
}