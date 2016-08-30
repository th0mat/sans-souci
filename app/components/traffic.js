/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';

import {Link} from 'react-router';

var url = "http://171.101.236.255:3000/";

import socketio from 'socket.io-client';
var socket = socketio(url);

//import tsec from "../config/macMonitored.js";
import Slot from './slot.js';


function addPeriod(tsec, justIn) {
    var total = 0;
    for (var i = 0; i < tsec.length - 1; i++) { // don't include TOTAL in loop
        if (justIn[tsec[i].macHex]) {
            tsec[i].traffic.unshift(justIn[tsec[i].macHex]);
            tsec[i].lastSeen = new Date();
        } else {
            tsec[i].traffic.unshift(0);
        }
        tsec[i].traffic.pop();
    }
    // add total of JustIn
    for (var x in justIn) {
        if (justIn.hasOwnProperty(x)) {
            total += justIn[x];
        }
    }
    tsec[tsec.length - 1].traffic.unshift(total);
    tsec[tsec.length - 1].lastSeen = new Date();
    tsec[tsec.length - 1].traffic.pop();
}


export default React.createClass({

    // configLoaded(){
    //     this.setState({tsec: this.props.targets})
    // },

    getInitialState() {
        setTimeout(()=>this.setState({tsec: this.props.tsec}), 3000);
        return {
            tsec: this.props.tsec
        };
    },

    componentDidMount() {
        var that = this;
        socket.on('output', function (data) {
            var justIn = JSON.parse(data);
            addPeriod(that.state.tsec, justIn);
            that.setState({
                tsec: that.state.tsec
            });
        });
    },

    componentWillUnmount() {
        socket.removeAllListeners('output');
    },

    render() {
        return (
            <div id="Traffic">
                < div> {
                    this.state.tsec.map(function (person) {
                        return ( < Slot key={ person.macHex }
                                        macHex={ person.macHex }
                                        dname={ person.dname }
                                        avatar={ person.avatar }
                                        lastSeen={ person.lastSeen }
                                        traffic={ person.traffic } > </Slot>
                        )
                    })
                } </div>
                <div><br/><small><Link to='about'>About Sans-Souci</Link></small></div>
            </div>
        )
    }
});
