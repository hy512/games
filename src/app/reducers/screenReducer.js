import {SCREEN_UPDATE_ACTION} from '../actions';


export default function(prevState, action) {
    switch(action.type) {
        default: return prevState;
        // 更新屏幕大小
        case SCREEN_UPDATE_ACTION: return action.screen;
    }
}