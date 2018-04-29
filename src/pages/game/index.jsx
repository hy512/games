import React from 'react';
import { connect } from 'react-redux';

// export default class extends React.Component {
//     render() {
//         return <div>游戏界面</div>;
//     }
// }
import {toStyle} from '../../app/functions';
import "./game.css";

@connect(state => ({
    screen: state.get("screen"),
}))
export default class extends React.Component {
    render() {
        console.log("screen: ", this.props.screen)
        let {height, width} = this.props.screen.toJS();
        console.log("height: ", height, "\twidth: ", width);
        return (
            <div className="game-background" style={``}>
                <Top />
                {/* 棋盘是正方形的， 所以给 宽、高 的较小值 */}
                <Chessboar width={height > width? width: height} />
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
        return (
            <div>比分:
                <span style="color: red;">{red}</span>:<span style="color: blue;">{blue}</span>
            </div>
        );
    }
}


class Chessboar extends React.Component {
    render() {
        let {width} = this.props;
        let styles = {
            width: `${width}px`,
            height: `${width}px`,
            ["background-size"]: `${width} ${width}`,
        };
        console.log(toStyle(styles));
        return (
            <div className="chessboar" style={toStyle(styles)}>
            </div>
        );
    }
}