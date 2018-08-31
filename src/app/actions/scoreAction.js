
const SCORE_WIN_BLUE_ACTION = Symbol('win blue');
const SCORE_WIN_RED_ACTION = Symbol('win red');

function scoreWinBlueAction() {
    return {
        type: SCORE_WIN_BLUE_ACTION,
    };
}
function scoreWinRedAction() {
    return {
        type: SCORE_WIN_RED_ACTION,
    };
}

export {
    SCORE_WIN_BLUE_ACTION,
    SCORE_WIN_RED_ACTION,
    scoreWinBlueAction,
    scoreWinRedAction,
}