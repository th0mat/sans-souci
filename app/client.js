import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'


import Live from  './pages/liveMonitor.js';
import History from  './pages/userHistory.js';
import About from  './pages/about.js';


var Layout = React.createClass({

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
});



ReactDOM.render(
    <Router history={browserHistory}>

        <Route path="/" component={Layout}>
            <IndexRoute component={Live} />
            <Route path="history/:day/:user" component={History}/>
            <Route path="about" component={About}/>
        </Route>

    </Router>
    , document.getElementById('layout'));
