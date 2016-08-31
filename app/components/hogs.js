/**
 * Created by thomasnatter on 8/13/16.
 */



import React from 'react';
import socketio from 'socket.io-client';
import * as actions from '../redux/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from '../redux/actions'
var url = "http://171.101.236.255:3000/";
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
        console.log("clicked");
        this.props.dispatch({
            type: 'RESET_HOGS'
        })
    };

    render() {
        var hogs = Array.from(this.props.hogs);
        var targets = this.props.targets;
        this.resetHogs = this.resetHogs.bind(this);

        hogs = hogs.sort((x, y)=>y[1] - x[1]);

        return (
            <div>
                < div>
                    <span>Number of macs: {hogs.length}</span>
                    <button class="btn btn-primary btn-xs" onClick={this.resetHogs}>reset</button>
                    <br/><br/>
                    {hogs.map(x=>{
                        var target = targets.find(t=>t['macHex'] === x[0]);
                        var dname = (target) ? target.dname : 'incognito';
                        return (
                            <p>{x[0]} - {x[1]} - {dname}</p>
                        )
                })}
                </div>
            </div>
        )
    }
};
