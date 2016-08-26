import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, IndexRoute, browserHistory} from 'react-router'
import {Provider} from 'react-redux';

import Live from  './pages/live.js';
import History from  './pages/history.js';
import About from  './pages/about.js';

import store from './redux/store';
import * as actions from './redux/actions';

store.dispatch({type: 'WAKE_UP', payload: 0})
store.dispatch(actions.fetchConfig());


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
    <Provider store={store}>
        <Router history={browserHistory}>

            <Route path="/" component={Layout}>
                <IndexRoute component={Live}/>
                <Route path="history/:day/:user" component={History}/>
                <Route path="about" component={About}/>
            </Route>

        </Router>
    </Provider>
    , document.getElementById('layout'));
