import React, {Component} from 'react'
import { Route, Link, HashRouter, BrowserRouter, Redirect } from 'react-router-dom';

import Home from '../pages/home';



// import HashHistory from 'react-router/lib/HashHistory';
// import { history } from 'react-router/lib/BrowserHistory';


function App(props) {
    console.log("this is App: ", props.match);
    console.log("this is App: ", props.location);

    return (
        <div>
            <h1>App</h1>
            <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/inbox">Inbox</Link></li>
            </ul>
            {/* 当 url 为 / 时 渲染 Dashboard */}
            <Route path="/about" component={About} />
            <Route path="/home" component={Home} />
            <Route path="/inbox" component={Inbox} />

        </div>
    )
}

function About(props) {
    return <h3>About</h3>;
}

function Inbox(props) {
    console.log(props.match)
    let { url } = props.match;
    return (
        <div>
            <h2>Inbox</h2>
            <Route path={`${url}/messages/:id`} component={Message} />
        </div>
    )
}

class Message extends Component {
    render() {
        console.log(this.props.match)
        let { params: { id } } = this.props.match;

        let display = <h3>Message {id}</h3>;
        if (id === "1") {
            display = <Redirect to={{pathname: '/', state: {from: this.props.location}}} /> ;
        }
        return display;
    }
}
function Dashboard(props) {
    return <div>Welcome to the app!</div>
}



export default function (props) {
    return (
        <HashRouter>
            <Route path="/" component={App} />
            </HashRouter>
    );
}
