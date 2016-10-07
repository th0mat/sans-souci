/**
 * Created by thomasnatter on 8/13/16.
 */


import React from 'react';
import socketio from 'socket.io-client';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';

import Config from '../config/config';
var url = Config.url;


@connect((store)=>{
    return {
        targets: store.targets
    }
})
export default class Hogs extends React.Component {

    constructor(props){
        super(props);
        this.state = { hogs: new Map()
        };

    }


    addLastIn(hogs, justIn) {
        hogs = new Map(hogs);  //clone hogs to maintain immutability
        for (var x in justIn) {
            if (justIn.hasOwnProperty(x)) {
                if (hogs.has(x)) {
                    hogs.set(x, hogs.get(x) + parseInt(justIn[x]));
                }
                else {
                    hogs.set(x, parseInt(justIn[x]))
                }
            }
        }
        return hogs;
    }

    turnOnScanning(){
        if (this.socket) this.socket.destroy();
        this.socket = socketio(url);
        var that = this;
        this.socket.on('output', function (data) {
            var justIn = JSON.parse(data);
            that.setState({hogs: that.addLastIn(that.state.hogs, justIn)});
        });
    }


    componentDidMount() {
        this.props.dispatch({type: "SET_RETURN_TO_LINK", payload: "/scan"});
        this.turnOnScanning();
    };


    componentWillUnmount() {
        this.socket.destroy();
    };

    restartScan(event){
        this.turnOnScanning();
        this.setState({ hogs: new Map()});
    };

    stopScan(event){
        this.socket.destroy();
    };

    continueScan(event){
        this.turnOnScanning();
    };

    render() {
        var hogs = Array.from(this.state.hogs);
        var targets = this.props.targets;
        this.restartScan = this.restartScan.bind(this);
        this.stopScan = this.stopScan.bind(this);
        this.continueScan = this.continueScan.bind(this);

        hogs = hogs.sort((x, y)=>y[1] - x[1]);

        return (
            <div>
                < div>
                    <span>Number of devices detected: {hogs.length}</span>
                    <br/><br/>
                    <Button bsStyle="primary" bsSize="small" onClick={this.stopScan}>stop</Button>&nbsp;&nbsp;
                    <Button bsStyle="primary" bsSize="small" onClick={this.continueScan}>continue</Button>&nbsp;&nbsp;
                    <Button bsStyle="primary" bsSize="small" onClick={this.restartScan}>restart</Button>
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
                        var dname = (target) ? target.dname : 'Incognito';
                        return (
                            <tr key={x[0]}>
                                <td>< Link to={"history/" + x[0]}>{dname}</Link></td>
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
