

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * props
 *   win
 */
export default class extends React.Component {
    newGame() {
        let {history} = this.props;
        history.location.state.restart();
        history.goBack();
    }
    render() {
        let { win } = this.props.match.params;

        let styles = {};
        win = win + "方胜利！"
        if (win === "红") {
            styles["color"] = "red";
        }
        else if (win === "蓝") {
            styles["color"] = "blue";

        }
        else if (win === "平") {
            win = "平局!";
        }
        return (
            <div className="panel">
                <div style={styles}>{win}</div>
                <div onClick={this.newGame.bind(this)}>再来一次</div>
            </div>
        );
    }
}