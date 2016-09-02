/**
 * Created by thomasnatter on 8/13/16.
 */



import React from 'react';
import socketio from 'socket.io-client';
import * as actions from '../redux/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';

import * as actionCreators from '../redux/actions'
import Config from '../config/config';
var url = Config.url;
var socket = socketio(url);


function mapStateToProps(state) {
    return { hogs: state.hogs };
}


function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}


@connect((store)=>{
    return {
        hogs: store.hogs,
        targets: store.targets
        //hogCount: store.hogs.size
    }
})
export default class Hogs extends React.Component {


    componentDidMount() {
        var that = this;
        socket.on('output', function (data) {
            var justIn = JSON.parse(data);
            that.props.dispatch({type: "ADD_LAST_IN", payload: justIn});
        });
    };

    componentWillUnmount() {
        // socket.removeAllListeners('output');
    };

    resetHogs(event){
        this.props.dispatch({
            type: 'RESET_HOGS'
        })
    };

    render() {
        var hogs = Array.from(this.props.hogs);
        var targets = this.props.targets;
        this.resetHogs = this.resetHogs.bind(this);
        this.props.dispatch({type: "SET_RETURN_TO_LINK", payload: "/scan"});

        hogs = hogs.sort((x, y)=>y[1] - x[1]);

        return (
            <div>
                < div>
                    <span>Number of devices detected: {hogs.length}</span>
                    <br/>
                    <button class="btn btn-primary btn-xs" onClick={this.resetHogs}>reset</button>
                    <br/><br/>
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Mac</th>
                            <th class="text-right">Bytes</th>
                        </tr>
                        </thead>
                        <tbody>
                    {hogs.map(x=>{
                        var target = targets.find(t=>t['macHex'] === x[0]);
                        var dname = (target) ? target.dname : 'incognito';
                        return (
                            <tr key={x[0]}>
                                <td>< Link to={"history/0/" + x[0]}>{dname}</Link></td>
                                <td style={{fontFamily: "monospace"}}>{x[0]}</td>
                                <td class="text-right">{x[1].toLocaleString()}</td>
                            </tr>
                        )
                })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
};
