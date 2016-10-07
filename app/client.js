import './css/iruka.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, IndexRoute, browserHistory} from 'react-router'
import {Provider} from 'react-redux';

import History from  './pages/history';
import SearchHistory from  './pages/search';
import About from  './pages/about';
import Scan from  './pages/scan';
import Notify from './pages/notify';
import Monitor from './pages/monitor';
import Settings from './pages/settings';
import Profile from './pages/profile';

import store from './redux/store';
import * as actions from './redux/actions';

store.dispatch(actions.fetchTargets());
store.dispatch(actions.getLogSysStatus());
store.dispatch(actions.getImageBankArray());


setInterval(()=>store.dispatch(actions.getLogSysStatus()), 300000);

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
                <IndexRoute component={Monitor}/>
                <Route path="search" component={SearchHistory}/>
                <Route path="history/:user" component={History}/>
                <Route path="scan" component={Scan}/>
                <Route path="notify" component={Notify}/>
                <Route path="about" component={About}/>
                <Route path="settings" component={Settings}/>
                <Route path="profile/:user" component={Profile}/>
                <Route path="monitor" component={Monitor}/>
            </Route>

        </Router>
    </Provider>
    , document.getElementById('layout'));
