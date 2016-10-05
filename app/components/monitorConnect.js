/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router';
import Config from '../config/config';

var url = Config.url;

import socketio from 'socket.io-client';

//import tsec from "../config/macMonitored.js";
import MonitorTarget from './monitorTarget.js';


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

@connect((store) => {
    return {
        tsec: store.targets
    };
})
export default class MonitorConnect extends React.Component{



    componentDidMount() {
        this.socket = socketio(url);
        var that = this;
        this.socket.on('output', function (data) {
            var justIn = JSON.parse(data);
            addPeriod(that.props.tsec, justIn);
            that.setState({
                tsec: that.props.tsec
            });
        });
    }

    componentWillUnmount() {
        //socket.removeAllListeners('output');
        this.socket.destroy();
    }

    render() {
        return (
            <div id="Traffic">
                < div> {
                    this.props.tsec.map(function (person) {
                        return ( < MonitorTarget key={ person.macHex }
                                        macHex={ person.macHex }
                                        dname={ person.dname }
                                        avatar={ person.avatar }
                                        lastSeen={ person.lastSeen }
                                        traffic={ person.traffic } > </MonitorTarget>
                        )
                    })
                } </div>
            </div>
        )
    }

}
