import React from 'react';
import 'history';
import {connect} from 'react-redux';
import '../css/iruka.css';
import {Button} from 'react-bootstrap';
import * as actions from '../redux/actions'

@connect((store) => {
    return {
        logSysStatus: store.logSysStatus,
    };
})
export default class OnOff extends React.Component {

    componentWillMount(){
        this.props.dispatch(actions.getLogSysStatus())  // to make sure it's updated
    }

    turnLogSysOn(){
        this.props.dispatch(actions.switchLogSys('on'));
    }

    turnLogSysOff(){
        this.props.dispatch(actions.switchLogSys('off'));
    }


    onOffButton(logSysStatus) {
        var status, second;
        switch (logSysStatus) {
            case "unknown" :
                status = 'No connetion to verify system status';
                second = '';
                break;
            case "on" :
                status = 'The logging system is running';
                second = <Button bsStyle="danger" bsSize="small" onClick={this.turnLogSysOff.bind(this)}>turn off</Button>;
                break;
            case "off" :
                status = 'The logging system is not running';
                second = <Button bsStyle="primary" bsSize="small" onClick={this.turnLogSysOn.bind(this)}>turn on</Button>;
        }
        return [ status, second ];
    }

    render() {
        return (
            <div>
                <span style={ (this.props.logSysStatus !== 'on') ? {color: 'red'} : {}}>{this.onOffButton(this.props.logSysStatus)[0]}</span>
                <span>&nbsp;&nbsp;</span> {this.onOffButton(this.props.logSysStatus)[1]}
                <br/><br/>
                <p>The logging system records traffic data. While it is turned off, no data
                will be recorded for the 'history' view, but live monitoring is still possible. The 'notify' function
                works only when the logging system is running.</p>


            </div>
        )
    }

};


