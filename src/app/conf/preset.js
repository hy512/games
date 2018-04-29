


const preStore = {
    // 屏幕的宽高
    screen: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    },
    // 比分
    score: {
        red: 0,
        blue: 0,
    },
    game: {
        // 游戏开始时间
        startTime: new Date(),
        // 游戏记录  { time: 游戏时间, steps: 回合, win: red|blue }
        record: [],
    }
};

export {
    preStore,
}