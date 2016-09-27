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

    turnLogSysOn(){
        this.props.dispatch(actions.switchLogSys('on'));
    }

    turnLogSysOff(){
        this.props.dispatch(actions.switchLogSys('off'));
    }


    onOffButton(logSysStatus) {
        var button, second;
        switch (logSysStatus) {
            case "unknown" :
                button = <Button bsStyle="warning" bsSize="small">no connection</Button>;
                second = '';
                break;
            case "on" :
                button = <Button bsStyle="success" bsSize="small">running</Button>;
                second = <Button bsStyle="danger" bsSize="small" onClick={this.turnLogSysOff.bind(this)}>turn off</Button>;
                break;
            case "off" :
                button = <Button bsStyle="danger" bsSize="small">off</Button>;
                second = <Button bsStyle="default" bsSize="small" onClick={this.turnLogSysOn.bind(this)}>turn on</Button>;
        }
        return [ button, second ];
    }

    render() {
        return (
            <div>
                <span>Logging system: </span>
                {this.onOffButton(this.props.logSysStatus)[0]}
                {this.onOffButton(this.props.logSysStatus)[1]}
            </div>
        )
    }

};


