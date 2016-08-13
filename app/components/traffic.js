/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';


var url = "http://171.101.236.255:3000/";

import socketio from 'socket.io-client';
var socket = socketio(url);

import tsec from "../macMonitored.js";
import Slot from './slot.js';


function addPeriod(justIn) {
    // todo: deal with invalid json, e.g. '{'
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

    getInitialState() {
        return {
            tsec: tsec
        };
    },

    componentDidMount() {
        var that = this;
        socket.on('output', function (data) {
            var justIn = JSON.parse(data);
            addPeriod(justIn);
            that.setState({
                tsec: tsec
            });
        });
    },

    render() {
        return (
            <div id="Traffic">
                < div> {
                    this.state.tsec.map(function (person) {
                        return ( < Slot key={
                                person.id
                            }
                                        dname={
                                            person.dname
                                        }
                                        avatar={
                                            person.avatar
                                        }
                                        lastSeen={
                                            person.lastSeen
                                        }
                                        traffic={
                                            person.traffic
                                        }> </Slot>
                        )
                    })
                } </div>
                <div><br/>Click picture for traffic history</div>
            </div>
        )
    }
});
