import React from 'react';

import { Link } from 'react-router-dom';
import Immutable from 'immutable';


import "./home.css";

export default class extends React.PureComponent {
    constructor(props) {
        super(props);

        let options = [
            { key: "play", text: "开始游戏", to: "/game" },
            { key: "summary", text: "统计信息", to: "/summary" },
            { key: "help", text: "帮助信息", to: "/help" },
        ];

        this.state = {
            options: Immutable.fromJS(options),
        }
    }

    render() {
        let { options } = this.state;
        return (
            <div className="home-background">
                {options.map(item => (
                    <Option key={item.get("key")} text={item.get("text")} to={item.get("to")} />
                ))}
            </div>
        );
    }
}

/**
 * 面板中的一个选项
 * props
 *   key 
 *   text 显示的文本
 *   to 点击事件
 */
class Option extends React.Component {
    render() {
        let { text, click, to } = this.props;
        return (
            <Link to={to} className="option">
                {text}
            </Link>
        )
    }
}