import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import ImgRed from '../../../resource/red.png';
import ImgBlue from '../../../resource/blue.png';

import { scoreWinBlueAction, scoreWinRedAction } from '../../app/actions';
import { toStyle } from '../../app/functions';
import "./game.css";

import GameOver from './gameover.jsx';

@connect(state => ({
    screen: state.get("screen"),
}))
export default class extends React.Component {
    render() {
        let { match, history, location } = this.props;
        let { height, width } = this.props.screen.toJS();
        // 方向
        let direction = width > height ? "row" : "column";
        let styles = {
            ["flex-direction"]: direction,
        }
        return (
            <div className="game-background" style={styles}>
                <Top direction={direction} />
                {/* 棋盘是正方形的， 所以给 宽、高 的较小值 */}
                <Chessboar width={height > width ? width : height} />
                <Route path={`${match.url}/:win`} component={GameOver} />
            </div>
        );
    }
}

// 顶部
/**
 * props
 *   direction 
 */
class Top extends React.Component {
    render() {
        let { direction } = this.props;
        let styles = {};
        if (direction === "row") {
            styles["align-self"] = "flex-start";
            styles["margin-right"] = "25px";
        }
        return (
            <div style={styles}>
                <Score />
            </div>
        );
    }
}

@connect(state => ({
    score: state.get("score"),
}))
class Score extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.score !== this.props.score) {
            return true;
        }
        return false;
    }
    render() {
        let { red, blue } = this.props.score.toJS();
        // console.log(`比分: ${red}:${blue}`)
        return (
            <div className="score">比分:
                <span style={{ color: "red" }}>{red}</span>:<span style={{ color: "blue" }}>{blue}</span>
            </div>
        );
    }
}


/**
 * props
 *   width 整个屏幕宽高的较小值
 */
@withRouter
@connect(null, dispatch => ({
    winBlue: () => dispatch(scoreWinBlueAction()),
    winRed: () => dispatch(scoreWinRedAction()),
}))
class Chessboar extends React.Component {
    constructor(props) {
        super(props);

        // 添加 9 个棋子的状态
        // 0 表示未点击 1 渲染为 red, 2 渲染为 blue
        let chess = List();
        for (let i = 0; i < 9; i++) {
            chess = chess.push(0);
        }

        this.state = {
            steps: 0,
            chess,
            gameover: false,
        }
        this.restart = this.restart.bind(this);
    }
    // 下一步
    next(index) {
        let { steps, chess, gameover } = this.state;
        let { history, match } = this.props;
        // 游戏已经结束
        if (gameover) {
            return;
        }
        // 设置 步数 +1, 点击变化
        steps++;
        chess = chess.set(index, steps % 2 + 1);
        // 计算胜出
        let win = this.calculate(index, chess);
        console.log(win)
        if (win) {
            this.setState({ gameover: true });
            // 增加比分
            if (win === 1) {
                this.props.winRed();
            } else {
                this.props.winBlue();
            }
            // 显示结果
            // history.push(`${match.url}/${win === 1 ? "红" : "蓝"}`, { restart: this.restart });
            history.push({pathname:  `${match.url}/${win === 1? "红":"蓝"}`, state:{restart: this.restart}})
        }
        // 是否平局
        else if(!chess.includes(0)) {
            this.setState({ gameover: true });
            history.push({pathname:  `${match.url}/平`, state:{restart: this.restart}})
        }

        this.setState({ steps, chess });
    }
    // 计算是否出现胜利者
    calculate(n, chess) {
        // 全盘判断
        // let { chess } = this.state;
        // 横排判断
        for (let i of [0, 3, 6]) {
            if (chess.get(i) !== 0 &&chess.get(i) === chess.get(i + 1) && chess.get(i) === chess.get(i + 2)) {
                return chess.get(i);
            }
        }
        // 竖排判断
        for (let i of [0, 1, 2]) {
            if (chess.get(i) !== 0 && chess.get(i) === chess.get(i + 3) && chess.get(i) === chess.get(i + 6)) {
                return chess.get(i);
            }
        }
        // 斜排判断
        if (chess.get(4) !==0 &&chess.get(0) === chess.get(4) && chess.get(4) === chess.get(8))
            return chess.get(0);
        if (chess.get(4) !== 0&&chess.get(2) === chess.get(4) && chess.get(4) === chess.get(6))
            return chess.get(2);
    }
    // 重新开始一局游戏
    restart() {
        // console.log("重新开始")
        // console.log(this.props.history);
        this.setState(prevState=>({
            steps: 0,
            gameover: false,
            chess: prevState.chess.map(()=>0),
        }))
    }
    render() {
        // 得到宽度
        let { width } = this.props;
        // 确定宽高和背景大小
        let styles = {
            width: `${width}px`,
            height: `${width}px`,
            ["background-size"]: `${width}px ${width}px`,
        };
        let { chess } = this.state;

        return (
            <div style={styles} className="chessboar" >
                {chess.map((value, index) => (
                    <Chess flag={value} click={this.next.bind(this, index)} width={width} />
                ))}
            </div>
        );
    }
}

/**
 * props
 *   flag
 *   width
 *   click
 */
class Chess extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.width !== this.props.width ||
            nextProps.flag !== this.props.flag
        ) {
            return true;
        }
        return false;
    }
    render() {
        let { width, flag, click } = this.props;
        // console.log(width, flag, click);
        let styles = {
            width: `${width / 3}px`,
            height: `${width / 3}px`,
            ["background-size"]: `${width / 3}px ${width / 3}px`,
        };

        let element = null;
        if (flag === 0) {
            element = (
                <div onClick={click} className="chess" style={styles}>
                </div>
            );
        }
        else if (flag === 1) {
            element = (
                <img src={ImgRed} className="chess" style={styles}>
                </img>
            );
        }
        else {
            element = (
                <img src={ImgBlue} className="chess" style={styles}>
                </img>
            );
        }
        return element;
    }
}