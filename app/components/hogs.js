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
        hogCount: store.hogs.size
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

    render() {

        return (
            <div>
                < div>
                    <span>Number of macs: {this.props.hogCount}</span>
                    <br/><br/>
                    {Array.from(this.props.hogs).map(x=>{
                        return (
                            <p>{x[0]} - {x[1]}</p>
                        )
                })}
                </div>
            </div>
        )
    }
};
