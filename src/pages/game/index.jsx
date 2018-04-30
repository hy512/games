import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import ImgRed from '../../../resource/red.png';
import ImgBlue from '../../../resource/blue.png';

import { toStyle } from '../../app/functions';
import "./game.css";

@connect(state => ({
    screen: state.get("screen"),
}))
export default class extends React.Component {
    render() {
        let { height, width } = this.props.screen.toJS();
        return (
            <div className="game-background">
                <Top />
                {/* 棋盘是正方形的， 所以给 宽、高 的较小值 */}
                <Chessboar width={height > width ? width : height} />
            </div>
        );
    }
}

// 顶部
class Top extends React.Component {
    render() {
        return (
            <div>
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
        console.log(`比分: ${red}:${blue}`)
        return (
            <div>比分:
                <span style={{ color: "red" }}>{red}</span>:<span style={{ color: "blue" }}>{blue}</span>
            </div>
        );
    }
}


/**
 * props
 *   width 整个屏幕宽高的较小值
 */
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
        }
    }
    // 下一步
    next(index) {
        let {steps, chess} = this.state;
        // 设置 步数 +1, 点击变化
        steps ++;
        chess = chess.set(index, steps %2 +1);
        // 计算胜出
        let win = this.calculate(index, chess);
        if (win) {
            alert(`${win === 1? "红":"蓝"} 方胜！`);
        }
        this.setState({steps, chess});
    }
    // 计算是否出现胜利者
    calculate(n, chess) {
        // 全盘判断
        // let { chess } = this.state;
        // 横排判断
        for (let i of [0, 3, 6]) {
            if (chess.get(i) === chess.get(i + 1)&& chess.get(i) === chess.get(i + 2)) {
                return chess.get(i);
            }
        }
        // 竖排判断
        for (let i of [0, 1, 2]) {
            if (chess.get(i) === chess.get(i + 3)&& chess.get(i) === chess.get(i + 6)) {
                return chess.get(i);
            }
        }
        // 斜排判断
        if (chess.get(0) === chess.get(4)&& chess.get(4) === chess.get(8))
            return chess.get(0);
        if (chess.get(2) === chess.get(4)&& chess.get(4) === chess.get(6))
            return chess.get(2);
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