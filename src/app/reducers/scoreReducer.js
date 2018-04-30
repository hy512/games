import {SCORE_WIN_BLUE_ACTION, SCORE_WIN_RED_ACTION} from '../actions';


export default function reducer (prevScore, action) {
    switch(action.type) {
        default: return prevScore;
        case SCORE_WIN_BLUE_ACTION: {
            return prevScore.set("blue", prevScore.get("blue")+1);
        }
        case SCORE_WIN_RED_ACTION: 
            return prevScore.set("red", prevScore.get("red")+1);
    }
}